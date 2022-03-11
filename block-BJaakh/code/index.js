let inputText = document.querySelector('#text');
let root = document.querySelector('.todos');
const baseURL = `https://sleepy-falls-37563.herokuapp.com/api/todo`;


function handleInput(event) {
    if (event.keyCode === 13 && event.target.value.trim()) {
        let data = {
            todo: {
                title: event.target.value,
                isCompleted: false,
            },
        };
        fetch(baseURL + 'todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(() => {
            event.target.value = '';
            displayTodos();
        });
    }
}

function handleDelete(id) {
    fetch(baseURL + `todo/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(() => {
        displayTodos();
    });
}

function handleToggle(id, status) {
    let data = {
        todo: {
            isCompleted: !status,
        },
    };
    fetch(baseURL + `todo/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(() => {
        displayTodos();
    });
}

function handleEdit(event, id, title) {
    let input = document.querySelector('input');
    input.value = title;
    let p = event.target;
    let parent = event.target.parentElement;
    parent.replaceChild(input, p);
    console.log(input, p, parent);

    input.addEventListener('keyup', (event) => {
        if (event.keyCode === 13 && event.target.value) {
            let data = {
                todo: {
                    title: event.target.value,
                },
            };
            fetch(baseURL + `todo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }).then(() => {
                displayTodos();
            });
        }
    });
}

function createUI(data) {
    root.innerHTML = "";
    data.forEach((todo) => {
        let li = document.createElement('li');
        let input = document.createElement('input');
        input.type = "checkbox";
        input.checked = todo.isCompleted;
        input.addEventListener('click', () => handleToggle(todo._id, todo.isCompleted));
        input.setAttribute("data-id", todo._id);    
        let p = document.createElement('p');
        p.innerText = todo.title;
        p.addEventListener('dblclick', (event) => handleEdit(event, todo._id, todo.title));
        let span = document.createElement('span');
        span.innerText = "❌";
        span.setAttribute("data-id", todo._id);
        span.addEventListener('click', () => handleDelete(todo._id));
        li.append(input, p, span);
        root.append(li);
    });
}

function displayTodos() {
    fetch(baseURL + 'todo')
        .then((res) => res.json())
        .then((allTodos) => {
            createUI(allTodos.todos);
        });
}

inputText.addEventListener("keyup", handleInput);
displayTodos();