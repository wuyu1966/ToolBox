
import React, { useState } from 'react';
import { ExternalLink, Trash2, ArrowRight, Link as LinkIcon, FileText } from 'lucide-react';

const JinaMarkdown = () => {
    // Jina State
    const [jinaUrl, setJinaUrl] = useState('');
    const [jinaConvertedUrl, setJinaConvertedUrl] = useState('');

    // Cloudflare State
    const [cfUrl, setCfUrl] = useState('');
    const [cfConvertedUrl, setCfConvertedUrl] = useState('');

    const handleJinaConvert = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputUrl = e.target.value;
        setJinaUrl(inputUrl);
        if (inputUrl) {
            setJinaConvertedUrl("https://r.jina.ai/" + inputUrl);
        } else {
            setJinaConvertedUrl("");
        }
    };

    const clearJinaInput = () => {
        setJinaUrl('');
        setJinaConvertedUrl('');
    };

    const handleCfConvert = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputUrl = e.target.value;
        setCfUrl(inputUrl);
        if (inputUrl) {
            setCfConvertedUrl("https://markdown.new/" + inputUrl);
        } else {
            setCfConvertedUrl("");
        }
    };

    const clearCfInput = () => {
        setCfUrl('');
        setCfConvertedUrl('');
    };

    return (
        <div className="h-full flex flex-col gap-6 animate-fade-in pb-6">
            {/* Header */}
            <div className="text-center space-y-2 shrink-0">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight flex items-center justify-center gap-3">
                    <FileText className="w-8 h-8 text-blue-500" />
                    HTML to Markdown
                </h1>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                    Convert web pages to clean Markdown for LLM contexts and documentation.
                </p>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
                {/* Jina Section - Left */}
                <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-blue-500/30 transition-colors">
                    <div className="flex-1 flex flex-col space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <span className="text-xl font-bold text-blue-500">Jina</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-200">Reader API</h2>
                                    <p className="text-xs text-slate-500">r.jina.ai</p>
                                </div>
                            </div>
                            <a href="https://jina.ai/reader/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors p-2 hover:bg-slate-800 rounded-lg">
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </div>
                        
                        <div className="space-y-4">
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Best for extracting main content from blogs, news, and documentation sites. Removes clutter automatically.
                            </p>
                            
                            <div className="space-y-2">
                                <label htmlFor="jinaInput" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target URL</label>
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        id="jinaInput" 
                                        value={jinaUrl}
                                        onChange={handleJinaConvert}
                                        placeholder="https://example.com/article"
                                        className="w-full p-3 pr-10 text-sm rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-slate-100 placeholder-slate-600 font-mono" 
                                    />
                                    {jinaUrl && (
                                        <button 
                                            onClick={clearJinaInput}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-red-400 p-1 rounded-md transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {jinaConvertedUrl && (
                            <div className="pt-4 border-t border-slate-800 animate-slide-up">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Result Link</p>
                                <a 
                                    href={jinaConvertedUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-300 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all text-sm font-mono break-all group relative overflow-hidden"
                                >
                                    <div className="flex items-center gap-2 relative z-10">
                                        <LinkIcon className="w-4 h-4 shrink-0" />
                                        <span className="truncate">{jinaConvertedUrl}</span>
                                        <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </a>
                            </div>
                        )}
                        <div className="flex-1"></div>
                    </div>
                </div>

                {/* Cloudflare Section - Right */}
                <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-amber-500/30 transition-colors">
                     <div className="flex-1 flex flex-col space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-500/10 rounded-lg">
                                    <span className="text-xl font-bold text-amber-500">MD.new</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-200">Cloudflare</h2>
                                    <p className="text-xs text-slate-500">markdown.new</p>
                                </div>
                            </div>
                            <a href="https://markdown.new/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-400 transition-colors p-2 hover:bg-slate-800 rounded-lg">
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </div>
                        
                        <div className="space-y-4">
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Uses Cloudflare Workers to convert any URL into Markdown. Fast and simple for most static pages.
                            </p>
                            
                            <div className="space-y-2">
                                <label htmlFor="cfInput" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target URL</label>
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        id="cfInput" 
                                        value={cfUrl}
                                        onChange={handleCfConvert}
                                        placeholder="https://example.com/article"
                                        className="w-full p-3 pr-10 text-sm rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-slate-100 placeholder-slate-600 font-mono" 
                                    />
                                    {cfUrl && (
                                        <button 
                                            onClick={clearCfInput}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-red-400 p-1 rounded-md transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {cfConvertedUrl && (
                            <div className="pt-4 border-t border-slate-800 animate-slide-up">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Result Link</p>
                                <a 
                                    href={cfConvertedUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/40 transition-all text-sm font-mono break-all group relative overflow-hidden"
                                >
                                    <div className="flex items-center gap-2 relative z-10">
                                        <LinkIcon className="w-4 h-4 shrink-0" />
                                        <span className="truncate">{cfConvertedUrl}</span>
                                        <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </a>
                            </div>
                        )}
                        <div className="flex-1"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JinaMarkdown;
