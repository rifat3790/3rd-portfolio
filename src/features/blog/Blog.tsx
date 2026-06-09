import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogData';
import { Card } from '../../components/ui/Card';

export const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Shopify', label: 'Shopify' },
    { id: 'React', label: 'React' },
    { id: 'CSS', label: 'CSS & Motion' }
  ];

  // Filtering
  const filteredPosts = BLOG_POSTS.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS[0];
  const regularPosts = filteredPosts.filter(p => p.id !== featuredPost.id || activeCategory !== 'all');

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-darkbg/40 text-slate-800 dark:text-zinc-200 text-left">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-zinc-800 pb-6 text-left">
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-accent/10 text-accent">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white">
                Technical Insights & Engineering Log
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">
                Articles covering Shopify storefront optimizations, advanced state management, and visual design guidelines.
              </p>
            </div>
          </div>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-darkcard border border-slate-200/60 dark:border-zinc-800 p-4.5 rounded-2xl shadow-sm w-full">
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer border ${
                  activeCategory === cat.id
                    ? 'btn-active-premium'
                    : 'border-slate-200/50 dark:border-zinc-800/80 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-850 hover:text-slate-900 dark:hover:text-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 flex items-center border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 bg-slate-50 dark:bg-zinc-950/20">
            <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs focus:outline-none text-slate-800 dark:text-zinc-200"
            />
          </div>
        </div>

        {/* FEATURED ARTICLE HERO - Only visible when search/categories are reset */}
        {activeCategory === 'all' && !searchQuery && featuredPost && (
          <div className="w-full">
            <Card 
              className="!p-0 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-darkcard overflow-hidden cursor-pointer"
              glowBorder
              spotlight
              hoverEffect
              onClick={() => handlePostClick(featuredPost.slug)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Image panel */}
                <div 
                  className="lg:col-span-5 h-64 lg:h-auto w-full relative flex items-center justify-center p-8"
                  style={{ background: featuredPost.image }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:12px_12px]" />
                  <div className="relative text-white font-display font-black text-xl tracking-tight text-center drop-shadow-md">
                    FEATURED PUBLICATION
                  </div>
                </div>

                {/* Meta details */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center gap-4 text-left">
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 dark:text-zinc-500 font-mono">
                    <span className="px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold">{featuredPost.category}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featuredPost.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featuredPost.readTime}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white leading-tight">
                    {featuredPost.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-zinc-800/80 pt-4 mt-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full border border-white/20 shrink-0" style={{ background: featuredPost.author.avatar }} />
                      <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200">{featuredPost.author.name}</span>
                    </div>

                    <span className="text-xs font-bold text-accent flex items-center gap-1 hover:gap-2 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ARTICLES GRID */}
        <div className="w-full flex flex-col gap-6">
          <h3 className="font-bold font-display text-lg text-slate-900 dark:text-white border-b pb-2 text-left">
            {activeCategory === 'all' && !searchQuery ? 'Recent Publications' : 'Search Results'}
          </h3>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(activeCategory === 'all' && !searchQuery ? regularPosts : filteredPosts).map((post) => (
                <Card
                  key={post.id}
                  className="!p-0 flex flex-col w-full bg-white dark:bg-darkcard border-slate-200 dark:border-darkborder cursor-pointer h-full"
                  glowBorder
                  spotlight
                  hoverEffect
                  onClick={() => handlePostClick(post.slug)}
                >
                  {/* Card image panel */}
                  <div 
                    className="h-40 w-full relative flex items-center justify-center p-6"
                    style={{ background: post.image }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
                    <div className="relative text-white font-display font-black text-base tracking-tight text-center drop-shadow-md">
                      {post.category} Focus
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="p-5 flex flex-col flex-grow text-left gap-3.5">
                    <div className="flex items-center gap-3 text-[9.5px] text-slate-400 dark:text-zinc-500 font-mono">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h4 className="text-sm font-bold font-display text-slate-800 dark:text-zinc-100 line-clamp-2 leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-zinc-500 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Tag bubbles */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {post.tags.map((t) => (
                        <span key={t} className="text-[8.5px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800/80 text-slate-500 dark:text-zinc-400">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-zinc-800/80 pt-4 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full border border-white/20 shrink-0" style={{ background: post.author.avatar }} />
                        <span className="text-[11px] font-semibold text-slate-700 dark:text-zinc-350">{post.author.name}</span>
                      </div>
                      <span className="text-[11px] font-bold text-accent flex items-center gap-1 group-hover:gap-1.5 transition-all">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-12 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-2 max-w-md mx-auto text-slate-500 dark:text-zinc-500">
              <AlertCircle className="w-8 h-8 text-slate-400 dark:text-zinc-650" />
              <span className="text-sm font-semibold font-display">No articles found</span>
              <p className="text-xs text-center max-w-xs px-4 mt-0.5">
                Try typing a different search query or select another category tab filter.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Blog;
