import React from 'react';

function GoalCard({ goal, onComplete, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
      <p className="text-gray-600 mb-4">{goal.description}</p>
      <div className="flex justify-between items-center">
        <button
          onClick={() => onComplete(goal.id)}
          className={`px-4 py-2 rounded ${
            goal.completed
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {goal.completed ? 'Completed' : 'Mark as Complete'}
        </button>
        <button
          onClick={() => onDelete(goal.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default GoalCard;