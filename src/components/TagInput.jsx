import './TagInput.css';

export default function TagInput({ tags, onChange }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !tags.includes(value)) {
        onChange([...tags, value]);
      }
      e.target.value = '';
    }
  }

  function removeTag(tagToRemove) {
    onChange(tags.filter((t) => t !== tagToRemove));
  }

  return (
    <div className="tag-input">
      <div className="tag-input__tags">
        {tags.map((tag) => (
          <span key={tag} className="tag-input__tag">
            {tag}
            <button
              type="button"
              className="tag-input__remove"
              onClick={() => removeTag(tag)}
              aria-label={`Remove tag ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        className="tag-input__field"
        placeholder="Type a tag and press Enter"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
