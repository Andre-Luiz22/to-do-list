import { connection } from "./connection.js";

const getAll = async () => {
    const [tasks] = await connection.execute("SELECT * FROM tasks");
    return tasks;
};

const createTasks = async (task) => {
    const { name } = task;
    const dateUTC = new Date(Date.now()).toUTCString();
    const query = "INSERT INTO tasks(name, status, created_at) VALUES (?,?,?)";
    const [createdTask] = await connection.execute(query, [
        name,
        "pendente",
        dateUTC,
    ]);
    return { insert: createdTask.insertId };
};

const deleteTask = async (id) => {
    const removedTask = await connection.execute(
        "DELETE FROM tasks WHERE id = ?",
        [id]
    );
    return removedTask;
};

const updateTask = async (id, task) => {
    const query = "UPDATE tasks SET name = ?, status = ? WHERE id = ?";
    const { name, status } = task;
    const updatedTask = await connection.execute(query, [name, status, id]);
    return updatedTask;
};

export const tasksModel = { getAll, createTasks, deleteTask, updateTask };
