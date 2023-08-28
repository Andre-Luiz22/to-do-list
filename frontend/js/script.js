const tBody = document.querySelector("tbody");
const addForm = document.querySelector(".add-form");
const inputTask = document.querySelector(".input-task");

const fetchTasks = async () => {
    const res = await fetch("http://localhost:3000/tasks");
    const tasks = await res.json();
    return tasks;
};

const constroiRow = (task) => {
    const { id, name, created_at, status } = task;
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td class = "name">${name}</td>
        <td>${formatDate(created_at)}</td>
        <td>
            <select>
                <option value="pendente">Pendente</option>
                <option value="andamento">Em andamento</option>
                <option value="concluido">Concluida</option>
            </select>
        </td>
        <td>
            <button class="btn-action edit">
                <span class="material-symbols-outlined">
                    edit
                </span>
            </button>
            <button class="btn-action delete">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>
        </td>
    `;

    return tr;
};

const addTask = async (e) => {
    e.preventDefault();
    const task = { name: inputTask.value };
    await fetch("http://localhost:3000/tasks", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
    inputTask.value = "";

    criaLinha();
};

const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "delete",
    });
    criaLinha();
};

const updateTask = async (task) => {
    const { id, name, status } = task;
    console.log(task);
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, status }),
    });
    criaLinha();
};

const formatDate = (dateUTC) => {
    const options = {
        dateStyle: "long",
        timeStyle: "short",
    };
    const date = new Date(dateUTC).toLocaleString("pt-br", options);
    return date;
};

const criaLinha = async () => {
    const tarefas = await fetchTasks();
    tBody.innerHTML = "";
    tarefas.forEach((element, i) => {
        const { status, id, name } = tarefas[i];
        tBody.appendChild(constroiRow(element));
        const select = document.querySelectorAll("select");
        const deleteBtn = document.querySelectorAll(".delete");
        const editBtn = document.querySelectorAll(".edit");
        const names = document.querySelectorAll(".name");
        select[i].value = status;
        deleteBtn[i].addEventListener("click", () => deleteTask(id));
        select[i].addEventListener("change", () =>
            updateTask({ name, id, status: select[i].value })
        );
        editBtn[i].addEventListener("click", () => {
            names[i].innerHTML = `<form class = "form-name">
                <input class="name-input-up" type="txt" value = "${name}"/>
            </form>`;

            const nameForms = document.querySelector(".form-name");
            const nameInputForms = document.querySelector(".name-input-up");

            nameForms.addEventListener("submit", (e) => {
                e.preventDefault();
                updateTask({ id, name: nameInputForms.value, status });
            });
        });
    });
};

addForm.addEventListener("submit", addTask);

criaLinha();
