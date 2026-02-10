
import React, { useState, useEffect } from 'react';
import { 
    RotateCcw, Copy, XCircle, 
    Info 
} from 'lucide-react';

// Config Data from the provided HTML
const CONFIG = {
    roles: [
        { id: 'designer', label: '简报设计师', prompt: '你是一位精通资讯图表与视觉传达的设计大师。' },
        { id: 'expert', label: '领域专家', prompt: '你是一位具有多年经验的行业专家。' },
        { id: 'storyteller', label: '说故事高手', prompt: '你是一位擅长将複杂概念转化为动人故事的作家。' },
        { id: 'teacher', label: '科普老师', prompt: '你是一位擅长用浅显易懂语言教学的国小老师。' },
        { id: 'youtuber', label: '内容创作者', prompt: '你是一位知名的 YouTuber，擅长制作高点击率的知识型影片。' },
        { id: 'analyst', label: '数据分析师', prompt: '你是一位严谨的数据分析师，擅长从溷乱的资料中找出关键趋势。' },
        { id: 'marketer', label: '行销策略师', prompt: '你是一位敏锐的行销策略师，擅长抓住受众痛点。' },
    ],
    infographics: [
        { id: 'i1', label: '懒人包 1', prompt: '生成一个高品质的抽象背景简报，使用深蓝色和金属金色渐层作为主色调，融入微妙的几何箭头纹理来增加视觉深度，添加磨砂玻璃覆盖层以营造半透明的现代感，右侧设计深负空间来平衡布局，提供电影般的灯光效果，包括柔和的阴影 and 高光，让整体呈现时尚企业美学，支持 8K 解析度，採用最小主义设计原则，避免过多元素，每张幻灯片保持乾淨简洁，比例为 16:9，适合横向投影，并确保文字与图形完美对齐。' },
        { id: 'i2', label: '懒人包 2', prompt: '设计一个具备极致留白的极简现代感简报，强调排版比例与呼吸感，使用大胆的非对称佈局。' },
        { id: 'i3', label: '懒人包 3', prompt: '打造一个具备动态感与未来科技气息的简报，融合萤光光效与深色玻璃拟态元素。' },
        { id: 'i4', label: '懒人包 4', prompt: '呈现一个具备人文温度与手作感的视觉风格，使用类纸张质感的背景与柔和的大地色调。' },
        { id: 'i5', label: '懒人包 5', prompt: '建立一个具备高度资讯组织感的仪表板风格简报，侧重于多维度数据的清晰呈现。' },
        { id: 'i6', label: '懒人包 6', prompt: '以蒙太奇拼贴手法设计的创意海报风格简报，打破常规框架，充满艺术表现力。' },
        { id: 'i7', label: '懒人包 7', prompt: '专业的学术报告风格，强调图表精确性、引用来源标注与严谨的视觉层次感。' },
    ],
    visual_styles: [
        { id: 'hand-drawn', label: '手绘涂鸦', prompt: '视觉风格：手绘涂鸦风。使用具备质感的笔记本纸张作为背景（如方格或横线纸），所有元素、插图与文字呈现自然的手写笔触，线条带有随性且不完全笔直的特性，色彩活泼，营造温暖且具备个人笔记感的视觉体验。' },
        { id: 'high-key', label: '高调摄影', prompt: '视觉风格：高品质摄影，无边框。使用“高调摄影 (High-key Photography)”作为背景，模拟明亮的自然光与柔和阴影。整体视觉极度轻盈，拒绝廉价的扁平化向量图。' },
        { id: 'modern-min', label: '现代简约', prompt: '视觉风格：现代简约。强调大量留白、细緻文字排版，追求极致乾淨。' },
        { id: 'apple-style', label: '苹果风格', prompt: '视觉风格：苹果风格。使用高质感产品展示照、优雅的渐层背景与精緻的工艺感。' },
        { id: 'dark-business', label: '深色商务', prompt: '视觉风格：深色商务。以深蓝或纯黑作为基底，搭配具备金属质感的边框与元素。' },
        { id: 'tech-future', label: '科技未来', prompt: '视觉风格：科技未来感。融入萤光线条、数据图表感元素以及全息投影视觉。' },
        { id: 'creative-active', label: '创意活泼', prompt: '视觉风格：创意活泼。採用大胆配色与趣味插图，营造动态且具吸引力的氛围。' },
        { id: 'academic-pro', label: '学术专业', prompt: '视觉风格：学术专业。条理分明、层次清晰，採用经典衬线体 (Serif) 呈现权威感。' },
        { id: 'retro-news', label: '复古怀旧', prompt: '视觉风格：复古怀旧。低饱和度色调、彷旧报纸质感，营造历史厚度感。' },
    ],
    tones: [
        { id: 'inspirational', label: '专业启发', prompt: '沟通语气：文字应具备专业度，同时充满启发性，引发读者思考。' },
        { id: 'academic', label: '严谨学术', prompt: '沟通语气：採用严谨、学术化的语法，确保论述具有高度可信度。' },
        { id: 'creative-vibe', label: '活泼创意', prompt: '沟通语气：活泼且充满创意，打破常规，使用生动的表达方式。' },
        { id: 'minimal-text', label: '简约精炼', prompt: '沟通语气：极致简约，去除冗言赘字，仅保留核心精华资讯。' },
        { id: 'persuasive', label: '说服力强', prompt: '沟通语气：强调说服力，逻辑层层递进，旨在转化或打动受众。' },
        { id: 'narrative', label: '故事叙述', prompt: '沟通语气：採用故事叙述感，将资讯融入情节中，增加沉浸体验。' },
    ],
    audiences: [
        { id: 'general', label: '一般大众', prompt: '目标受众：一般大众。不预设专业背景，使用通用语境。' },
        { id: 'executives', label: '公司高层', prompt: '目标受众：公司高层。仅呈现核心决策价值与结论。' },
        { id: 'clients', label: '潜在客户', prompt: '目标受众：潜在客户。专注于痛点解决与产品优势。' },
        { id: 'students', label: '学生', prompt: '目标受众：学生。使用浅显易懂的逻辑与教育引导。' },
        { id: 'social-media', label: '社群媒体', prompt: '目标受众：社群媒体读者。强调视觉衝击与短平快的资讯点。' },
        { id: 'developers', label: '技术开发', prompt: '目标受众：技术开发者。提供详细架构、代码逻辑与实现细节。' },
        { id: 'investors', label: '投资人', prompt: '目标受众：投资人。侧重市场潜力、商业模式与风险分析。' },
    ],
    colors: [
        { id: 'warm-beige', label: '暖白米色', swatches: ['#FFFFFF', '#F5F5DC', '#D2B48C'], prompt: '配色方桉：採用暖白、浅木色或米色作为主色调，风格温馨且优雅。' },
        { id: 'pro-navy', label: '专业深蓝', swatches: ['#0D1B2A', '#1B263B', '#E0E1DD'], prompt: '配色方桉：深海军蓝搭配石板灰。' },
        { id: 'office-blue', label: 'Word 蓝', swatches: ['#2B579A', '#FFFFFF', '#D9E1F2'], prompt: '配色方桉：经典深蓝与纯白组合。' },
        { id: 'office-orange', label: 'PPT 橘', swatches: ['#B7472A', '#FFFFFF', '#FFF2CC'], prompt: '配色方桉：暖橘与深红。' },
        { id: 'luxury-gold', label: '奢华黑金', swatches: ['#000000', '#D4AF37', '#1A1A1A'], prompt: '配色方桉：纯黑背景搭配磨砂金。' },
        { id: 'morandi', label: '莫兰迪色', swatches: ['#9A8C98', '#C9ADA7', '#F2E9E4'], prompt: '配色方桉：低饱和度灰阶色调。' },
        { id: 'apple-white', label: '纯淨科技', swatches: ['#FFFFFF', '#F2F2F7', '#007AFF'], prompt: '配色方桉：极简白背景搭配系统蓝。' },
        { id: 'cyberpunk', label: '赛博庞克', swatches: ['#000000', '#FF00FF', '#00FFFF'], prompt: '配色方桉：纯黑背景搭配萤光紫青。' },
    ],
    notes: [
        { id: 'center-focus', label: '中心对焦', prompt: '结构设计：採用“中心对焦”版型。将最核心的主题或关键图桉放置于画面正中央，周围辅以简洁的放射状或对称排列的资讯，确保视觉焦点第一时间锁定在核心资讯上。' },
        { id: 'glass-container', label: '磨砂玻璃', prompt: '资讯承载于半透明白色磨砂玻璃容器中，确保图文分离且视觉轻盈。' },
        { id: '3-sec-rule', label: '3秒注意力', prompt: '文字极致精练，字体加大，确保在 3 秒内抓住观众注意力。' },
        { id: 'clean-text', label: '图文分离', prompt: '文字务必清晰，图文分离。' },
        { id: 'lighting', label: '光影层次', prompt: '背景必须展现高品质的光影层次，避免平面感。' },
        { id: 'high-res', label: '超高画质', prompt: '确保细节达到 8K 解析度标准。' },
    ]
};

const NotebookLMLab = () => {
    const [title, setTitle] = useState('');
    const [customNotes, setCustomNotes] = useState('');
    const [selections, setSelections] = useState<{
        role: any;
        infographic: any;
        visual_style: any;
        tone: any;
        audience: any;
        color: any;
        notes: any[];
    }>({
        role: CONFIG.roles[0],
        infographic: null,
        visual_style: CONFIG.visual_styles[2],
        tone: CONFIG.tones[0],
        audience: CONFIG.audiences[0],
        color: CONFIG.colors[0],
        notes: [CONFIG.notes[1], CONFIG.notes[2], CONFIG.notes[5]]
    });

    const [leftPanelWidth, setLeftPanelWidth] = useState(60);
    const [isResizing, setIsResizing] = useState(false);
    const [promptOutput, setPromptOutput] = useState('');
    const [copyStatus, setCopyStatus] = useState('Copy');

    const toggleNote = (note: any) => {
        setSelections(prev => {
            const exists = prev.notes.find(n => n.id === note.id);
            if (exists) {
                return { ...prev, notes: prev.notes.filter(n => n.id !== note.id) };
            } else {
                return { ...prev, notes: [...prev.notes, note] };
            }
        });
    };

    const handleSingleSelect = (key: string, value: any) => {
        setSelections(prev => ({
            ...prev,
            [key]: prev[key as keyof typeof prev]?.id === value.id ? null : value
        }));
    };

    useEffect(() => {
        const buildPrompt = () => {
            let prompt = "";
            if (title.trim()) prompt += `# 内容标题\n"${title.trim()}"\n`;
            
            if (selections.role) {
                prompt += `\n# 角色设定\n${selections.role.prompt}\n`;
            }
            
            if (selections.infographic) {
                prompt += `\n# 懒人包样标式\n${selections.infographic.prompt}\n`;
            }
            
            if (selections.visual_style || selections.color) {
                prompt += `\n# 视觉与风格\n`;
                if (selections.visual_style) prompt += selections.visual_style.prompt + "\n";
                if (selections.color) prompt += selections.color.prompt + "\n";
            }
            
            if (selections.tone || selections.audience) {
                prompt += `\n# 策略设定\n`;
                if (selections.tone) prompt += selections.tone.prompt + "\n";
                if (selections.audience) prompt += selections.audience.prompt + "\n";
            }
            
            if (customNotes.trim()) {
                prompt += `\n# 任务细节与额外备注\n${customNotes.trim()}\n`;
            }
            
            if (selections.notes.length > 0) {
                prompt += `\n# 具体要求\n`;
                selections.notes.forEach(n => {
                    prompt += `- ${n.prompt}\n`;
                });
            }
            
            setPromptOutput(prompt.trim());
        };

        buildPrompt();
    }, [title, customNotes, selections]);

    const handleResetAll = () => {
        setTitle('');
        setCustomNotes('');
        setSelections({
            role: null,
            infographic: null,
            visual_style: null,
            tone: null,
            audience: null,
            color: null,
            notes: []
        });
    };

    const handleClearSelections = () => {
        setSelections({
            role: null,
            infographic: null,
            visual_style: null,
            tone: null,
            audience: null,
            color: null,
            notes: []
        });
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(promptOutput);
            setCopyStatus('COPIED');
            setTimeout(() => setCopyStatus('Copy'), 2000);
        } catch (e) {
            console.error(e);
        }
    };

    const startResizing = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;
            const percentage = (e.clientX / window.innerWidth) * 100;
            if (percentage > 20 && percentage < 85) {
                setLeftPanelWidth(percentage);
            }
        };
        const handleMouseUp = () => setIsResizing(false);

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    const GridSection = ({ label, items, stateKey, isMulti, isColor }: any) => (
        <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                {label} {isMulti && <span className="text-[11px] text-blue-500 opacity-70 normal-case">(MULTIPLE)</span>}
            </h3>
            <div className="flex flex-wrap gap-2">
                {items.map((item: any) => {
                    const isActive = isMulti 
                        ? selections.notes.some(n => n.id === item.id)
                        : selections[stateKey as keyof typeof selections]?.id === item.id;
                    
                    return (
                        <button
                            key={item.id}
                            onClick={() => isMulti ? toggleNote(item) : handleSingleSelect(stateKey, item)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border flex flex-col items-center justify-center min-w-[80px] ${
                                isActive 
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-900/20' 
                                : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-500'
                            }`}
                        >
                            <span className="truncate w-full">{item.label}</span>
                            {isColor && item.swatches && (
                                <div className="flex gap-1 mt-1.5">
                                    {item.swatches.map((c: string, idx: number) => (
                                        <div key={idx} className="w-3 h-1.5 rounded-full border border-black/10" style={{ backgroundColor: c }}></div>
                                    ))}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="h-full flex flex-col gap-4 overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-3">
                    <span className="bg-blue-600 text-white px-2.5 py-1 rounded text-xs font-black tracking-tighter shadow-sm">P.L.</span>
                    <h2 className="text-base font-black text-slate-100 uppercase tracking-widest">NotebookLM Prompt 2</h2>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleResetAll}
                        className="text-xs font-black text-red-500 hover:text-red-400 border border-red-900/30 bg-red-950/20 px-4 py-2 rounded-lg transition-all flex items-center gap-2 uppercase"
                    >
                        <XCircle className="w-4 h-4" /> Reset Everything
                    </button>
                </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 flex overflow-hidden border border-slate-800 rounded-2xl bg-slate-900/50">
                {/* Left Panel */}
                <div 
                    className="flex flex-col border-r border-slate-800 bg-slate-900 overflow-hidden" 
                    style={{ flexBasis: `${leftPanelWidth}%` }}
                >
                    <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-slate-700">
                        {/* Title Input */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-slate-500 uppercase mb-3">0. Cover Title</h3>
                            <input 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title for the slide deck..." 
                                className="w-full px-5 py-3.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-200 text-sm outline-none focus:border-blue-500 transition-all shadow-inner" 
                            />
                        </div>

                        <div className="mb-8">
                            <button 
                                onClick={handleClearSelections}
                                className="w-full text-xs font-black bg-amber-600 hover:bg-amber-500 text-white py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20 uppercase tracking-widest"
                            >
                                <RotateCcw className="w-4 h-4" /> Clear Selections
                            </button>
                        </div>

                        <GridSection label="1. Role" items={CONFIG.roles} stateKey="role" />
                        <GridSection label="2. Infographic Style" items={CONFIG.infographics} stateKey="infographic" />
                        <GridSection label="3. Visual Style" items={CONFIG.visual_styles} stateKey="visual_style" />
                        <GridSection label="4. Tone" items={CONFIG.tones} stateKey="tone" />
                        <GridSection label="5. Audience" items={CONFIG.audiences} stateKey="audience" />
                        <GridSection label="6. Color Palette" items={CONFIG.colors} stateKey="color" isColor={true} />
                        <GridSection label="7. Specific Notes" items={CONFIG.notes} isMulti={true} />

                        {/* Custom Notes */}
                        <div className="mt-10 pt-6 border-t border-slate-800">
                            <h3 className="text-sm font-bold text-slate-500 uppercase mb-3">8. Custom Requirements</h3>
                            <textarea 
                                value={customNotes}
                                onChange={(e) => setCustomNotes(e.target.value)}
                                placeholder="Add specific requirements or additional details here..." 
                                className="w-full h-40 p-5 rounded-xl border border-slate-800 bg-slate-950 text-slate-200 text-sm outline-none focus:border-blue-500 transition-all resize-none shadow-inner scrollbar-thin scrollbar-thumb-slate-700"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Resizer */}
                <div 
                    onMouseDown={startResizing}
                    className="w-1.5 h-full cursor-col-resize hover:bg-blue-600 transition-colors flex items-center justify-center shrink-0 bg-slate-800 group"
                >
                    <div className="w-[1px] h-16 bg-slate-600 group-hover:bg-white rounded-full"></div>
                </div>

                {/* Right Panel */}
                <div className="flex-1 flex flex-col bg-slate-950/50">
                    <div className="px-5 py-4 bg-slate-900/50 border-b border-slate-800 flex justify-between items-center shrink-0">
                        <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">Prompt Output</span>
                        <button 
                            onClick={handleCopy}
                            className={`text-xs font-black px-5 py-2 rounded-lg transition-all uppercase shadow-md ${
                                copyStatus === 'COPIED' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'
                            }`}
                        >
                            {copyStatus}
                        </button>
                    </div>
                    <div className="p-8 overflow-y-auto flex-grow font-mono text-[15px] text-blue-100/80 leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                        <pre className="whitespace-pre-wrap">{promptOutput || 'Configuration will appear here...'}</pre>
                    </div>
                </div>
            </div>

            {/* Help Note */}
            <div className="px-5 py-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-4">
                <div className="p-2 bg-blue-600/10 rounded-lg">
                    <Info className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-xs text-slate-400 leading-tight">
                    <strong className="text-slate-200 uppercase">Usage:</strong> Use the buttons on the left to configure your prompt. The output prompt is optimized for NotebookLM's Audio/Slide overview feature.
                </p>
            </div>
        </div>
    );
};

export default NotebookLMLab;
