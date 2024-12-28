const form = document.querySelector('#form');
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];
if (localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function (task){
    renderTask(task);
})


checkEmptyList();
//if(localStorage.getItem('tasksHTML')){
    //tasksList.innerHTML = localStorage.getItem('tasksHTML')
//}

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);

function addTask(event){
    event.preventDefault();

    const taskText = taskInput.value
    
    const newTask = {
        id: Date.now(), 
        text: taskText, 
        done: false
    };

    tasks.push(newTask) 

    console.log(tasks);

    renderTask(newTask);
    taskInput.value = "";
    taskInput.focus()

    checkEmptyList()
    saveToLocalStorage()
};

function deleteTask(event){
    if (event.target.dataset.action !=='delete'){
        return
    }

    
        
    const parentNode = event.target.closest('.list-group-item');
    const id = Number(parentNode.id);
    const index = tasks.findIndex(function(task){
        if(task.id === id){
            return true
        }
    })

    tasks.splice(index,1)

    parentNode.remove()
    
    checkEmptyList()
    saveToLocalStorage()
    
};
function doneTask(event){
    if(event.target.dataset.action === 'done'){
        const parentNode = event.target.closest('.list-group-item');
        const id = Number(parentNode.id);

        const task = tasks.find((task)=> task.id ===id)
        task.done = !task.done
        console.log(tasks)
        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');
        saveToLocalStorage()
    }
   
}

//function SaveHTMLtoLS(){
    //localStorage.setItem('tasksHTML' , tasksList.innerHTML);
//}

function checkEmptyList(){
    if(tasks.length === 0){
        const emptyListElement = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
        </li>`;
    
        tasksList.insertAdjacentHTML('afterbegin', emptyListElement);
    }else {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage(){
    localStorage.setItem('tasks' , JSON.stringify(tasks))
}

function renderTask(task){
    const cssClass = task.done ? "task-title task-title--done" : "task-title "

    const taskHtml = `<li id="${task.id}"class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" id = "delete" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;
    
    tasksList.insertAdjacentHTML('beforeend', taskHtml);
}