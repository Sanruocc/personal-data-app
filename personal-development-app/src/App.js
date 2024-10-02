// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Goals from './pages/Goals';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import Settings from './pages/Settings';
import SocialData from './pages/SocialData';
import Transactions from './pages/Transactions';
import QnA from './components/QnA';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/social-data" element={<SocialData />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/qna" element={<QnA />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
