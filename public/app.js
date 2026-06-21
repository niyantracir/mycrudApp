const API_URL = "/todos";

async function loadTodos() {
    const res = await fetch(API_URL);
    const todos = await res.json();

    const todoList = document.getElementById("todoList");

    todoList.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${todo.completed ? "completed" : ""}">
                ${todo.title}
            </span>

            <div class="todo-actions">
                <button onclick="toggleTodo(${todo.id}, ${todo.completed})">
                    ${todo.completed ? "Undo" : "Done"}
                </button>

                <button onclick="editTodo(${todo.id}, '${todo.title}')">
                    Edit
                </button>

                <button onclick="deleteTodo(${todo.id})">
                    Delete
                </button>
            </div>
        `;

        todoList.appendChild(li);
    });
}

async function createTodo() {
    const input = document.getElementById("title");

    const title = input.value.trim();

    if (!title) return;

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    });

    input.value = "";
    loadTodos();
}

async function toggleTodo(id, completed) {
    const todo = await fetch(`${API_URL}/${id}`);
    const current = await todo.json();

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: current.title,
            completed: !completed
        })
    });

    loadTodos();
}

async function editTodo(id, currentTitle) {
    const newTitle = prompt("Edit Todo", currentTitle);

    if (!newTitle) return;

    const todo = await fetch(`${API_URL}/${id}`);
    const current = await todo.json();

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: newTitle,
            completed: current.completed
        })
    });

    loadTodos();
}

async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadTodos();
}

loadTodos();