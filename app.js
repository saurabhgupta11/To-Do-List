const addTaskForm = document.querySelector('form.add');
const parentList = document.querySelector('.list-group');
const tasksArray = [];
const searchForm = document.querySelector('.search');


addTaskForm.addEventListener('submit',(e) => {

    e.preventDefault();

    let task = addTaskForm.add.value.trim();

    if(task.length > 0) {
        pushTaskToArray(task);
        pushTaskToDom(task);
        resetForm();
    }
    
});

// empty the form field
function resetForm() {
    addTaskForm.reset();
}

// Pushing newly added task to Task Array for furthur use
function pushTaskToArray(task) {
    tasksArray.push(task);
}

// Pushing new tasks to DOM
function pushTaskToDom(task) {

    /*------------------Traditional Method---------------------*/

    // let listTask = document.createElement('li');
    // listTask.classList.add('list-group-item','d-flex','justify-content-between','align-items-center');
    
    // let spanListContent = document.createElement('span');
    // spanListContent.textContent = `${task}`;

    // let trashIcon = document.createElement('i');
    // trashIcon.classList.add('far','fa-trash-alt','delete');

    // listTask.append(spanListContent);
    // listTask.append(trashIcon);

    // parentList.append(listTask);

    /*------------------Traditional Method---------------------*/

    let todo = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${task}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;

    parentList.innerHTML += todo;
}

// deleting todos from the list
parentList.addEventListener('click', e => {
    if(e.target.classList.contains('delete')) {
        removeTodoFromArray(e.target.previousElementSibling.innerHTML);
        e.target.parentElement.remove();
    }
});

// removing todo from the array
function removeTodoFromArray(todo) {
    tasksArray.forEach((task,i) => {
        if(task === todo) {
            tasksArray.splice(i,1);
        }
    });
}

// Search todos in the list
searchForm.addEventListener('keyup',e => {
    let searchTodo = e.target.value.trim().toLowerCase();
    filterTodos(searchTodo);
});

// 
function filterTodos(searchTodo) {
    Array.from(parentList.children).forEach(child => {
        let spanList = child.firstElementChild.innerHTML.toLowerCase().trim();
        if(!spanList.includes(searchTodo)) {
            child.classList.add('filtered');
        } else {
            child.classList.remove('filtered');
        }
    });
}