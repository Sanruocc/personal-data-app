const API_URL = 'http://localhost:5000/api';

async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error('API request failed');
  }
  return response.json();
}

export async function login(credentials) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
  }
  return data;
}

export async function register(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
}

export async function logout() {
  localStorage.removeItem('token');
}

export async function getTasks() {
  return fetchWithAuth(`${API_URL}/tasks`);
}

export async function createTask(task) {
  return fetchWithAuth(`${API_URL}/tasks`, {
    method: 'POST',
    body: JSON.stringify(task),
  });
}

export async function updateTask(id, task) {
  return fetchWithAuth(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
  });
}

export async function deleteTask(id) {
  return fetchWithAuth(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
}

export async function getGoals() {
  return fetchWithAuth(`${API_URL}/goals`);
}

export async function createGoal(goal) {
  return fetchWithAuth(`${API_URL}/goals`, {
    method: 'POST',
    body: JSON.stringify(goal),
  });
}

export async function updateGoal(id, goal) {
  return fetchWithAuth(`${API_URL}/goals/${id}`, {
    method: 'PUT',
    body: JSON.stringify(goal),
  });
}

export async function deleteGoal(id) {
  return fetchWithAuth(`${API_URL}/goals/${id}`, {
    method: 'DELETE',
  });
}

export async function getNotes() {
  return fetchWithAuth(`${API_URL}/notes`);
}

export async function createNote(note) {
  return fetchWithAuth(`${API_URL}/notes`, {
    method: 'POST',
    body: JSON.stringify(note),
  });
}

export async function updateNote(id, note) {
  return fetchWithAuth(`${API_URL}/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(note),
  });
}

export async function deleteNote(id) {
  return fetchWithAuth(`${API_URL}/notes/${id}`, {
    method: 'DELETE',
  });
}

export async function getSocialContacts() {
  return fetchWithAuth(`${API_URL}/social`);
}

export async function createSocialContact(contact) {
  return fetchWithAuth(`${API_URL}/social`, {
    method: 'POST',
    body: JSON.stringify(contact),
  });
}

export async function updateSocialContact(id, contact) {
  return fetchWithAuth(`${API_URL}/social/${id}`, {
    method: 'PUT',
    body: JSON.stringify(contact),
  });
}

export async function deleteSocialContact(id) {
  return fetchWithAuth(`${API_URL}/social/${id}`, {
    method: 'DELETE',
  });
}

export async function getTransactions() {
  return fetchWithAuth(`${API_URL}/transactions`);
}

export async function createTransaction(transaction) {
  return fetchWithAuth(`${API_URL}/transactions`, {
    method: 'POST',
    body: JSON.stringify(transaction),
  });
}

export async function updateTransaction(id, transaction) {
  return fetchWithAuth(`${API_URL}/transactions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(transaction),
  });
}

export async function deleteTransaction(id) {
  return fetchWithAuth(`${API_URL}/transactions/${id}`, {
    method: 'DELETE',
  });
}

export async function askQuestion(question) {
  return fetchWithAuth(`${API_URL}/qna`, {
    method: 'POST',
    body: JSON.stringify({ question }),
  });
}