import Link from 'next/link';
import { Sparkles, BarChart3, TrendingUp, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 relative overflow-hidden">
      {/* Background blobs for aesthetic */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mb-12">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          <Sparkles className="mr-2 text-purple-600" /> AI-Powered TikTok Insights
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Link href="/auth/login" className="pointer-events-auto flex place-items-center gap-2 p-8 lg:p-0 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            Login <Zap className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="relative flex place-items-center z-10 mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 tracking-tight text-center">
          Unlock Viral Potential
        </h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-8">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 glass-card">
          <h2 className={`mb-3 text-2xl font-semibold flex items-center`}>
            Deep Analytics <BarChart3 className="ml-2 w-5 h-5 text-indigo-500"/>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Analyze engagement rates, view counts, and audience demographics instantly.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 glass-card">
          <h2 className={`mb-3 text-2xl font-semibold flex items-center`}>
            Trend Spotting <TrendingUp className="ml-2 w-5 h-5 text-pink-500"/>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Discover rising hashtags and audio before they go viral.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 glass-card">
          <h2 className={`mb-3 text-2xl font-semibold flex items-center`}>
            AI Suggestions <Sparkles className="ml-2 w-5 h-5 text-amber-500"/>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Get personalized content ideas tailored to beat the algorithm.
          </p>
        </div>
      </div>
      
      <div className="z-10">
        <Link href="/auth/register" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          Get Started for Free
        </Link>
      </div>
    </main>
  );
}
