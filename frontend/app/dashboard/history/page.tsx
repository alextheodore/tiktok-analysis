'use client';
import { useEffect, useState } from 'react';
import api from '../../../lib/api';
import { ChevronLeft, ChevronRight, PlayCircle, Eye, Clock, Trash2 } from 'lucide-react';

interface AnalysisLog {
  id: number;
  video_id: string;
  username: string;
  views: number;
  hashtags: string[];
  analyzed_at: string;
}

export default function HistoryPage() {
  const [logs, setLogs] = useState<AnalysisLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchHistory();
  }, [page]);

  const fetchHistory = () => {
    setLoading(true);
    api.get(`/dashboard/history?limit=10&offset=${(page - 1) * 10}`)
       .then(res => setLogs(res.data))
       .catch(err => console.error(err))
       .finally(() => setLoading(false));
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this log?')) return;
    try {
        await api.delete(`/dashboard/history/${id}`);
        setLogs(logs.filter(log => log.id !== id));
    } catch (err) {
        alert('Failed to delete log');
    }
  };

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/40">
        <h2 className="text-xl font-bold text-gray-800">Analysis History</h2>
        <div className="flex gap-2">
            <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="p-2 font-medium text-gray-600">Page {page}</span>
            <button 
                onClick={() => setPage(p => p + 1)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
      </div>
      
      {loading ? (
        <div className="p-12 text-center text-gray-500">Loading history...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Username</th>
                <th className="p-4 font-semibold">Video ID</th>
                <th className="p-4 font-semibold">Views</th>
                <th className="p-4 font-semibold">Hashtags</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-purple-50/30 transition-colors group">
                  <td className="p-4 text-gray-700 font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs">📱</div>
                        {log.username || '@user'}
                      </div>
                  </td>
                  <td className="p-4 font-medium text-indigo-600 flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    {log.video_id}
                  </td>
                  <td className="p-4 text-gray-600">
                    <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-gray-400" />
                        {(log.views || 0).toLocaleString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                        {log.hashtags && log.hashtags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-pink-100 text-pink-600 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(log.analyzed_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                        onClick={() => handleDelete(log.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Log"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                    <td colSpan={6} className="p-12 text-center text-gray-400">
                        No analysis history found. Start analyzing videos!
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
