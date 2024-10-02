import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Personal Development App</Link>
        <ul className="flex space-x-4">
          <li><Link to="/goals" className="hover:underline">Goals</Link></li>
          <li><Link to="/tasks" className="hover:underline">Tasks</Link></li>
          <li><Link to="/notes" className="hover:underline">Notes</Link></li>
          <li><Link to="/social" className="hover:underline">Social</Link></li>
          <li><Link to="/transactions" className="hover:underline">Transactions</Link></li>
          <li><Link to="/login" className="hover:underline">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;