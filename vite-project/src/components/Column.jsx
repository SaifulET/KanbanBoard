import TaskCard from './TaskCard';

const Column = ({ columnId, column, onDragStart,onDragOverItem, onDrop, onRemove, onUpdate, columnStyles }) => {
  return (
    <div
      className={`flex-shrink-0 w-full sm:w-72 md:w-80 bg-zinc-800 rounded-lg shadow-xl border-t-4 ${columnStyles.border} min-w-[90%] sm:min-w-0`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, columnId)}
    >
      <div className={`p-4 text-white font-bold text-xl rounded-t-md ${columnStyles.header}`}>
        {column.name}
        <span className='ml-2 px-2 py-1 bg-zinc-800 bg-opacity-30 rounded-full text-sm'>
          {column.items.length}
        </span>
      </div>
      <div className='p-3 min-h-64'>
        {column.items.length === 0 ? (
          <div className='text-center py-10 text-zinc-500 italic text-sm'>Drop task here</div>
        ) : (
          column.items.map((item,index) => (
            <div
              key={item.id}
              onDragOver={(e) => {
                e.preventDefault();
                onDragOverItem(columnId, index);
              }}
            >
            <TaskCard
              key={item.id}
              item={item}
              onDragStart={() => onDragStart(columnId, item)}
              onRemove={() => onRemove(columnId, item.id)}
              onUpdate={onUpdate}
            />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Column;
