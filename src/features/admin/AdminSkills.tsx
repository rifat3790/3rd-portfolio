import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Trash2, Edit2, Plus, Save, X } from 'lucide-react';
import type { Skill } from '../../data/portfolioData';

export const AdminSkills = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>({});
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/skills`);
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      console.error('Failed to fetch skills', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await fetch(`http://localhost:5000/api/skills/${id}`, { method: 'DELETE' });
      setSkills(skills.filter(s => s._id !== id));
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/skills`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const saved = await res.json();
        setSkills([saved, ...skills]);
      } else {
        const res = await fetch(`http://localhost:5000/api/skills/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const updated = await res.json();
        setSkills(skills.map(s => s._id === editingId ? updated : s));
      }
      setEditingId(null);
      setIsAdding(false);
      setFormData({});
    } catch (err) {
      console.error('Failed to save skill', err);
    }
  };

  const startEdit = (s: any) => {
    setEditingId(s._id);
    setFormData(s);
    setIsAdding(false);
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      name: '',
      level: 50,
      years: 1,
      category: 'frontend'
    });
  };

  if (loading) return <div className="p-4 text-center">Loading Skills...</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold font-display text-sm text-slate-900 dark:text-white">Manage Skills</h3>
        <Button onClick={startAdd} variant="primary" icon={Plus} size="sm">Add New Skill</Button>
      </div>

      {(isAdding || editingId) && (
        <Card className="!p-4 border-emerald-500/20 bg-emerald-500/5" hoverEffect={false}>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm text-slate-800 dark:text-zinc-200">
              {isAdding ? 'Add New Skill' : 'Edit Skill'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                className="p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                placeholder="Skill Name"
                value={formData.name || ''}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-500">Mastery Level: {formData.level}%</label>
                <input 
                  type="range"
                  min="0" max="100"
                  className="w-full"
                  value={formData.level || 50}
                  onChange={e => setFormData({...formData, level: parseInt(e.target.value)})}
                />
              </div>
              <input 
                type="number"
                className="p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                placeholder="Years of Experience"
                value={formData.years || ''}
                onChange={e => setFormData({...formData, years: parseInt(e.target.value)})}
              />
              <select 
                className="p-2 text-sm rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
                value={formData.category || 'frontend'}
                onChange={e => setFormData({...formData, category: e.target.value as any})}
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="shopify">Shopify</option>
                <option value="database">Database</option>
                <option value="design">Design</option>
                <option value="ai">AI</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex gap-2 justify-end mt-2">
              <Button onClick={() => { setIsAdding(false); setEditingId(null); }} variant="outline" size="sm" icon={X}>Cancel</Button>
              <Button onClick={handleSave} variant="primary" size="sm" icon={Save}>Save</Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map(s => (
          <Card key={s._id} className="!p-4 flex flex-col justify-between" hoverEffect={false}>
            <div>
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-800 dark:text-zinc-200">{s.name}</h4>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">{s.category} • {s.level}%</p>
            </div>
            <div className="flex gap-2 justify-end mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
              <button onClick={() => startEdit(s)} className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(s._id)} className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
