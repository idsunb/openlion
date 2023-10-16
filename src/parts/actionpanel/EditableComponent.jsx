import React, { useState } from 'react';

const EditableComponent = ({ component, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(component);

  const handleSave = () => {
    onSave(value);
    setEditing(false);
  };

  if (editing) {
    return (
      <div>
        <textarea value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={handleSave}>Save</button>
      </div>
    );
  } else {
    return (
      <div onClick={() => setEditing(true)}>
        {component}
      </div>
    );
  }
};

export default EditableComponent;