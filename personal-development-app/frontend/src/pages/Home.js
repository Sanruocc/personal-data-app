import React from 'react';
import QnA from '../components/QnA';

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Personal Development App</h1>
      <p className="mb-4">
        This app is designed to help you manage various aspects of your personal development,
        including goals, tasks, notes, social connections, and financial transactions.
      </p>
      <QnA />
    </div>
  );
}

export default Home;