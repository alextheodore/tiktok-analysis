'use client';
import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, History, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../lib/store';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const logout = useAuthStore((state: any) => state.logout);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-xl border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            TikTokPro
          </Link>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-500">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 text-slate-600 hover:text-purple-600 transition-colors font-medium">
                <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
            <Link href="/dashboard/history" className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 text-slate-600 hover:text-purple-600 transition-colors font-medium">
                <History className="w-5 h-5" /> History
            </Link>
            <div className="pt-8 mt-8 border-t border-slate-100">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-slate-500 hover:text-red-500 transition-colors font-medium">
                    <LogOut className="w-5 h-5" /> Logout
                </button>
            </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-slate-100 md:hidden z-10">
            <button onClick={() => setIsOpen(true)} className="p-2 text-slate-600">
                <Menu className="w-6 h-6" />
            </button>
            <span className="font-semibold text-slate-800">Dashboard</span>
            <div className="w-6"></div> 
        </header>
        
        <main className="flex-1 overflow-auto p-4 md:p-8 scroll-smooth">
            <div className="max-w-7xl mx-auto space-y-8">
                {children}
            </div>
        </main>
      </div>
    </div>
  );
}
