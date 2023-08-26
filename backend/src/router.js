import express from "express";
import { tasksController } from "./controllers/tasksController.js";
import { taskMiddleware } from "./middlewares/tasksMiddleware.js";

const router = express.Router();

router.get("/tasks", tasksController.getAll);
router.post(
    "/tasks",
    taskMiddleware.validateFieldName,
    tasksController.createTasks
);
router.delete("/tasks/:id", tasksController.deleteTask);
router.put(
    "/tasks/:id",
    taskMiddleware.validateFieldName,
    taskMiddleware.validateFieldStatus,
    tasksController.updateTask
);
export { router };
