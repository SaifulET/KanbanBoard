import React, { useState } from 'react';
import Modal from './Modal';

const TaskCard = ({ item, onDragStart, onRemove, onUpdate }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: item.title || "",
    description: item.description || "",
    dueDate: item.dueDate || new Date().toISOString().split('T')[0],
    extra: item.extra || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(item.id, formData);
    setModalOpen(false);
  };

  return (
    <>
      <div
        className="p-4 mb-3 bg-zinc-700 text-white rounded-lg shadow-md cursor-pointer flex items-center justify-between transition-all duration-200 hover:scale-105 hover:shadow-lg text-sm md:text-base"
        draggable
        onDragStart={onDragStart}
        onClick={() => setModalOpen(true)}
      >
        <div>
          <strong>{formData.title}</strong><br />
          <small>{formData.description.length > 50 ? formData.description.slice(0, 50) + "..." : formData.description}</small><br />
          <small className="italic">Due: {formData.dueDate}</small>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="text-zinc-400 hover:text-red-400 transition-colors duration-200 w-6 h-6 flex items-center justify-center rounded-full hover:bg-zinc-600"
        >
          <span className="text-lg cursor-pointer">x</span>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="w-full mb-3 p-2 rounded bg-zinc-700 text-white"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          rows={3}
          className="w-full mb-3 p-2 rounded bg-zinc-700 text-white resize-none"
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
          className="w-full mb-3 p-2 rounded bg-zinc-700 text-white"
        />
        <input
          name="extra"
          value={formData.extra}
          onChange={handleInputChange}
          placeholder="Extra Field"
          className="w-full mb-3 p-2 rounded bg-zinc-700 text-white"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 text-white"
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TaskCard;
