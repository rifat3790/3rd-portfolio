import React, { useState } from 'react';
import { 
  ShieldAlert, LogIn, LogOut, Users, Download, FileText, 
  MessageSquare, Trash2, Mail, CheckCircle, ToggleLeft, ToggleRight, BarChart3 
} from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const Dashboard = () => {
  const [password, setPassword] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'inbox' | 'analytics' | 'settings'>('inbox');
  const [isAvailableForProjects, setIsAvailableForProjects] = useState(true);

  const { 
    isAdminAuthenticated, 
    setAdminAuthenticated, 
    inquiries, 
    markInquiryRead, 
    deleteInquiry,
    analytics,
    addNotification 
  } = usePortfolioStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setAdminAuthenticated(true);
      addNotification('Logged in to Admin Panel!', 'success', 'Auth Success');
      setPassword('');
    } else {
      addNotification('Invalid password. Access Denied.', 'error', 'Auth Failure');
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    addNotification('Logged out successfully.', 'info', 'Session Ended');
  };

  // MOCK CHART DATA FOR VISITOR TRENDS
  const chartData = [
    { day: 'Mon', count: 12 },
    { day: 'Tue', count: 19 },
    { day: 'Wed', count: 32 },
    { day: 'Thu', count: 24 },
    { day: 'Fri', count: 42 },
    { day: 'Sat', count: 18 },
    { day: 'Sun', count: 15 },
  ];

  const maxChartVal = Math.max(...chartData.map(d => d.count));

  // Render Login Card if not authorized
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen pt-36 pb-16 flex items-center justify-center px-4 bg-slate-50 dark:bg-darkbg/40 text-slate-800 dark:text-zinc-200 text-left">
        <div className="w-full max-w-sm">
          <Card className="!p-6 flex flex-col gap-6" glowBorder spotlight hoverEffect={false}>
            
            <div className="flex items-center gap-3 border-b dark:border-zinc-800 pb-4">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-base font-display text-slate-900 dark:text-white">Admin Authentication</h3>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">Enter credentials to unlock dashboard.</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-display">
                  Access Password (type 'admin')
                </label>
                <input
                  required
                  autoFocus
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:border-accent text-xs text-slate-800 dark:text-zinc-200"
                />
              </div>

              <Button type="submit" variant="primary" icon={LogIn} iconPosition="right" className="w-full">
                Unlock System
              </Button>
            </form>

          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-darkbg/40 text-slate-800 dark:text-zinc-200 text-left">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8">
        
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-zinc-800 pb-6 text-left">
          <div>
            <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white flex items-center gap-2">
              <span>Admin Console</span>
              <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold font-sans">Live Connection</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">
              Read customer inquiry messages, monitor page interactions, and customize developer availability.
            </p>
          </div>
          <Button variant="secondary" size="sm" icon={LogOut} onClick={handleLogout}>
            Close Console
          </Button>
        </div>

        {/* ANALYTICS HIGHLIGHT METRICS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Unique Visits', val: analytics.visits, icon: Users, col: 'text-blue-500 bg-blue-500/10' },
            { label: 'CV Downloads', val: analytics.downloads, icon: Download, col: 'text-emerald-500 bg-emerald-500/10' },
            { label: 'CVs Generated', val: analytics.resumesGenerated, icon: FileText, col: 'text-purple-500 bg-purple-500/10' },
            { label: 'Chat Dialogs', val: analytics.chatsConducted, icon: MessageSquare, col: 'text-amber-500 bg-amber-500/10' }
          ].map((metric) => {
            const MetIcon = metric.icon;
            return (
              <Card key={metric.label} className="!p-4 border-slate-200/60 dark:border-zinc-800 flex items-center gap-4 bg-white dark:bg-darkcard" hoverEffect={false}>
                <div className={`p-3 rounded-xl shrink-0 ${metric.col}`}>
                  <MetIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider font-display">{metric.label}</span>
                  <h3 className="text-xl font-black font-display text-slate-800 dark:text-white mt-0.5">{metric.val}</h3>
                </div>
              </Card>
            );
          })}
        </div>

        {/* SUB TAB SELECTOR */}
        <div className="flex border-b border-slate-200 dark:border-zinc-800 gap-2 py-1 mt-4 overflow-x-auto scrollbar-none shrink-0">
          {[
            { id: 'inbox', label: `Inbox Inquiries (${inquiries.filter(i => !i.isRead).length})`, icon: Mail },
            { id: 'analytics', label: 'Interaction Trends', icon: BarChart3 },
            { id: 'settings', label: 'Availability Config', icon: ToggleRight }
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as 'inbox' | 'analytics' | 'settings')}
                className={`flex items-center gap-1.5 px-4.5 py-2 text-xs font-semibold rounded-xl border border-transparent cursor-pointer transition-all ${
                  isActive
                    ? 'bg-accent/10 border-accent/20 text-accent font-bold'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800/80'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB WORKSPACE */}
        <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm min-h-[350px] flex flex-col gap-6">
          
          {/* A. INBOX TAB */}
          {activeSubTab === 'inbox' && (
            <div className="flex flex-col gap-4">
              <h3 className="font-bold font-display text-sm text-slate-900 dark:text-white">Customer Messages Log</h3>
              
              {inquiries.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {inquiries.map((inq) => (
                    <div 
                      key={inq.id} 
                      className={`p-4 border rounded-xl flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-all ${
                        inq.isRead 
                          ? 'border-slate-150 dark:border-zinc-850 bg-slate-50/20 dark:bg-zinc-950/5 opacity-70' 
                          : 'border-accent/20 bg-accent/5 dark:bg-accent/5 shadow-sm shadow-accent/5'
                      }`}
                    >
                      {/* Left: Message details */}
                      <div className="text-left flex-1 flex flex-col gap-2">
                        <div className="flex flex-wrap items-baseline gap-2.5">
                          <h4 className="font-bold text-xs text-slate-800 dark:text-zinc-200">{inq.name}</h4>
                          <span className="text-[10px] text-slate-400 dark:text-zinc-500">{inq.email}</span>
                          <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono">({inq.timestamp})</span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                          <span className="bg-slate-100 dark:bg-zinc-850 px-2 py-0.5 rounded text-slate-600 dark:text-zinc-400">Company: {inq.company}</span>
                          <span className="bg-accent/10 px-2 py-0.5 rounded text-accent">Budget: {inq.budget}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed bg-white/40 dark:bg-black/10 p-2.5 rounded-lg border border-slate-100 dark:border-zinc-850">
                          {inq.message}
                        </p>
                      </div>

                      {/* Right: Message Actions */}
                      <div className="flex sm:flex-col gap-2 shrink-0 self-end sm:self-start">
                        {!inq.isRead && (
                          <button
                            onClick={() => {
                              markInquiryRead(inq.id);
                              addNotification('Message marked as read.', 'success', 'Status Ticked');
                            }}
                            className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20 transition-all cursor-pointer text-xs gap-1 font-semibold"
                            title="Mark as Read"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Mark Read</span>
                          </button>
                        )}
                        <button
                          onClick={() => {
                            deleteInquiry(inq.id);
                            addNotification('Message deleted from inbox.', 'warning', 'Item Purged');
                          }}
                          className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg flex items-center justify-center border border-rose-500/20 transition-all cursor-pointer text-xs gap-1 font-semibold"
                          title="Delete Message"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center text-slate-500">
                  <Mail className="w-8 h-8 text-slate-450 dark:text-zinc-650 mr-2" />
                  <span className="text-xs font-semibold font-display mt-2">Inquiries folder is empty</span>
                  <p className="text-[10px] text-slate-400 mt-1">Submit test quotes in the contact portal to verify.</p>
                </div>
              )}
            </div>
          )}

          {/* B. ANALYTICS CHART TAB */}
          {activeSubTab === 'analytics' && (
            <div className="flex flex-col gap-6 text-left">
              <div>
                <h3 className="font-bold font-display text-sm text-slate-900 dark:text-white">Daily Traffic Analytics</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Calculated mock analytics based on active routing requests.</p>
              </div>

              {/* SVG Bar Chart */}
              <div className="h-56 w-full flex items-end justify-between gap-3 px-4 pt-6 pb-2 bg-slate-50/50 dark:bg-zinc-950/20 border border-slate-100 dark:border-zinc-850 rounded-2xl">
                {chartData.map((d) => {
                  // Compute height percentage
                  const hPercent = maxChartVal > 0 ? (d.count / maxChartVal) * 80 : 0;
                  return (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2.5 h-full justify-end group">
                      
                      {/* Bar Value Tooltip */}
                      <span className="opacity-0 group-hover:opacity-100 text-[10px] bg-slate-900 text-white dark:bg-zinc-100 dark:text-slate-900 px-2 py-0.5 rounded font-mono transition-opacity duration-200">
                        {d.count}
                      </span>

                      {/* Bar Pillar */}
                      <div 
                        style={{ height: `${hPercent}%` }}
                        className="w-full max-w-[40px] bg-accent/35 dark:bg-accent/40 hover:bg-accent rounded-t-lg transition-all duration-300 shadow-sm"
                      />

                      {/* Label */}
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-zinc-500 font-mono">
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* C. CONFIG SETTINGS TAB */}
          {activeSubTab === 'settings' && (
            <div className="flex flex-col gap-6 text-left">
              <div>
                <h3 className="font-bold font-display text-sm text-slate-900 dark:text-white">Global Portfolio Config</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Toggle status tags across the front facing hero layouts.</p>
              </div>

              {/* Toggles grid */}
              <div className="flex flex-col gap-4.5 max-w-md">
                
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-zinc-850/60 bg-slate-50/20">
                  <div className="text-left flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">Toggle Hire Availability</span>
                    <span className="text-[10.5px] text-slate-500 dark:text-zinc-500">Determines if the "Available for Work" tag glows on hero.</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsAvailableForProjects(!isAvailableForProjects);
                      addNotification(`Availability tag updated to: ${!isAvailableForProjects ? 'Online' : 'Offline'}`, 'info', 'Status Toggled');
                    }}
                    className="text-accent cursor-pointer"
                  >
                    {isAvailableForProjects ? (
                      <ToggleRight className="w-9 h-9" />
                    ) : (
                      <ToggleLeft className="w-9 h-9 text-slate-400" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-zinc-850/60 bg-slate-50/20">
                  <div className="text-left flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">Simulate supabse DB backup</span>
                    <span className="text-[10.5px] text-slate-500 dark:text-zinc-500">Run a local dump file check.</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => addNotification('Backup completed. 0 vulnerabilities found.', 'success', 'Backup Saved')}>
                    Trigger Backup
                  </Button>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
