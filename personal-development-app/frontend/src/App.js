import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Goals from './pages/Goals';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import Social from './pages/Social';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/goals" component={Goals} />
            <Route path="/tasks" component={Tasks} />
            <Route path="/notes" component={Notes} />
            <Route path="/social" component={Social} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;