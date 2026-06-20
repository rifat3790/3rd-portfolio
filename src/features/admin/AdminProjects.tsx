import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Trash2, Edit2, Plus, Save, X } from 'lucide-react';
import type { Project } from '../../data/portfolioData';

export const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const saved = await res.json();
        setProjects([saved, ...projects]);
      } else {
        const res = await fetch(`http://localhost:5000/api/projects/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const updated = await res.json();
        setProjects(projects.map(p => p._id === editingId ? updated : p));
      }
      setEditingId(null);
      setIsAdding(false);
      setFormData({});
    } catch (err) {
      console.error('Failed to save project', err);
    }
  };

  const startEdit = (p: Project) => {
    setEditingId(p._id || null);
    setFormData(p);
    setIsAdding(false);
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      title: '',
      subtitle: '',
      category: 'react',
      displayCategory: '',
      image: '',
      demoUrl: '',
      githubUrl: ''
    });
  };

  if (loading) return <div className="p-4 text-center">Loading Projects...</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold font-display text-sm text-slate-900 dark:text-white">Manage Projects</h3>
        <Button onClick={startAdd} variant="primary" icon={Plus} size="sm">Add New Project</Button>
      </div>

      {(isAdding || editingId) && (
        <Card className="!p-4 border-accent/20 bg-accent/5" hoverEffect={false}>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm text-slate-800 dark:text-zinc-200">
              {isAdding ? 'Add New Project' : 'Edit Project'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                className="p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                placeholder="Title"
                value={formData.title || ''}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
              <input 
                className="p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                placeholder="Subtitle"
                value={formData.subtitle || ''}
                onChange={e => setFormData({...formData, subtitle: e.target.value})}
              />
              <select 
                className="p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                value={formData.category || 'react'}
                onChange={e => setFormData({...formData, category: e.target.value as any})}
              >
                <option value="shopify">Shopify</option>
                <option value="react">React</option>
                <option value="fullstack">Fullstack</option>
                <option value="ai">AI</option>
                <option value="healthcare">Healthcare</option>
                <option value="other">Other</option>
              </select>
              <input 
                className="p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                placeholder="Display Category (e.g. E-commerce)"
                value={formData.displayCategory || ''}
                onChange={e => setFormData({...formData, displayCategory: e.target.value})}
              />
              <input 
                className="p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                placeholder="Image URL (e.g. https://i.ibb.co/.../img.png)"
                value={formData.image || ''}
                onChange={e => setFormData({...formData, image: e.target.value})}
              />
              <input 
                className="p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                placeholder="Date / Year"
                value={formData.date || ''}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
              <input 
                className="p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                placeholder="Live Demo URL"
                value={formData.demoUrl || ''}
                onChange={e => setFormData({...formData, demoUrl: e.target.value})}
              />
              <input 
                className="p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                placeholder="Github URL"
                value={formData.githubUrl || ''}
                onChange={e => setFormData({...formData, githubUrl: e.target.value})}
              />
              <div className="sm:col-span-2">
                <input 
                  className="w-full p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                  placeholder="Tags (comma separated, e.g. React, Node, MongoDB)"
                  value={formData.tags?.join(', ') || ''}
                  onChange={e => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})}
                />
              </div>
              
              <div className="sm:col-span-2 mt-4">
                <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-400 mb-2 uppercase tracking-wider">Case Study Details</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <textarea 
                    className="p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                    placeholder="Problem Statement"
                    value={formData.caseStudy?.problem || ''}
                    onChange={e => setFormData({...formData, caseStudy: {...formData.caseStudy, problem: e.target.value} as any})}
                  />
                  <textarea 
                    className="p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                    placeholder="Solution"
                    value={formData.caseStudy?.solution || ''}
                    onChange={e => setFormData({...formData, caseStudy: {...formData.caseStudy, solution: e.target.value} as any})}
                  />
                  <textarea 
                    className="p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                    placeholder="Process Steps (comma separated)"
                    value={formData.caseStudy?.process?.join(', ') || ''}
                    onChange={e => setFormData({...formData, caseStudy: {...formData.caseStudy, process: e.target.value.split(',').map(p => p.trim()).filter(Boolean)} as any})}
                  />
                  <textarea 
                    className="p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                    placeholder="Results"
                    value={formData.caseStudy?.result || ''}
                    onChange={e => setFormData({...formData, caseStudy: {...formData.caseStudy, result: e.target.value} as any})}
                  />
                </div>
              </div>

              <div className="sm:col-span-2 flex items-center gap-2 mt-2">
                <input 
                  type="checkbox" 
                  id="featured-checkbox"
                  checked={formData.featured || false}
                  onChange={e => setFormData({...formData, featured: e.target.checked})}
                />
                <label htmlFor="featured-checkbox" className="text-sm font-medium text-slate-700 dark:text-zinc-300">Feature this project prominently</label>
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-2">
              <Button onClick={() => { setIsAdding(false); setEditingId(null); }} variant="outline" size="sm" icon={X}>Cancel</Button>
              <Button onClick={handleSave} variant="primary" size="sm" icon={Save}>Save</Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(p => (
          <Card key={p._id} className="!p-4 flex flex-col justify-between" hoverEffect={false}>
            <div>
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-800 dark:text-zinc-200">{p.title}</h4>
                <span className="text-[10px] bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded">{p.category}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.subtitle}</p>
            </div>
            <div className="flex gap-2 justify-end mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
              <button onClick={() => startEdit(p)} className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(p._id as string)} className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
