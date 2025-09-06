import React, { useState, useEffect, useRef } from 'react';
import { QUIZ_QUESTIONS, DAX_FORMULAS, SYNTAX_QUIZ_QUESTIONS } from '../constants';
import { shuffleArray } from '../utils';
import { QuizQuestion } from '../types';
import Confetti from '../components/Confetti';

type QuizType = 'scenario' | 'usage' | 'syntax' | null;
type AnswerState = 'unanswered' | 'correct' | 'incorrect';

const generateUsageQuestions = (count: number): QuizQuestion[] => {
    const allFormulas = [...DAX_FORMULAS];
    if (allFormulas.length < 6) return [];

    const generatedQuestions: QuizQuestion[] = [];
    const availableCorrectFormulas = shuffleArray(allFormulas);

    for (let i = 0; i < count && i < availableCorrectFormulas.length; i++) {
        const correctFormula = availableCorrectFormulas[i];

        const distractors = allFormulas.filter(f => f.name !== correctFormula.name);
        const shuffledDistractors = shuffleArray(distractors);
        const options = [correctFormula.name, ...shuffledDistractors.slice(0, 5).map(f => f.name)];

        generatedQuestions.push({
            scenario: correctFormula.usage,
            options: shuffleArray(options),
            correctAnswer: correctFormula.name,
            explanation: `La fórmula para este uso es ${correctFormula.name}. Sintaxis: ${correctFormula.syntax}`
        });
    }
    return generatedQuestions;
};

const QuizMode: React.FC = () => {
    const [quizType, setQuizType] = useState<QuizType>(null);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
    const [score, setScore] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [questionStartTime, setQuestionStartTime] = useState(0);
    const [pointsAwarded, setPointsAwarded] = useState(0);
    const challengeSelectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // When an answer is selected, scroll to the bottom of the page to reveal the explanation.
        if (answerState !== 'unanswered') {
            const timer = setTimeout(() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100); // Delay to allow DOM update
            return () => clearTimeout(timer);
        }
    }, [answerState]);

    useEffect(() => {
        // When the challenge selection screen is shown, scroll down to it.
        // This hides the "Return to Menu" button until the user scrolls up.
        if (quizType === null) {
            const timer = setTimeout(() => {
                challengeSelectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100); // A small delay ensures the content is rendered before scrolling.
             return () => clearTimeout(timer);
        }
    }, [quizType]);


    const resetQuizState = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setAnswerState('unanswered');
        setScore(0);
        setIsQuizFinished(false);
        setQuestionStartTime(0);
        setPointsAwarded(0);
    };

    const handleStartQuiz = (type: 'scenario' | 'usage' | 'syntax') => {
        resetQuizState();
        if (type === 'scenario') {
            setQuestions(shuffleArray(QUIZ_QUESTIONS));
        } else if (type === 'usage') {
            setQuestions(generateUsageQuestions(20));
        } else if (type === 'syntax') {
            setQuestions(shuffleArray(SYNTAX_QUIZ_QUESTIONS).slice(0, 20));
        }
        setQuizType(type);
        setQuestionStartTime(Date.now());
    };

    const calculatePoints = (timeInSeconds: number): number => {
        if (timeInSeconds <= 3) return 100;
        if (timeInSeconds <= 6) return 75;
        if (timeInSeconds <= 10) return 50;
        return 25;
    };

    const handleAnswerClick = (option: string) => {
        if (answerState !== 'unanswered') return;

        setSelectedAnswer(option);
        if (option === questions[currentQuestionIndex].correctAnswer) {
            const timeTaken = (Date.now() - questionStartTime) / 1000;
            const points = calculatePoints(timeTaken);
            setScore(prev => prev + points);
            setPointsAwarded(points);
            setAnswerState('correct');
        } else {
            setPointsAwarded(0);
            setAnswerState('incorrect');
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setAnswerState('unanswered');
            setPointsAwarded(0);
            setQuestionStartTime(Date.now());
        } else {
            setIsQuizFinished(true);
        }
    };
    
    const handlePlayAgain = () => {
        resetQuizState();
        setQuizType(null);
        setQuestions([]);
    }

    const getButtonClass = (option: string): string => {
        if (answerState === 'unanswered') {
            return "bg-white hover:bg-slate-50";
        }
        if (option === questions[currentQuestionIndex].correctAnswer) {
            return "bg-emerald-100 border-emerald-500 scale-105";
        }
        if (option === selectedAnswer && option !== questions[currentQuestionIndex].correctAnswer) {
            return "bg-red-100 border-red-500";
        }
        return "bg-white opacity-60";
    };

    if (isQuizFinished) {
        return (
            <>
                <Confetti />
                <div className="max-w-3xl mx-auto text-center p-8 bg-white rounded-3xl shadow-xl border border-slate-200/80">
                    <h2 className="text-xl font-bold text-emerald-500 mb-2 font-title">¡Desafío completado!</h2>
                    <p className="text-slate-600 text-sm mb-6">Tu puntuación final es:</p>
                    <div className="text-4xl font-extrabold text-emerald-500 mb-8">{score} puntos</div>
                    <button 
                        onClick={handlePlayAgain} 
                        className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-full shadow-lg hover:bg-emerald-600 transition transform hover:scale-105 hover:shadow-emerald-300/30 text-sm"
                    >
                        Jugar de Nuevo
                    </button>
                </div>
            </>
        );
    }
    
    if (!quizType) {
        return (
            <div className="max-w-5xl mx-auto text-center">
                <div ref={challengeSelectionRef} className="pt-[1.125vh]">
                    <h2 className="text-xl font-bold text-emerald-500 mb-4 font-title">Elige tu Desafío</h2>
                </div>
                <p className="text-slate-600 mb-8 text-sm">Pon a prueba tus conocimientos de DAX de tres maneras diferentes.</p>
                <div className="flex flex-col gap-3 md:gap-4 w-full max-w-3xl mx-auto">
                    <button
                        onClick={() => handleStartQuiz('scenario')}
                        className="group w-full p-5 md:p-6 flex items-center gap-4 md:gap-5 text-left bg-white rounded-2xl shadow-lg border-2 border-slate-200/80 hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-in-out"
                    >
                        <span className="p-3 rounded-full bg-emerald-100/70 text-2xl" role="img" aria-label="phone">📞</span>
                        <div className="flex-grow">
                            <h3 className="font-bold text-lg md:text-xl text-emerald-600 font-title">Consultas</h3>
                            <p className="text-xs md:text-sm mt-1 text-slate-500 leading-tight">Resuelve un problema de la frutería eligiendo la fórmula DAX correcta a partir de un caso práctico.</p>
                        </div>
                    </button>
                     <button
                        onClick={() => handleStartQuiz('syntax')}
                        className="w-full p-5 md:p-6 flex items-center gap-4 md:gap-5 text-left bg-white rounded-2xl shadow-lg border-2 border-slate-200/80 hover:border-sky-500 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-in-out"
                     >
                        <span className="p-3 rounded-full bg-sky-100/70 text-2xl" role="img" aria-label="scroll">📜</span>
                        <div className="flex-grow">
                             <h3 className="font-bold text-lg md:text-xl text-sky-600 font-title">Recetas</h3>
                             <p className="text-xs md:text-sm mt-1 text-slate-500 leading-tight">Identifica la sintaxis correcta de una fórmula DAX para dominar su estructura y parámetros.</p>
                        </div>
                    </button>
                    <button
                        onClick={() => handleStartQuiz('usage')}
                        className="w-full p-5 md:p-6 flex items-center gap-4 md:gap-5 text-left bg-white rounded-2xl shadow-lg border-2 border-slate-200/80 hover:border-amber-500 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-in-out"
                    >
                        <span className="p-3 rounded-full bg-amber-100/70 text-2xl" role="img" aria-label="magnifying glass">🔍</span>
                        <div className="flex-grow">
                            <h3 className="font-bold text-lg md:text-xl text-amber-600 font-title">Identificar la Fruta</h3>
                            <p className="text-xs md:text-sm mt-1 text-slate-500 leading-tight">Te damos una descripción (el "uso") y debes identificar la fórmula correcta entre 6 opciones.</p>
                        </div>
                    </button>
                </div>
            </div>
        );
    }

    if (questions.length === 0) return null;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-slate-200/80">
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-xl font-bold text-emerald-500 flex items-center gap-3 font-title">
                    {quizType === 'scenario' && 
                        <>
                            <span className="text-2xl" role="img" aria-label="phone">📞</span>
                            <span>Consultas</span>
                        </> 
                    }
                    {quizType === 'usage' &&
                        <>
                            <span className="text-2xl" role="img" aria-label="magnifying glass">🔍</span>
                            <span>¿Qué fruta es?</span>
                        </>
                    }
                    {quizType === 'syntax' &&
                        <>
                             <span className="text-2xl" role="img" aria-label="scroll">📜</span>
                            <span>Recetas</span>
                        </>
                    }
                </h2>
                <div className="font-bold text-slate-600 text-sm">
                    {currentQuestionIndex + 1}/{questions.length} | Puntos: {score}
                </div>
            </div>
            
            <div className="mb-6 p-4 bg-emerald-50 rounded-2xl">
                <p className="font-semibold text-emerald-900 text-base leading-tight">{currentQuestion.scenario}</p>
            </div>

            <div className={`grid ${quizType === 'usage' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'} gap-3`}>
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerClick(option)}
                        disabled={answerState !== 'unanswered'}
                        className={`border-2 rounded-2xl transition duration-300 transform ${getButtonClass(option)} ${quizType === 'usage' ? 'text-center flex justify-center items-center py-2 px-1' : 'text-left p-3'}`}
                    >
                         {quizType === 'scenario' || quizType === 'syntax' ? (
                            <pre className="text-sm whitespace-pre-wrap break-words font-sans"><code>{option}</code></pre>
                        ) : (
                            <code className="text-sm font-bold">{option}</code>
                        )}
                    </button>
                ))}
            </div>

            {answerState !== 'unanswered' && (
                <div className={`mt-6 p-4 rounded-xl ${answerState === 'correct' ? 'bg-emerald-50 text-emerald-900' : 'bg-red-50 text-red-900'}`}>
                    <h3 className="font-bold text-sm">{answerState === 'correct' ? `¡Correcto! +${pointsAwarded} puntos` : '¡Incorrecto!'}</h3>
                    <p className="mt-1 text-xs">{currentQuestion.explanation}</p>
                    <button
                        onClick={handleNextQuestion}
                        className="mt-4 px-6 py-2 bg-emerald-500 text-white font-bold rounded-full shadow-md hover:bg-emerald-600 transition text-xs"
                    >
                        {currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizMode;