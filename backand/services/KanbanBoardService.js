import kanbanBoardModel from "../model/kanbanBoardModel.js";

export const KanbanBoardPost=async(req,res)=>{
    try {
        const userId=req.headers.user_id
        const { todo, inProgress, done } = req.body;
      const updatedBoard = await kanbanBoardModel.findOneAndUpdate(
      { user: userId },
      { todo, inProgress, done },
      { new: true, upsert: true } 
    );

    
    res.status(201).json({ message: 'Board created', board: updatedBoard });
    } catch (error) {
         console.error('Error saving board:', error);
    res.status(500).json({ message: 'Server error' });
    }
}
export const KanbanBoardGet=async(req,res)=>{
    const userId=req.headers.user_id
    try {
    const board = await kanbanBoardModel.findOne({ user: userId });

    if (!board) {
      return res.status(404).json({ message: 'Board not found for this user' });
    }

    res.status(200).json(board);
  } catch (error) {
    console.error('Error fetching board for user:', error);
    res.status(500).json({ message: 'Server error' });
  }
}