function main(){
    let inputText = document.querySelector('#text');
    let root = document.querySelector('ul');
    let active = document.querySelector('.active');
    let completed = document.querySelector('.completed');
    let clear = document.querySelector('.clear');
    let all = document.querySelector('.all');

let allTodos = [];

function handleInput(event){
    let value = event.target.value
    if(event.keyCode === 13 && event.target.value !== ""){
        let todo = {
            name : value,
            isDone : false
        };
        allTodos.push(todo);
        event.target.value = "";

        createUI();
    }
}

function handleDelete(event) {
    let id = event.target.dataset.id;
    allTodos.splice(id, 1);
     
    createUI();
}

function handleToggle(event){
    let id = event.target.dataset.id;
    allTodos[id].isDone = !allTodos[id].isDone;

    createUI();
}

function activeTodo(event){
    createUI();
}

function completedTodo(event){
    createUI();
}


function createUI(data = allTodos){
    root.innerHTML = "";
    data.forEach((todo, index) => {
        let li = document.createElement('li');
        li.style.display = "flex";
        li.style.alignItems = "center";
        let input = document.createElement('input');
        input.type = "checkbox";
        input.setAttribute("data-id", index);
        input.addEventListener('input', handleToggle)
        input.checked = todo.isDone;
        let p = document.createElement('p');
        p.innerText = todo.name;
        if(input.checked === true){
            p.style.textDecoration = "line-through";
        }
        let span = document.createElement('span');
        span.innerText = "❌";
        span.setAttribute("data-id", index);

        span.addEventListener('click', handleDelete);

        li.append(input, p, span);
        root.append(li);
    });
}

createUI();

clear.addEventListener('click', () => {
    allTodos = allTodos.filter((todo) => !todo.isDone);
    createUI();
});

completed.addEventListener('click', () => {
    let Completed = allTodos.filter((todo) => todo.isDone);
    createUI(Completed);
})


active.addEventListener('click', () => {
    let unCompleted = allTodos.filter((todo) => !todo.isDone);
    createUI(unCompleted);
})

all.addEventListener('click',() => {
    let everyThing = allTodos.map((todo) => todo);
    createUI(everyThing);
})

inputText.addEventListener("keyup", handleInput);
}

main();