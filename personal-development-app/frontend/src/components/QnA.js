import React, { useState } from 'react';
import { askQuestion } from '../utils/api';

function QnA() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await askQuestion(question);
      setAnswer(response.answer);
    } catch (error) {
      console.error('Error asking question:', error);
      setAnswer('Sorry, there was an error processing your question.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Ask me anything..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Ask
          </button>
        </div>
      </form>
      {answer && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="text-gray-800">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default QnA;