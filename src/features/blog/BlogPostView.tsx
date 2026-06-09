import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogData';
import { MarkdownRenderer } from './MarkdownRenderer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export const BlogPostView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const { addNotification } = usePortfolioStore();

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  // Monitor scroll for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen pt-36 pb-16 text-center flex flex-col items-center justify-center gap-4 text-slate-800 dark:text-zinc-200">
        <h2 className="text-xl font-bold font-display">Article Not Found</h2>
        <p className="text-xs text-slate-500 max-w-xs">
          The publication you are looking for might have been moved or deleted.
        </p>
        <Button variant="primary" size="sm" onClick={() => navigate('/blog')}>
          Return to Blog
        </Button>
      </div>
    );
  }

  // Find related posts (same category, excluding current post)
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.id !== post.id
  ).slice(0, 2);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addNotification('Article link copied to clipboard! 🔗', 'success', 'Link Copied');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-darkbg/40 text-slate-800 dark:text-zinc-200 text-left relative">
      
      {/* SCROLL PROGRESS INDICATOR BAR */}
      <div 
        className="fixed top-0 left-0 h-1 bg-accent z-[50] transition-all duration-100 ease-out no-print"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-10">
        
        {/* Navigation Action */}
        <div className="no-print">
          <Button 
            variant="ghost" 
            size="sm" 
            icon={ArrowLeft} 
            onClick={() => navigate('/blog')}
            className="-ml-3"
          >
            Back to Articles
          </Button>
        </div>

        {/* POST HEADER */}
        <div className="flex flex-col gap-5 border-b border-slate-200 dark:border-zinc-800 pb-8">
          
          <div className="flex flex-wrap items-center gap-3.5 text-[10px] text-slate-400 dark:text-zinc-500 font-mono">
            <span className="px-2 py-0.5 rounded bg-accent/10 text-accent font-bold uppercase">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-display text-slate-900 dark:text-white leading-[1.15] tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            {/* Author */}
            <div className="flex items-center gap-2.5">
              <div 
                className="w-9 h-9 rounded-full border border-white/20 shrink-0" 
                style={{ background: post.author.avatar }}
              />
              <div className="text-left flex flex-col">
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">{post.author.name}</span>
                <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-medium">Technical Writer</span>
              </div>
            </div>

            {/* Share action buttons */}
            <div className="flex gap-2.5 items-center no-print">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent transition-colors"
                title="Copy share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* IMAGE HIGHLIGHT BOX */}
        <div 
          className="h-60 sm:h-80 w-full rounded-3xl relative flex items-center justify-center p-8 overflow-hidden shadow-lg"
          style={{ background: post.image }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:12px_12px]" />
          <div className="relative text-white/10 font-display font-black text-6xl tracking-tight text-center select-none">
            {post.category.toUpperCase()}
          </div>
        </div>

        {/* ARTICLE MARKDOWN CONTENT */}
        <article className="min-h-[250px] border-b border-slate-200 dark:border-zinc-800 pb-10">
          <MarkdownRenderer content={post.content} />
        </article>

        {/* TAGS FOOTER */}
        <div className="flex flex-wrap gap-2 text-left">
          {post.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200/40 dark:border-zinc-750 font-medium">
              <Tag className="w-3 h-3 text-slate-400" />
              <span>{tag}</span>
            </span>
          ))}
        </div>

        {/* RELATED ARTICLES SECTION */}
        {relatedPosts.length > 0 && (
          <div className="mt-6 flex flex-col gap-6 text-left no-print">
            <h3 className="font-bold font-display text-lg text-slate-900 dark:text-white border-b pb-2">
              Related Articles
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Card
                  key={related.id}
                  onClick={() => {
                    navigate(`/blog/${related.slug}`);
                    window.scrollTo({ top: 0 });
                  }}
                  className="!p-4 bg-white dark:bg-darkcard border-slate-200 dark:border-darkborder cursor-pointer flex flex-col justify-between"
                  glowBorder
                  spotlight
                  hoverEffect
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-mono text-accent font-bold uppercase">{related.category}</span>
                    <h4 className="font-bold font-display text-xs sm:text-sm text-slate-800 dark:text-zinc-200 line-clamp-2 leading-snug">
                      {related.title}
                    </h4>
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-4 border-t border-slate-50 dark:border-zinc-900 pt-3">
                    <span>{related.date}</span>
                    <span className="text-accent font-bold">Read</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogPostView;
