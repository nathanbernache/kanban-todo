import { COLUMNS } from '../utils/constants';
import Column from './Column';
import './Board.css';

export default function Board({ tasks, onAddClick, onEdit, onDelete, onDrop }) {
  return (
    <div className="board">
      {COLUMNS.map((column) => (
        <Column
          key={column.id}
          column={column}
          tasks={tasks.filter((t) => t.columnId === column.id)}
          onAddClick={onAddClick}
          onEdit={onEdit}
          onDelete={onDelete}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
}
