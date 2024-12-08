import axios from "axios";

const API_BASE = "http://localhost:8080/api";

// Task APIs
export const fetchTasks = (params) => axios.get(`${API_BASE}/tasks/`, { params });
export const fetchStatusTasks = (params) => axios.get(`${API_BASE}/tasks/filter`, { params });
export const fetchTaskById = (id) => axios.get(`${API_BASE}/tasks/${id}`);
export const createTask = (taskData) => axios.post(`${API_BASE}/tasks/`, taskData);
export const updateTask = (id, taskData) => axios.put(`${API_BASE}/tasks/${id}`, taskData);
export const deleteTask = (id) => axios.delete(`${API_BASE}/tasks/${id}`);

// User APIs
export const fetchUsers = () => axios.get(`${API_BASE}/users`);
export const createUser = (userData) => axios.post(`${API_BASE}/users`, userData);
export const updateUser = (id, userData) => axios.put(`${API_BASE}/users/${id}`, userData);
export const deleteUser = (id) => axios.delete(`${API_BASE}/users/${id}`);
