import React, { useState, useEffect } from 'react';
import GoalCard from '../components/GoalCard';
import SearchBar from '../components/SearchBar';
import { getGoals, createGoal, updateGoal, deleteGoal } from '../utils/api';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const fetchedGoals = await getGoals();
      setGoals(fetchedGoals);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    try {
      const createdGoal = await createGoal(newGoal);
      setGoals([...goals, createdGoal]);
      setNewGoal({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const handleCompleteGoal = async (id) => {
    try {
      const updatedGoal = await updateGoal(id, { completed: true });
      setGoals(goals.map(goal => goal.id === id ? updatedGoal : goal));
    } catch (error) {
      console.error('Error completing goal:', error);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await deleteGoal(id);
      setGoals(goals.filter(goal => goal.id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleSearch = (query) => {
    // Implement search logic here
    console.log('Searching for:', query);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Goals</h1>
      <SearchBar onSearch={handleSearch} />
      <form onSubmit={handleCreateGoal} className="mb-6">
        <input
          type="text"
          placeholder="Goal title"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Goal description"
          value={newGoal.description}
          onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Goal
        </button>
      </form>
      <div className="space-y-4">
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onComplete={handleCompleteGoal}
            onDelete={handleDeleteGoal}
          />
        ))}
      </div>
    </div>
  );
}

export default Goals;