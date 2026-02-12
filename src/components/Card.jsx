import './Card.css';

export default function Card({ task, onEdit, onDelete }) {
  function handleDragStart(e) {
    e.dataTransfer.setData('application/kanban-task', task.id);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('card--dragging');
  }

  function handleDragEnd(e) {
    e.currentTarget.classList.remove('card--dragging');
  }

  return (
    <div
      className="card"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="card__header">
        <h3 className="card__title">{task.title}</h3>
        <div className="card__actions">
          <button
            className="card__btn card__btn--edit"
            onClick={() => onEdit(task)}
            aria-label="Edit task"
          >
            &#9998;
          </button>
          <button
            className="card__btn card__btn--delete"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
          >
            &#128465;
          </button>
        </div>
      </div>
      {task.description && (
        <p className="card__description">{task.description}</p>
      )}
      {task.tags.length > 0 && (
        <div className="card__tags">
          {task.tags.map((tag) => (
            <span key={tag} className="card__tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
