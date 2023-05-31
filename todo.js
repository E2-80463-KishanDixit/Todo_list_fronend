let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const toast = document.getElementById('toast');

function addTaskToDom(task){
    const li = document.createElement('li');
    li.innerHTML = ` 
    <input type="checkbox" id=${task.id} ${task.done ? 'checked' : ""} class="custom-checkbox">
    <label for=${task.id}> ${task.text} </label>
    <img src="assets/garbage-bin-10420.svg" class="delete" data-id=${task.id} />
    `;
    tasksList.append(li);
}

function renderList() {
    tasksList.innerHTML = " ";
    for(let i = 0 ; i < tasks.length ; i++){
        addTaskToDom(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function toggleTask (taskId) {
    for(var currTask of tasks){
        if(currTask.id == taskId){
            currTask.done = !currTask.done;
            renderList();
            showNotification("Task toggled successfully");
            return;
        }
    }
    showNotification("Could not toggle the task");
}

function deleteTask (taskId) {
    let newTasks = tasks.filter(function(task){
        return task.id !== taskId ;
    });
    tasks = newTasks;
    renderList();
    showNotification("Task deleted successfully");
}

//Add Task in the Array
function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
    showNotification('Task not added');
}

// Show to pop up message on the top
function showNotification(text) {
    toast.innerText = text;
    toast.style.display = 'inline-block';
    setTimeout(function(){
        toast.style.display = 'none';
    },1000);
    // alert(text);
}

function handleUserkeyInput(e){
    if(e.key === 'Enter'){
        const text = e.target.value;
        if(!text){
            showNotification("Text can't be Empty");
            return;
        }

        const task = {
            text,
            id: Date.now().toString(),
            done:false
        }

        e.target.value = "";
        addTask(task);
    }
}

function handleClickEvent(e){
    console.log(e.target);
    let target = e.target;
    if(target.className == 'delete'){
        deleteTask(target.dataset.id);
    }else if(target.className == 'custom-checkbox'){
        toggleTask(target.id);
    }
}

function initializeApp(){
    addTaskInput.addEventListener('keyup',handleUserkeyInput);
    document.addEventListener('click',handleClickEvent);
}

initializeApp();
