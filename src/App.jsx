import { useState } from 'react';
import Board from './components/Board';
import TaskModal from './components/TaskModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateId } from './utils/constants';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useLocalStorage('kanban-tasks', []);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeColumnId, setActiveColumnId] = useState(null);

  function addTask(taskData) {
    setTasks([...tasks, { ...taskData, id: generateId() }]);
    closeModal();
  }

  function updateTask(taskData) {
    setTasks(tasks.map((t) => (t.id === taskData.id ? { ...t, ...taskData } : t)));
    closeModal();
  }

  function deleteTask(taskId) {
    if (window.confirm('Delete this task?')) {
      setTasks(tasks.filter((t) => t.id !== taskId));
    }
  }

  function moveTask(taskId, columnId) {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, columnId } : t)));
  }

  function handleAddClick(columnId) {
    setEditingTask(null);
    setActiveColumnId(columnId);
    setModalOpen(true);
  }

  function handleEdit(task) {
    setEditingTask(task);
    setActiveColumnId(null);
    setModalOpen(true);
  }

  function handleSave(taskData) {
    if (taskData.id) {
      updateTask(taskData);
    } else {
      addTask(taskData);
    }
  }

  function closeModal() {
    setModalOpen(false);
    setEditingTask(null);
    setActiveColumnId(null);
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Kanban Board</h1>
      </header>
      <Board
        tasks={tasks}
        onAddClick={handleAddClick}
        onEdit={handleEdit}
        onDelete={deleteTask}
        onDrop={moveTask}
      />
      {modalOpen && (
        <TaskModal
          task={editingTask}
          columnId={activeColumnId}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
