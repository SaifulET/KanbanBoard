import  { useEffect,  useState } from 'react';
import AddTaskBar from './AddTaskBar';
import Column from './Column';
import axios  from 'axios';

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
  todo: { name: "To Do", items: [] },
  inProgress: { name: "In Progress", items: [] },
  done: { name: "Done", items: [] }
  });
  useEffect(()=>{
    (async()=>{
      try {
    const res = await axios.get(`/kanbanGet`,{withCredentials:true});
    console.log(res.data);
    if(res.data){
      const board=res.data;
      setColumns({
        todo: board.todo,
        inProgress: board.inProgress,
        done: board.done
      })
    }
  } catch (err) {
    console.error('Error fetching user Kanban:', err);
  }
    })()
  },[])

  const updataMongoose=async(updateColumns)=>{
    try {
    const res = await axios.post(`/kanban`,{...updateColumns},{withCredentials:true});
    console.log(res.data);
  } catch (err) {
    console.error('Error fetching user Kanban:', err);
  }
    
  }

  const [newTask, setNewTask] = useState("");
  const [activeColumn, setActiveColumn] = useState("todo");
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [dragOverColumnId, setDragOverColumnId] = useState(null);

  const addNewTask = () => {
    if (newTask.trim() === "") return;
    const updatedColumns = { ...columns };
    updatedColumns[activeColumn].items.push({
      id: Date.now().toString(),
      title: newTask,
      description: "",
      dueDate: "",
      extra: ""
    });
    setColumns(updatedColumns);
    setNewTask("");
    updataMongoose(updatedColumns);
  };

  const removeTask = (columnId, taskId) => {
    const updatedColumns = { ...columns };
    updatedColumns[columnId].items = updatedColumns[columnId].items.filter(item => item.id !== taskId);
    setColumns(updatedColumns);
    updataMongoose(updatedColumns);
  };

  const updateTask = (taskId, updatedData) => {
    const updatedColumns = { ...columns };
    for (const colId in updatedColumns) {
      updatedColumns[colId].items = updatedColumns[colId].items.map(item =>
        item.id === taskId ? { ...item, ...updatedData } : item
      );
    }
    setColumns(updatedColumns);
    updataMongoose(updatedColumns);
  };

  const handleDragStart = (columnId, item) => {
    setDraggedItem({ columnId, item });
  };
  const handleDragOverItem = (columnId, index) => {
    setDragOverColumnId(columnId);
    setDragOverIndex(index);
  };

  const handleDrop = (e, targetColumnId, dropIndex = null) => {
    e.preventDefault();
    if (!draggedItem) return;

    const { columnId: sourceColumnId, item } = draggedItem;
    if (!columns[targetColumnId]) return;

    const updatedColumns = { ...columns };

    // Remove from source column
    updatedColumns[sourceColumnId].items = updatedColumns[sourceColumnId].items.filter(i => i.id !== item.id);

    // Calculate insert index
    let insertIndex = dropIndex;

    if (insertIndex === null) {
      if (dragOverColumnId === targetColumnId && dragOverIndex !== null) {
        insertIndex = dragOverIndex;
      } else {
        insertIndex = updatedColumns[targetColumnId].items.length;
      }
    }

    if (insertIndex > updatedColumns[targetColumnId].items.length) {
      insertIndex = updatedColumns[targetColumnId].items.length;
    }
    if (insertIndex < 0) insertIndex = 0;

    // Insert at correct position
    updatedColumns[targetColumnId].items.splice(insertIndex, 0, item);

    setColumns(updatedColumns);
    updataMongoose(updatedColumns)
    setDraggedItem(null);
    setDragOverIndex(null);
    setDragOverColumnId(null);
  };

  const columnStyles = {
    todo: {
      header: "bg-gradient-to-r from-blue-600 to-blue-400",
      border: "border-green-400"
    },
    inProgress: {
      header: "bg-gradient-to-r from-yellow-600 to-yellow-400",
      border: "border-yellow-400"
    },
    done: {
      header: "bg-gradient-to-r from-green-600 to-green-400",
      border: "border-green-400"
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-4 w-full max-w-6xl px-4">
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-rose-400 text-center">
        Kanban Board
      </h1>
      <AddTaskBar
        newTask={newTask}
        setNewTask={setNewTask}
        columns={columns}
        activeColumn={activeColumn}
        setActiveColumn={setActiveColumn}
        addNewTask={addNewTask}
      />
      <div className=" flex flex-col lg:flex-row lg:items-center lg:justify-center gap-6 overflow-x-auto pb-6 w-full">
        {Object.keys(columns).map(columnId => (
          <Column
            key={columnId}
            columnId={columnId}
            column={columns[columnId]}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onRemove={removeTask}
            onUpdate={updateTask}
            onDragOverItem={handleDragOverItem}
            columnStyles={columnStyles[columnId]}
            
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
