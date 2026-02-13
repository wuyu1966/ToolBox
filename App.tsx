
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { 
    Link as LinkIcon, 
    Code2, 
    Scissors, 
    Timer, 
    Mic, 
    FileJson, 
    Palette, 
    Columns, 
    StickyNote,
    Menu, 
    X,
    Wrench,
    Wand2,
    Brain,
    Sparkles,
    PanelLeftClose,
    PanelLeftOpen
} from 'lucide-react';

// Tool Components
import JinaMarkdown from './components/tools/JinaMarkdown';
import MarkdownToJs from './components/tools/MarkdownToJs';
import TextSplitter from './components/tools/TextSplitter';
import TimerTool from './components/tools/TimerTool';
import TextExtractorTTS from './components/tools/TextExtractorTTS';
import PromptTemplate from './components/tools/PromptTemplate';
import ColorDebugger from './components/tools/ColorDebugger';
import DualTextbox from './components/tools/DualTextbox';
import TemplateNote from './components/tools/TemplateNote';
import PromptGenerator from './components/tools/PromptGenerator';
import NotebookLMGenerator from './components/tools/NotebookLMGenerator';
import NotebookLMLab from './components/tools/NotebookLMLab';

const Navigation = ({ onClose }: { onClose?: () => void }) => {
    const navItems = [
        { path: '/note', icon: StickyNote, label: 'Temporary Note' },
        { path: '/dual', icon: Columns, label: 'Dual Textbox' },
        { path: '/prompt', icon: FileJson, label: 'Prompt Variables' },
        { path: '/notebook-lab', icon: Sparkles, label: 'NotebookLM Prompt 2' },
        { path: '/notebook-lm', icon: Brain, label: 'NotebookLM Prompt' },
        { path: '/generator', icon: Wand2, label: 'Portrait Prompt Gen' },
        { path: '/colors', icon: Palette, label: 'Color Pallete' },
        { path: '/splitter', icon: Scissors, label: 'Text Splitter' },
        { path: '/timer', icon: Timer, label: 'Timer' },
        { path: '/jina', icon: LinkIcon, label: 'Jina Reader' },
        { path: '/md-to-js', icon: Code2, label: 'MD to String' },
        { path: '/tts', icon: Mic, label: 'TTS' },
    ];

    return (
        <nav className="space-y-1 px-3">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                            isActive
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                        }`
                    }
                >
                    <item.icon className="mr-3 h-5 w-5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

const Layout = ({ children }: { children?: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(true);
    const location = useLocation();
    
    // Auto-hide mobile sidebar on navigation
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    // Get current title based on path
    const getTitle = () => {
        switch(location.pathname) {
            case '/generator': return 'Portrait Prompt Gen';
            case '/notebook-lab': return 'NotebookLM Prompt 2';
            case '/notebook-lm': return 'NotebookLM Prompt';
            case '/jina': return 'Jina Reader';
            case '/md-to-js': return 'MD to JS String';
            case '/splitter': return 'Text Splitter';
            case '/timer': return 'Timer';
            case '/tts': return 'TTS';
            case '/note': return 'Temporary Note';
            case '/prompt': return 'Prompt Variables';
            case '/colors': return 'Color Pallete';
            case '/dual': return 'Dual Textbox';
            default: return 'ToolBox';
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
            {/* Desktop Sidebar */}
            <div 
                className={`hidden md:flex md:flex-col border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl transition-all duration-300 ease-in-out ${
                    desktopSidebarVisible ? 'md:w-64' : 'md:w-0'
                } overflow-hidden`}
            >
                <div className="flex flex-col flex-grow pt-5 pb-4 min-w-[16rem]">
                    <div className="flex items-center justify-between flex-shrink-0 px-6 mb-8">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-600/10 rounded-lg mr-3">
                                <Wrench className="h-6 w-6 text-blue-500" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-100">ToolBox</span>
                        </div>
                        <button 
                            onClick={() => setDesktopSidebarVisible(false)}
                            className="p-1.5 text-slate-500 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-all"
                            title="Collapse Sidebar"
                        >
                            <PanelLeftClose className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex-1 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
                        <Navigation />
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex md:hidden">
                    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={() => setSidebarOpen(false)}></div>
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 pt-5 pb-4 shadow-2xl transform transition-transform">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                type="button"
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X className="h-6 w-6 text-white" />
                            </button>
                        </div>
                        <div className="flex-shrink-0 flex items-center px-4 mb-6">
                            <Wrench className="h-8 w-8 text-blue-500 mr-2" />
                            <span className="text-xl font-bold text-white">ToolBox</span>
                        </div>
                        <div className="mt-5 flex-1 h-0 overflow-y-auto">
                            <Navigation onClose={() => setSidebarOpen(false)} />
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex flex-col flex-1 w-0 overflow-hidden bg-slate-950">
                {/* Desktop Header for collapsed state */}
                <div className="hidden md:flex items-center p-4 bg-slate-900/30 border-b border-slate-800/50">
                    {!desktopSidebarVisible && (
                        <button
                            onClick={() => setDesktopSidebarVisible(true)}
                            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-all mr-4"
                            title="Expand Sidebar"
                        >
                            <PanelLeftOpen className="h-5 w-5" />
                        </button>
                    )}
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Tool</span>
                        <h1 className="text-lg font-bold text-slate-100 tracking-tight leading-none">{getTitle()}</h1>
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="md:hidden flex items-center p-4 bg-slate-900 border-b border-slate-800">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-slate-400 hover:text-slate-200 focus:outline-none"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="ml-2 text-lg font-semibold text-slate-100">{getTitle()}</span>
                </div>
                
                <main className="flex-1 relative overflow-y-auto focus:outline-none scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    <div className="h-full p-2 sm:p-4">
                         {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <HashRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/note" replace />} />
                    <Route path="/generator" element={<PromptGenerator />} />
                    <Route path="/notebook-lab" element={<NotebookLMLab />} />
                    <Route path="/notebook-lm" element={<NotebookLMGenerator />} />
                    <Route path="/jina" element={<JinaMarkdown />} />
                    <Route path="/md-to-js" element={<MarkdownToJs />} />
                    <Route path="/splitter" element={<TextSplitter />} />
                    <Route path="/timer" element={<TimerTool />} />
                    <Route path="/tts" element={<TextExtractorTTS />} />
                    <Route path="/note" element={<TemplateNote />} />
                    <Route path="/prompt" element={<PromptTemplate />} />
                    <Route path="/colors" element={<ColorDebugger />} />
                    <Route path="/dual" element={<DualTextbox />} />
                </Routes>
            </Layout>
        </HashRouter>
    );
};

export default App;
