import { useState } from 'react';
import Card from './Card';
import './Column.css';

export default function Column({ column, tasks, onAddClick, onEdit, onDelete, onDrop }) {
  const [dragOver, setDragOver] = useState(false);

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(true);
  }

  function handleDragLeave(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const taskId = e.dataTransfer.getData('application/kanban-task');
    if (taskId) {
      onDrop(taskId, column.id);
    }
  }

  return (
    <div
      className={`column ${dragOver ? 'column--drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column__header">
        <h2 className="column__title">{column.title}</h2>
        <span className="column__count">{tasks.length}</span>
      </div>
      <div className="column__cards">
        {tasks.length === 0 && (
          <p className="column__empty">No tasks yet</p>
        )}
        {tasks.map((task) => (
          <Card
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <button className="column__add-btn" onClick={() => onAddClick(column.id)}>
        + Add Task
      </button>
    </div>
  );
}
