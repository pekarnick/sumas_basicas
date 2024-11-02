import React, { useState, useEffect } from 'react';
import { Calculator, Plus, Minus, X, Divide, RefreshCw, Trophy } from 'lucide-react';

type Operation = '+' | '-' | 'x' | '÷';

interface Exercise {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
}

function App() {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);

  const generateExercise = (operation: Operation): Exercise => {
    let num1: number, num2: number, answer: number;

    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 100);
        num2 = Math.floor(Math.random() * 100);
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 100);
        num2 = Math.floor(Math.random() * (num1 + 1));
        answer = num1 - num2;
        break;
      case 'x':
        num1 = Math.floor(Math.random() * 12);
        num2 = Math.floor(Math.random() * 12);
        answer = num1 * num2;
        break;
      case '÷':
        num2 = Math.floor(Math.random() * 11) + 1;
        answer = Math.floor(Math.random() * 10);
        num1 = num2 * answer;
        break;
      default:
        throw new Error('Operación no válida');
    }

    return { num1, num2, operation, answer };
  };

  const handleOperationSelect = (operation: Operation) => {
    setSelectedOperation(operation);
    setCurrentExercise(generateExercise(operation));
    setUserAnswer('');
    setFeedback(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentExercise) return;

    const isCorrect = parseInt(userAnswer) === currentExercise.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setScore(prev => isCorrect ? prev + 1 : prev);
    setTotal(prev => prev + 1);

    setTimeout(() => {
      if (selectedOperation) {
        setCurrentExercise(generateExercise(selectedOperation));
        setUserAnswer('');
        setFeedback(null);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Calculator className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">MathPráctica</h1>
        </div>

        {!selectedOperation ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">
              Selecciona una operación
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleOperationSelect('+')}
                className="flex items-center justify-center gap-2 p-4 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
              >
                <Plus className="w-6 h-6 text-green-600" />
                <span className="font-medium text-green-700">Suma</span>
              </button>
              <button
                onClick={() => handleOperationSelect('-')}
                className="flex items-center justify-center gap-2 p-4 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
              >
                <Minus className="w-6 h-6 text-red-600" />
                <span className="font-medium text-red-700">Resta</span>
              </button>
              <button
                onClick={() => handleOperationSelect('x')}
                className="flex items-center justify-center gap-2 p-4 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-blue-600" />
                <span className="font-medium text-blue-700">Multiplicación</span>
              </button>
              <button
                onClick={() => handleOperationSelect('÷')}
                className="flex items-center justify-center gap-2 p-4 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors"
              >
                <Divide className="w-6 h-6 text-purple-600" />
                <span className="font-medium text-purple-700">División</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setSelectedOperation(null)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Volver
              </button>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-medium text-gray-700">
                  {score}/{total}
                </span>
              </div>
            </div>

            {currentExercise && (
              <div className="space-y-4">
                <div className="text-2xl font-bold text-center text-gray-800">
                  {currentExercise.num1} {currentExercise.operation} {currentExercise.num2} = ?
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Tu respuesta"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Comprobar
                  </button>
                </form>

                {feedback && (
                  <div
                    className={`text-center p-3 rounded-lg ${
                      feedback === 'correct'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {feedback === 'correct' ? '¡Correcto! 🎉' : '¡Inténtalo de nuevo! 💪'}
                  </div>
                )}

                <button
                  onClick={() => {
                    if (selectedOperation) {
                      setCurrentExercise(generateExercise(selectedOperation));
                      setUserAnswer('');
                      setFeedback(null);
                    }
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Nuevo ejercicio</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;