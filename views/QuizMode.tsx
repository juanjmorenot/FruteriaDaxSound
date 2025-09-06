import React, { useState } from 'react';
import { QUIZ_QUESTIONS, DAX_FORMULAS } from '../constants';
import { shuffleArray } from '../utils';
import { QuizQuestion } from '../types';

type QuizType = 'scenario' | 'usage' | null;
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
            scenario: `Identifica la fórmula con el siguiente uso: "${correctFormula.usage}"`,
            options: shuffleArray(options),
            correctAnswer: correctFormula.name,
            explanation: `¡Correcto! La fórmula para este uso es ${correctFormula.name}. Sintaxis: ${correctFormula.syntax}`
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

    const resetQuizState = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setAnswerState('unanswered');
        setScore(0);
        setIsQuizFinished(false);
        setQuestionStartTime(0);
        setPointsAwarded(0);
    };

    const handleStartQuiz = (type: 'scenario' | 'usage') => {
        resetQuizState();
        if (type === 'scenario') {
            setQuestions(shuffleArray(QUIZ_QUESTIONS));
        } else {
            setQuestions(generateUsageQuestions(20));
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
            return "bg-white hover:bg-amber-100";
        }
        if (option === questions[currentQuestionIndex].correctAnswer) {
            return "bg-green-200 border-green-500 scale-105";
        }
        if (option === selectedAnswer && option !== questions[currentQuestionIndex].correctAnswer) {
            return "bg-red-200 border-red-500";
        }
        return "bg-white opacity-60";
    };

    if (isQuizFinished) {
        return (
            <div className="max-w-3xl mx-auto text-center p-8 bg-white rounded-2xl shadow-xl border-2 border-slate-200">
                <h2 className="text-3xl font-bold text-green-600 mb-2">¡Desafío completado!</h2>
                <p className="text-slate-600 text-lg mb-6">Tu puntuación final es:</p>
                <div className="text-6xl font-extrabold text-amber-500 mb-8">{score} puntos</div>
                <button 
                    onClick={handlePlayAgain} 
                    className="px-8 py-3 bg-green-500 text-white font-bold rounded-full shadow-md hover:bg-green-600 transition transform hover:scale-105"
                >
                    Jugar de Nuevo
                </button>
            </div>
        );
    }
    
    if (!quizType) {
        return (
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-green-600 mb-4">Elige tu Desafío</h2>
                <p className="text-slate-600 mb-8">Pon a prueba tus conocimientos de DAX de dos maneras diferentes.</p>
                <div className="grid md:grid-cols-2 gap-8">
                    <button onClick={() => handleStartQuiz('scenario')} className="p-6 bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-amber-400 hover:shadow-xl transition transform hover:-translate-y-1">
                        <span className="text-5xl" role="img" aria-label="chef">👨‍🍳</span>
                        <h3 className="font-bold text-xl mt-4 text-slate-800">Requerimiento del Jefe</h3>
                        <p className="text-sm mt-2 text-slate-500">Resuelve un problema de la frutería eligiendo la fórmula DAX correcta a partir de un caso práctico.</p>
                    </button>
                    <button onClick={() => handleStartQuiz('usage')} className="p-6 bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-amber-400 hover:shadow-xl transition transform hover:-translate-y-1">
                        <span className="text-5xl" role="img" aria-label="magnifying glass">🔎</span>
                        <h3 className="font-bold text-xl mt-4 text-slate-800">Identificar la Fruta</h3>
                        <p className="text-sm mt-2 text-slate-500">Te damos una descripción (el "uso") y debes identificar la fórmula correcta entre 6 opciones.</p>
                    </button>
                </div>
            </div>
        );
    }

    if (questions.length === 0) return null;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl border-2 border-slate-200">
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-xl font-bold text-green-600">
                    {quizType === 'scenario' ? 'Requerimiento del Jefe 👨‍🍳' : '¿Qué fruta es? 🔎'}
                </h2>
                <div className="font-bold text-slate-600">
                    Pregunta {currentQuestionIndex + 1}/{questions.length} | Puntos: {score}
                </div>
            </div>
            
            <div className="mb-6 p-4 bg-amber-50 rounded-lg">
                <p className="text-lg text-slate-700 font-semibold">{currentQuestion.scenario}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerClick(option)}
                        disabled={answerState !== 'unanswered'}
                        className={`border-2 rounded-lg transition duration-300 transform ${getButtonClass(option)} ${quizType === 'usage' ? 'text-center flex justify-center items-center py-5 px-3' : 'text-left p-3'}`}
                    >
                         {quizType === 'scenario' ? (
                            <pre className="text-sm whitespace-pre-wrap break-words font-sans"><code>{option}</code></pre>
                        ) : (
                            <code className="font-bold text-lg">{option}</code>
                        )}
                    </button>
                ))}
            </div>

            {answerState !== 'unanswered' && (
                <div className={`mt-6 p-4 rounded-lg ${answerState === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <h3 className="font-bold text-lg">{answerState === 'correct' ? `¡Correcto! +${pointsAwarded} puntos` : '¡Casi!'}</h3>
                    <p className="mt-1">{currentQuestion.explanation}</p>
                    <button
                        onClick={handleNextQuestion}
                        className="mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded-full shadow-md hover:bg-green-600 transition"
                    >
                        {currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizMode;