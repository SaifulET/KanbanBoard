// models/KanbanBoard.js
import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
  id: String,
  title: String,
  description: String,
  dueDate: String,
  extra: String
});

const ColumnSchema = new Schema({
  name: String,
  items: [TaskSchema]
});

const KanbanBoardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true }, 
  todo: ColumnSchema,
  inProgress: ColumnSchema,
  done: ColumnSchema
});

export default model('KanbanBoard', KanbanBoardSchema);
