import React from 'react';

function TaskList({ tasks, onToggleComplete, onDelete }) {
  return (
    <ul className="divide-y divide-gray-200">
      {tasks.map((task) => (
        <li key={task.id} className="py-4 flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className={`ml-3 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </span>
          </div>
          <button
            onClick={() => onDelete(task.id)}
            className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;