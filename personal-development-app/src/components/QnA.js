// src/components/QnA.js
import React, { useState } from 'react';

const QnA = ({ goals, tasks, transactions, people }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleAsk = () => {
        let response = '';
        if (question.toLowerCase().includes('goals')) {
            response = goals.length ? `Your goals: ${goals.map(g => g.name).join(', ')}` : "No goals found.";
        } else if (question.toLowerCase().includes('tasks')) {
            response = tasks.length ? `Your tasks: ${tasks.map(t => t.name).join(', ')}` : "No tasks found.";
        } else if (question.toLowerCase().includes('transactions')) {
            response = transactions.length ? `Your transactions: ${transactions.map(t => `${t.description}: $${t.amount}`).join(', ')}` : "No transactions found.";
        } else if (question.toLowerCase().includes('people')) {
            response = people.length ? `People tracked: ${people.map(p => p.name).join(', ')}` : "No people found.";
        } else {
            response = "I'm not sure about that. Try asking about goals, tasks, transactions, or people.";
        }
        setAnswer(response);
    };

    return (
        <div>
            <h1>Question & Answer</h1>
            <input
                type="text"
                placeholder="Ask a question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={handleAsk}>Ask</button>
            <p><strong>Answer:</strong> {answer}</p>
        </div>
    );
};

export default QnA;
