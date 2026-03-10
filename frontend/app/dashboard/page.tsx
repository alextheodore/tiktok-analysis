'use client';
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { Search, Loader2, Video, Activity, Globe, MessageSquare, Trash2, Hash, TrendingUp, BarChart3 } from 'lucide-react';

interface AnalysisLog {
    id: number;
    video_id: string;
    username: string;
    views: number;
    hashtags: string[];
    analyzed_at: string;
    duration: number;
}

interface HashtagStats {
    hashtag: string;
    totalVideos: number;
    totalViews: number;
    isTrending: boolean;
    avgEngagement: string;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [latestAnalysis, setLatestAnalysis] = useState<AnalysisLog | null>(null);
  const [hashtagStats, setHashtagStats] = useState<HashtagStats | null>(null);

  useEffect(() => {
    fetchLatest();
  }, []);

  const fetchLatest = () => {
    api.get('/dashboard/latest')
      .then(res => setLatestAnalysis(res.data))
      .catch((err) => console.log('No latest analysis or error', err))
      .finally(() => setLoading(false));
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) return;

    setAnalyzing(true);
    setHashtagStats(null); // Reset previous hashtag result
    
    // Check if input is a hashtag (starts with #) or just a word (we assume hashtag if no http/www)
    const isHashtag = videoUrl.trim().startsWith('#') || (!videoUrl.includes('.') && !videoUrl.includes('/'));

    try {
        if (isHashtag) {
            const tag = videoUrl.trim().replace('#', '');
            const { data } = await api.post('/analysis/hashtag', { hashtag: tag });
            setHashtagStats(data);
            setLatestAnalysis(null); // Hide video result
            alert('Hashtag Analysis Complete!');
        } else {
            await api.post('/analysis/analyze', { url: videoUrl });
            alert('Video Analysis started! Please wait a moment...');
            setVideoUrl('');
            setHashtagStats(null);
            // Poll for result
            setTimeout(() => {
                fetchLatest();
            }, 3000);
        }
    } catch (err) {
        alert('Failed to analyze');
    } finally {
        setAnalyzing(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this result?")) return;
    try {
        await api.delete(`/dashboard/history/${id}`);
        setLatestAnalysis(null); 
        alert("Deleted successfully");
    } catch (err) {
        alert("Failed to delete");
    }
  };

  if (loading) return <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-purple-600"/></div>;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            TikTok Insight Analyzer
        </h1>
        <p className="text-slate-500">Paste a TikTok, YouTube, or Instagram URL or enter a #Hashtag to analyze.</p>
      </div>

      {/* Input Section */}
      <div className="glass-card p-2 rounded-2xl shadow-xl border border-white/60 bg-white/40 backdrop-blur-md">
        <form onSubmit={handleAnalyze} className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                <input 
                    type="text" 
                    placeholder="Paste TikTok, YouTube, Instagram URL or #Hashtag..." 
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/60 border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-400 text-slate-800 text-lg shadow-inner"
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                />
            </div>
            <button 
                disabled={analyzing} 
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 transition-all flex items-center justify-center gap-2 min-w-[160px]"
            >
                {analyzing ? <Loader2 className="animate-spin w-6 h-6" /> : <Search className="w-5 h-5" />} 
                {analyzing ? 'Analyzing...' : 'Analyze'}
            </button>
        </form>
      </div>

      {/* HASHTAG RESULT DISPLAY */}
      {hashtagStats && (
        <div className="glass-card overflow-hidden rounded-3xl border border-slate-100 shadow-2xl animate-fade-in-up">
            <div className="h-32 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 relative flex items-center justify-center">
                 <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                 <h2 className="text-white text-3xl font-bold tracking-tight drop-shadow-md flex items-center gap-2">
                    <Hash className="w-8 h-8" />
                    Hashtag Insight
                 </h2>
            </div>

            <div className="p-8 space-y-8 bg-white/80 backdrop-blur-xl -mt-6 rounded-t-3xl relative">
                <div className="flex flex-col items-center text-center space-y-1">
                    <h3 className="text-4xl font-black text-slate-800 tracking-tight">#{hashtagStats.hashtag}</h3>
                    <div className="flex items-center gap-2 mt-2">
                        {hashtagStats.isTrending ? (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" /> Trending Now
                            </span>
                        ) : (
                            <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-sm font-medium">
                                Stable Growth
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100 text-center">
                        <div className="text-indigo-600 mb-2 flex justify-center"><Video className="w-8 h-8" /></div>
                        <div className="text-3xl font-bold text-slate-800">{hashtagStats.totalVideos.toLocaleString()}</div>
                        <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Total Videos</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-pink-50 border border-pink-100 text-center">
                        <div className="text-pink-600 mb-2 flex justify-center"><Activity className="w-8 h-8" /></div>
                        <div className="text-3xl font-bold text-slate-800">{hashtagStats.totalViews.toLocaleString()}</div>
                        <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Total Views</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-orange-50 border border-orange-100 text-center">
                        <div className="text-orange-600 mb-2 flex justify-center"><BarChart3 className="w-8 h-8" /></div>
                        <div className="text-3xl font-bold text-slate-800">{hashtagStats.avgEngagement}</div>
                        <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Engagement</div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* VIDEO RESULT DISPLAY (Only show if hashtag stats are null) */}
      {!hashtagStats && latestAnalysis && (
        <div className="glass-card overflow-hidden rounded-3xl border border-slate-100 shadow-2xl animate-fade-in-up">
            {/* Header / Gradient Top */}
            <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative flex items-center justify-center">
                 <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                 <h2 className="text-white text-3xl font-bold tracking-tight drop-shadow-md flex items-center gap-2">
                    <Video className="w-8 h-8" />
                    Analysis Result
                 </h2>
                 <button 
                    onClick={() => handleDelete(latestAnalysis.id)}
                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors backdrop-blur-sm"
                    title="Delete Result"
                 >
                    <Trash2 className="w-5 h-5" />
                 </button>
            </div>

            {/* Content Body */}
            <div className="p-8 space-y-8 bg-white/80 backdrop-blur-xl -mt-6 rounded-t-3xl relative">
                
                {/* User Info */}
                <div className="flex flex-col items-center text-center space-y-1">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 shadow-inner flex items-center justify-center text-3xl mb-2">
                        📱
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">{latestAnalysis.username || '@unknown_user'}</h3>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">TikTok Creator</p>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col items-center justify-center text-center space-y-2 hover:scale-[1.02] transition-transform">
                        <div className="p-3 bg-indigo-100/50 rounded-full text-indigo-600 mb-1">
                            <Activity className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Views</span>
                        <span className="text-3xl font-black text-slate-800">
                            {(latestAnalysis.views || 0).toLocaleString()}
                        </span>
                    </div>

                    <div className="p-6 rounded-2xl bg-pink-50/50 border border-pink-100 flex flex-col items-center justify-center text-center space-y-2 hover:scale-[1.02] transition-transform">
                        <div className="p-3 bg-pink-100/50 rounded-full text-pink-600 mb-1">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Duration</span>
                        <span className="text-3xl font-black text-slate-800">
                            {latestAnalysis.duration ? `${latestAnalysis.duration}s` : 'N/A'}
                        </span>
                    </div>
                </div>

                {/* Hashtags */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest text-center">Trending Hashtags</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                        {latestAnalysis.hashtags && latestAnalysis.hashtags.length > 0 ? (
                            latestAnalysis.hashtags.map((tag, i) => (
                                <span key={i} className="px-4 py-2 bg-gradient-to-r from-slate-100 to-white border border-slate-200 rounded-full text-slate-600 font-medium text-sm shadow-sm hover:shadow-md hover:text-purple-600 transition-all cursor-pointer">
                                    {tag.startsWith('#') ? tag : `#${tag}`}
                                </span>
                            ))
                        ) : (
                            <span className="text-slate-400 italic">No hashtags detected</span>
                        )}
                    </div>
                </div>

                <div className="text-center pt-4">
                    <span className="text-xs text-slate-300 font-mono">
                        ID: {latestAnalysis.video_id} • Analyzed on {new Date(latestAnalysis.analyzed_at).toLocaleDateString()}
                    </span>
                 </div>
            </div>
        </div>
      )}

      {!hashtagStats && !latestAnalysis && (
        <div className="mt-12 text-center space-y-4 opacity-50">
            <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-slate-300" />
            </div>
            <p className="text-lg text-slate-400">Ready to analyze! Paste a link or hashtag above.</p>
        </div>
      )}
    </div>
  );
}
