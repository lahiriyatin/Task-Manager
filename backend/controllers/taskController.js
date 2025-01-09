import Task from "../models/taskModel.js";
import { sendErrorResponse } from '../utils/errorResponseUtil.js';
import { sendSuccessResponse } from '../utils/responseUtil.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    sendSuccessResponse(res, tasks);
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

export const createTask = async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const task = new Task({
      title,
      description,
      completed,
      user: req.user.id,
    });

    await task.save();
    sendSuccessResponse(res, task);
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

export const updateTask = async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) {
      return sendErrorResponse(res, 404, "Task not found or not authorized");
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    sendSuccessResponse(res, task);
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) {
      return sendErrorResponse(res, 404, "Task not found or not authorized");
    }

    await task.deleteOne();
    sendSuccessResponse(res, { message: "Task deleted" });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};
