import React from 'react';

const AddTaskBar = ({ newTask, setNewTask, columns, activeColumn, setActiveColumn, addNewTask }) => {
  return (
    <div className='mb-6 flex flex-col sm:flex-row w-full max-w-lg shadow-lg rounded-lg overflow-hidden bg-zinc-700'>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder='Add a new Task...'
        className='p-3 bg-zinc-700 text-white w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-zinc-600'
        onKeyDown={(e) => e.key === "Enter" && addNewTask()}
      />
      <select
        value={activeColumn}
        onChange={(e) => setActiveColumn(e.target.value)}
        className='p-3 bg-zinc-700 text-white w-full sm:w-1/4 border-b sm:border-b-0 sm:border-r border-zinc-600'
      >
        {Object.keys(columns).map(columnId => (
          <option key={columnId} value={columnId}>
            {columns[columnId].name}
          </option>
        ))}
      </select>
      <button
        onClick={addNewTask}
        className='px-6 py-3 bg-gradient-to-r from-red-600 to-black text-white font-medium hover:from-yellow-500 hover:to-amber-500 transition-all duration-200 w-full sm:w-1/4'
      >
        Add
      </button>
    </div>
  );
};

export default AddTaskBar;
