import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy,
  Sword,
  Sparkles,
  Play,
  BookOpen,
  X,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  User,
  HelpCircle,
  Shield,
  Zap,
  Info
} from 'lucide-react';
import { PRETERITO_QUESTIONS, IRREGULAR_VERBS, REGULAR_RULES } from './constants';

type AppState = 'intro' | 'duel' | 'results';

export default function App() {
  const [state, setState] = useState<AppState>('intro');
  const [scores, setScores] = useState({ gor: 0, gayane: 0 });
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isTheoryOpen, setIsTheoryOpen] = useState(false);
  const [activeTheoryTab, setActiveTheoryTab] = useState<'irregular' | 'regular'>('irregular');
  
  // Feedback state
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    chosenText: string;
    correctText: string;
    explanation: string;
  } | null>(null);

  // Determine whose turn it is
  // Gor takes odd questions (1, 3, 5, 7, 9, 11, 13, 15) -> index 0, 2, 4, etc.
  // Gayane takes even questions (2, 4, 6, 8, 10, 12, 14) -> index 1, 3, 5, etc.
  const currentTurn: 'gor' | 'gayane' = currentQuestionIdx % 2 === 0 ? 'gor' : 'gayane';
  const currentQuestion = PRETERITO_QUESTIONS[currentQuestionIdx];

  const handleStartGame = () => {
    setScores({ gor: 0, gayane: 0 });
    setCurrentQuestionIdx(0);
    setFeedback(null);
    setState('duel');
  };

  const handleSelectOption = (option: { text: string; isCorrect: boolean }) => {
    if (feedback) return; // Prevent double clicking

    const correctAnswer = currentQuestion.options.find(opt => opt.isCorrect)?.text || '';

    if (option.isCorrect) {
      setScores(prev => ({
        ...prev,
        [currentTurn]: prev[currentTurn] + 100
      }));
    }

    setFeedback({
      isCorrect: option.isCorrect,
      chosenText: option.text,
      correctText: correctAnswer,
      explanation: currentQuestion.explanation
    });
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    if (currentQuestionIdx < PRETERITO_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setState('results');
    }
  };

  const resetGame = () => {
    setScores({ gor: 0, gayane: 0 });
    setCurrentQuestionIdx(0);
    setFeedback(null);
    setState('intro');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans overflow-x-hidden flex flex-col items-center select-none relative pb-12">
      {/* Background Neon Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-900/30 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-purple-900/20 blur-[120px]" />
      </div>

      {/* Header Bar */}
      <header className="w-full max-w-6xl px-4 md:px-8 py-4 flex justify-between items-center border-b border-slate-800/80 z-20 backdrop-blur-md sticky top-0 relative">
        <div className="flex items-center gap-2">
          <BookOpen className="text-indigo-400 w-5 h-5" />
          <span className="text-sm font-black uppercase tracking-wider text-indigo-300">Pretérito Imperfecto BATTLE</span>
        </div>
        
        {/* Quick Theory Trigger */}
        <button
          id="theory-trigger"
          onClick={() => setIsTheoryOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 rounded-full border border-indigo-500/30 text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:scale-95"
        >
          <BookOpen size={14} />
          <span>Տեսություն</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-4xl px-4 flex-1 flex flex-col items-center justify-center z-10 py-6">
        <AnimatePresence mode="wait">
          
          {/* INTRO APP STATE */}
          {state === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col items-center text-center space-y-8 py-8 md:py-12"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-24 h-24 md:w-32 md:h-32 bg-indigo-600/20 rounded-[2rem] border border-indigo-500/40 flex items-center justify-center shadow-lg shadow-indigo-500/10"
                >
                  <Sword className="text-indigo-400 w-12 md:w-16 h-12 md:h-16" />
                </motion.div>
                <div className="absolute -top-3 -right-3 bg-purple-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-white border border-purple-400 animate-bounce">
                  DUEL
                </div>
              </div>

              <div>
                <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                  ԳՈՌ <span className="text-indigo-400">vs</span> ԳԱՅԱՆԵ
                </h1>
                <p className="text-indigo-300/80 font-mono text-sm tracking-wider uppercase mt-3">
                  Pretérito Imperfecto • 15 հարցով անցյալի մրցախաղ
                </p>
              </div>

              {/* Character Avatards */}
              <div className="grid grid-cols-2 gap-6 w-full max-w-md my-4">
                <div className="p-5 bg-gradient-to-b from-indigo-950/40 to-slate-900/80 rounded-3xl border border-indigo-500/20 text-center relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
                  <div className="w-14 h-14 bg-indigo-500/10 rounded-full mx-auto flex items-center justify-center mb-3">
                    <User className="text-indigo-400 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-100">ԳՈՌ</h3>
                  <p className="text-slate-400 text-xs mt-1 font-medium">Կապույտ դաշինք</p>
                </div>

                <div className="p-5 bg-gradient-to-b from-purple-950/40 to-slate-900/80 rounded-3xl border border-purple-500/20 text-center relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-purple-500" />
                  <div className="w-14 h-14 bg-purple-500/10 rounded-full mx-auto flex items-center justify-center mb-3">
                    <User className="text-purple-400 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-100">ԳԱՅԱՆԵ</h3>
                  <p className="text-slate-400 text-xs mt-1 font-medium">Մանուշակագույն ուժ</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                  id="start-duel"
                  onClick={handleStartGame}
                  className="flex-1 py-4 md:py-5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl text-lg font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95 border-b-[6px] border-indigo-800"
                >
                  Սկսել Մենամարտը
                </button>
                
                <button
                  id="view-theory"
                  onClick={() => {
                    setActiveTheoryTab('irregular');
                    setIsTheoryOpen(true);
                  }}
                  className="py-4 px-6 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all border border-slate-700 active:scale-95"
                >
                  Կարդալ Տեսությունը
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-900/40 px-4 py-2 rounded-xl">
                <Info size={14} />
                <span>Հարցերը տրվում են հաջորդաբար՝ Գոռին և Գայանեին կես-կես:</span>
              </div>
            </motion.div>
          )}

          {/* PLAYING DUEL STATE */}
          {state === 'duel' && currentQuestion && (
            <motion.div
              key="duel"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col space-y-6 md:space-y-8"
            >
              {/* Scoreboard and Turn indicator */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {/* Gor Card */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  currentTurn === 'gor' 
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-500/10' 
                    : 'bg-slate-900/40 border-slate-800 opacity-60'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${currentTurn === 'gor' ? 'bg-indigo-400 animate-ping' : 'bg-indigo-600/40'}`} />
                      <span className="font-mono text-xs uppercase tracking-wider text-indigo-400 font-black">ԳՈՌ</span>
                    </div>
                    {currentTurn === 'gor' && (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-500 text-white px-2 py-0.5 rounded-full">ՔՈ ՀԵՐԹՆ Է</span>
                    )}
                  </div>
                  <p className="text-3xl font-black text-white mt-1">{scores.gor} <span className="text-xs text-slate-500 font-medium">Միավոր</span></p>
                </div>

                {/* Gayane Card */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  currentTurn === 'gayane' 
                    ? 'bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-500/10' 
                    : 'bg-slate-900/40 border-slate-800 opacity-60'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${currentTurn === 'gayane' ? 'bg-purple-400 animate-ping' : 'bg-purple-600/40'}`} />
                      <span className="font-mono text-xs uppercase tracking-wider text-purple-400 font-black">ԳԱՅԱՆԵ</span>
                    </div>
                    {currentTurn === 'gayane' && (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-purple-500 text-white px-2 py-0.5 rounded-full">ՔՈ ՀԵՐԹՆ Է</span>
                    )}
                  </div>
                  <p className="text-3xl font-black text-white mt-1">{scores.gayane} <span className="text-xs text-slate-500 font-medium">Միավոր</span></p>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="w-full">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-2 font-mono uppercase tracking-wider">
                  <span>Հարց ({currentQuestionIdx + 1} / {PRETERITO_QUESTIONS.length})</span>
                  <span>Բայ՝ {currentQuestion.verb}</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIdx + 1) / PRETERITO_QUESTIONS.length) * 100}%` }}
                    className="h-full bg-indigo-500"
                  />
                </div>
              </div>

              {/* Main Question Card */}
              <div className="bg-slate-900/60 border border-slate-800 p-6 md:p-10 rounded-3xl shadow-xl flex flex-col space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
                
                {/* Armenian Phrase */}
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Թարգմանիր արտահայտությունը</span>
                  <p className="text-xl md:text-3xl font-black text-white leading-tight break-words">
                    {currentQuestion.armenian}
                  </p>
                </div>

                {/* Spanish Clue with gaps */}
                <div className="bg-slate-950/80 p-5 md:p-8 rounded-2xl border border-slate-800/80 font-serif italic text-lg md:text-2xl text-center text-slate-200">
                  {currentQuestion.spanishClue.split('____').map((part, index, arr) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < arr.length - 1 && (
                        <span className="inline-block px-4 mx-1.5 py-1 border-b-2 md:border-b-4 border-indigo-400 text-indigo-300 font-sans font-black not-italic text-sm md:text-lg">
                          {(feedback) ? feedback.correctText : '____'}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Options Section */}
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Ընտրիր ճիշտ տարբերակը</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentQuestion.options.map((opt, i) => {
                    // Check if selected
                    const isSelected = feedback?.chosenText === opt.text;
                    const isCorrect = opt.isCorrect;
                    
                    let buttonClass = "p-5 rounded-2xl border text-lg md:text-xl font-black transition-all flex items-center justify-between uppercase italic cursor-pointer ";
                    
                    if (feedback) {
                      if (isSelected) {
                        buttonClass += isCorrect 
                          ? "bg-emerald-500/10 border-emerald-500/80 text-emerald-300 ring-2 ring-emerald-500/30" 
                          : "bg-rose-500/10 border-rose-500/80 text-rose-300 ring-2 ring-rose-500/30";
                      } else {
                        buttonClass += isCorrect 
                          ? "bg-emerald-500/5 border-emerald-500/30 text-emerald-400 opacity-80" 
                          : "bg-slate-950/20 border-slate-900 text-slate-500 opacity-40";
                      }
                    } else {
                      buttonClass += "bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850 active:scale-98 hover:text-white";
                    }

                    return (
                      <button
                        key={i}
                        disabled={!!feedback}
                        onClick={() => handleSelectOption(opt)}
                        className={buttonClass}
                      >
                        <span className="truncate">{opt.text}</span>
                        {feedback && (
                          <span className="flex-shrink-0 ml-2">
                            {isCorrect ? <CheckCircle2 className="text-emerald-400 w-5 h-5" /> : isSelected ? <XCircle className="text-rose-400 w-5 h-5" /> : null}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback Explanation Card */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className={`p-5 rounded-2xl border ${
                      feedback.isCorrect 
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' 
                        : 'bg-rose-950/20 border-rose-500/30 text-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {feedback.isCorrect ? (
                          <CheckCircle2 className="text-emerald-400 w-5 h-5" />
                        ) : (
                          <XCircle className="text-rose-400 w-5 h-5" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="font-black text-sm uppercase tracking-wider">
                          {feedback.isCorrect ? 'Ճիշտ է: +100 միավոր' : 'Սխալ է...'}
                        </p>
                        <p className="text-xs md:text-sm text-slate-300 leading-relaxed break-words font-medium">
                          {feedback.explanation}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        id="next-question"
                        onClick={handleNextQuestion}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white text-slate-900 hover:bg-indigo-300 transition-all rounded-full text-xs font-black uppercase tracking-wider"
                      >
                        <span>
                          {currentQuestionIdx < PRETERITO_QUESTIONS.length - 1 ? 'Հաջորդ հարցը' : 'Տեսնել Արդյունքը'}
                        </span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* RESULTS APP STATE */}
          {state === 'results' && (
            <motion.div
              key="results"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-2xl flex flex-col items-center text-center space-y-8 py-8"
            >
              <div className="relative">
                <Trophy size={100} className="text-yellow-400 drop-shadow-[0_10px_40px_rgba(234,179,8,0.3)]" />
                <Sparkles className="absolute -top-3 -right-3 text-white w-10 h-10 animate-pulse" />
              </div>

              <div>
                <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">ՄՐՑԱՎԱԶՔԻ ԱՎԱՐՏ</h2>
                <p className="text-indigo-400 text-sm font-mono tracking-wider uppercase mt-2">
                  Pretérito Imperfecto գործակիցները հաշվարկված են
                </p>
              </div>

              {/* Score Display Card */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl space-y-6">
                <div className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Հաղթողը
                </div>
                
                <div className="text-4xl md:text-5xl font-black uppercase italic text-white underline decoration-indigo-500 decoration-4 underline-offset-8">
                  {scores.gor > scores.gayane ? (
                    '🏆 ԳՈՌ'
                  ) : scores.gayane > scores.gor ? (
                    '🏆 ԳԱՅԱՆԵ'
                  ) : (
                    '🤝 ՈՉ-ՈՔԻ'
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
                  <div>
                    <p className="text-xs font-black uppercase text-indigo-400">Գոռ</p>
                    <p className="text-4xl font-black text-white mt-1">{scores.gor}</p>
                    <p className="text-[10px] text-slate-500 italic mt-0.5">8 պատասխան</p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-purple-400">Գայանե</p>
                    <p className="text-4xl font-black text-white mt-1">{scores.gayane}</p>
                    <p className="text-[10px] text-slate-500 italic mt-0.5">7 պատասխան</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                  id="play-again"
                  onClick={resetGame}
                  className="flex-1 py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl text-lg font-black uppercase tracking-wider transition-all border-b-[6px] border-indigo-800 active:scale-95"
                >
                  Խաղալ Նորից
                </button>
                <button
                  id="open-theory-end"
                  onClick={() => setIsTheoryOpen(true)}
                  className="py-4 px-6 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all border border-slate-700 active:scale-95"
                >
                  Կոնսուլտացնել դասը
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* THEORY MODAL VIEW (SPLIT OR DRAWER TAB VIEW) */}
      <AnimatePresence>
        {isTheoryOpen && (
          <motion.div
            id="theory-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/40">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-indigo-400 w-5 h-5" />
                  <div>
                    <h3 className="text-lg md:text-xl font-black uppercase text-white">Pretérito Imperfecto</h3>
                    <p className="text-xs text-slate-400 font-medium font-mono">Ինչպես է կազմվում անցյալ անկատար ժամանակը</p>
                  </div>
                </div>
                <button
                  id="close-theory"
                  onClick={() => setIsTheoryOpen(false)}
                  className="p-2 bg-slate-800 hover:bg-slate-705 text-slate-400 hover:text-white rounded-full transition-colors cursor-pointer active:scale-95"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Tabs selector */}
              <div className="flex border-b border-slate-800 bg-slate-950/60 p-2 gap-2">
                <button
                  onClick={() => setActiveTheoryTab('irregular')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider transition-all ${
                    activeTheoryTab === 'irregular'
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  ԱՆԿԱՆՈՆ ԲԱՅԵՐ (3 հատ)
                </button>
                <button
                  onClick={() => setActiveTheoryTab('regular')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider transition-all ${
                    activeTheoryTab === 'regular'
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  ԿԱՆՈՆԱՎՈՐ ՎԵՐՋԱՎՈՐՈՒԹՅՈՒՆՆԵՐ
                </button>
              </div>

              {/* Modal Content Scrollable */}
              <div className="p-6 overflow-y-auto space-y-6 max-h-[60vh] text-slate-300">
                
                {/* IRREGULAR TAB CONTENT */}
                {activeTheoryTab === 'irregular' && (
                  <div className="space-y-6">
                    <p className="text-xs md:text-sm text-slate-400 leading-normal font-medium">
                      Իսպաներենում <strong className="text-indigo-400 font-bold">Pretérito Imperfecto</strong> ժամանակաձևում կա ընդամենը <strong className="text-white font-bold">3 անկանոն բայ</strong>: Դրանք են SER-ը, IR-ը և VER-ը: Ահա դրանց ամբողջական խոնարհումը՝
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {IRREGULAR_VERBS.map((v, i) => (
                        <div key={i} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col space-y-3">
                          <div className="border-b border-slate-800/80 pb-2">
                            <span className="text-sm font-black text-indigo-400 tracking-wider font-mono block">
                              {v.verb}
                            </span>
                            <span className="text-[10px] text-slate-500 italic block">
                              {v.meaning}
                            </span>
                          </div>

                          <div className="space-y-1.5 font-mono text-xs">
                            {v.conjugations.map((conj, idx) => (
                              <div key={idx} className="flex justify-between py-1 border-b border-slate-900 last:border-0 hover:bg-slate-900/30 px-1 rounded">
                                <span className="text-slate-500">{conj.pronoun}</span>
                                <span className="text-white font-black">{conj.form}</span>
                              </div>
                            ))}
                          </div>

                          <div className="text-[10px] text-indigo-300 bg-indigo-950/40 p-2 rounded border border-indigo-950">
                            {v.clue}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* REGULAR TAB CONTENT */}
                {activeTheoryTab === 'regular' && (
                  <div className="space-y-6">
                    <p className="text-xs md:text-sm text-slate-400 leading-normal">
                      Կանոնավոր բայերի խոնարհումը կախված է նրանց խմբից: Pretérito Imperfecto-ում <strong className="text-white">-ER</strong> և <strong className="text-white">-IR</strong> խմբի բայերը ստանում են <strong className="text-indigo-400">նույն</strong> վերջավորությունները:
                    </p>

                    <div className="space-y-6">
                      {REGULAR_RULES.map((rule, idx) => (
                        <div key={idx} className="bg-slate-950/60 border border-slate-805 rounded-2xl p-5 space-y-3">
                          <div className="flex justify-between items-center border-b border-slate-800 pb-2 flex-wrap gap-2">
                            <h4 className="text-sm font-black text-indigo-400 tracking-wider">{rule.ending}</h4>
                            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded">Օրինակ՝ {rule.example}</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono">
                            {rule.terminations.map((term, tIdx) => (
                              <div key={tIdx} className="bg-slate-900/50 border border-slate-900 p-2.5 rounded-lg flex justify-between items-center">
                                <span className="text-slate-500">{term.pronoun}</span>
                                <span className="text-emerald-400 font-black">{term.suffix}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-950/60 border-t border-slate-800 text-center text-[10px] text-slate-500 font-mono">
                Pretérito Imperfecto-ն իսպաներենի ամենահաճախ օգտագործվող անցյալ ժամանակներից է:
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Info */}
      <footer className="w-full text-center text-slate-600 font-mono text-[10px] mt-auto pt-8">
        Pretérito Imperfecto • Գոռ և Գայանե Duel 2026
      </footer>

    </div>
  );
}
