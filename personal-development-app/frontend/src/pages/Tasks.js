import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import SearchBar from '../components/SearchBar';
import { getTasks, createTask, updateTask, deleteTask } from '../utils/api';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      try {
        const createdTask = await createTask({ title: newTaskTitle });
        setTasks([...tasks, createdTask]);
        setNewTaskTitle('');
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      const updatedTask = await updateTask(taskId, { completed: !task.completed });
      setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSearch = (query) => {
    // Implement search logic here
    console.log('Searching for:', query);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      <SearchBar onSearch={handleSearch} />
      <form onSubmit={handleCreateTask} className="mb-4">
        <div className="flex">
          <input
            type="text"
            placeholder="New task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-grow shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
          >
            Add Task
          </button>
        </div>
      </form>
      <TaskList
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default Tasks;