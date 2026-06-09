import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Split content by code blocks first
  const blocks = content.split(/(```[\s\S]*?```)/g);

  const renderTextWithFormatting = (text: string) => {
    // Basic bold **text** mapping
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-extrabold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-zinc-350 text-left">
      {blocks.map((block, index) => {
        
        // Render Code block
        if (block.startsWith('```')) {
          const lines = block.split('\n');
          const firstLine = lines[0];
          const language = firstLine.replace('```', '') || 'code';
          const codeLines = lines.slice(1, -1);
          const rawCode = codeLines.join('\n');
          const codeBlockId = `code-block-${index}`;

          return (
            <div key={index} className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-900 text-zinc-100 my-4 font-mono shadow-md">
              {/* Toolbar */}
              <div className="flex justify-between items-center bg-slate-950 px-4 py-2 border-b border-zinc-800 text-[10px]">
                <span className="text-zinc-500 uppercase font-semibold tracking-wider">{language}</span>
                <button
                  onClick={() => handleCopyCode(rawCode, codeBlockId)}
                  className="text-zinc-400 hover:text-white flex items-center gap-1 p-1 rounded hover:bg-zinc-800 transition-colors"
                >
                  {copiedId === codeBlockId ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code */}
              <pre className="p-4 text-left overflow-x-auto text-[11px] leading-relaxed">
                <code>{rawCode}</code>
              </pre>
            </div>
          );
        }

        // Render standard paragraph lines
        const lines = block.split('\n');
        return lines.map((line, lineIdx) => {
          const trimmed = line.trim();
          
          if (!trimmed) return <div key={`${index}-${lineIdx}`} className="h-2" />;

          // H1 Header
          if (trimmed.startsWith('# ')) {
            return (
              <h1 key={`${index}-${lineIdx}`} className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight mt-6 mb-2 border-b pb-2 border-slate-100 dark:border-zinc-900">
                {trimmed.replace('# ', '')}
              </h1>
            );
          }

          // H2 Header
          if (trimmed.startsWith('## ')) {
            return (
              <h2 key={`${index}-${lineIdx}`} className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white tracking-tight mt-5 mb-2">
                {trimmed.replace('## ', '')}
              </h2>
            );
          }

          // H3 Header
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={`${index}-${lineIdx}`} className="text-lg font-bold font-display text-slate-900 dark:text-white tracking-tight mt-4 mb-1.5">
                {trimmed.replace('### ', '')}
              </h3>
            );
          }

          // Blockquote
          if (trimmed.startsWith('> ')) {
            return (
              <blockquote key={`${index}-${lineIdx}`} className="border-l-4 border-accent bg-slate-50 dark:bg-zinc-900/50 pl-4 py-3 pr-2 my-3 rounded-r-xl italic text-slate-600 dark:text-zinc-400">
                {renderTextWithFormatting(trimmed.replace('> ', ''))}
              </blockquote>
            );
          }

          // List item
          if (trimmed.startsWith('* ')) {
            return (
              <ul key={`${index}-${lineIdx}`} className="list-disc pl-5 my-1.5 flex flex-col">
                <li className="leading-relaxed">
                  {renderTextWithFormatting(trimmed.replace('* ', ''))}
                </li>
              </ul>
            );
          }

          // List item numbered
          if (/^\d+\.\s/.test(trimmed)) {
            const content = trimmed.replace(/^\d+\.\s/, '');
            return (
              <ol key={`${index}-${lineIdx}`} className="list-decimal pl-5 my-1.5 flex flex-col">
                <li className="leading-relaxed">
                  {renderTextWithFormatting(content)}
                </li>
              </ol>
            );
          }

          // Horizontal rule
          if (trimmed === '---') {
            return <hr key={`${index}-${lineIdx}`} className="my-6 border-slate-200 dark:border-zinc-800" />;
          }

          // Regular paragraph
          return (
            <p key={`${index}-${lineIdx}`} className="leading-relaxed my-1">
              {renderTextWithFormatting(trimmed)}
            </p>
          );
        });
      })}
    </div>
  );
};
export default MarkdownRenderer;
