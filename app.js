// Defining UI Variables

const form = document.querySelector("#task-form"); // assigning form variable to the id task-form element
const taskList = document.querySelector(".collection"); // assigning taskList variable to the collection class
const clearBtn = document.querySelector(".clear-tasks"); // assigning claerBtn variable to the clear-tasks class
const filter = document.querySelector("#filter"); // assigning filter variable to the id filter element
const taskInput = document.querySelector("#task"); // assigning taskInput variable to the id task element



// Load all event listeners
loadEventListeners(); // declaring the function 'loadEventListeners'

function loadEventListeners() {
    //add task event - using the form variable we created above

    document.addEventListener('DOMContentLoaded', getTasks); // this listens for the DOMContentLoaded which is called when a page is launched in the browser, then the getTasks function will retrieve tasks from Local storage.

    form.addEventListener('submit', addTask);

    taskList.addEventListener('click', removeTask); //listening for a click to remove task

    clearBtn.addEventListener('click', clearTasks); // event listener for clear ALL tasks button

    filter.addEventListener('keyup', filterTasks); // keyup = when user releases key
}

// Get tasks from Local Storage
function getTasks() {
    let tasks; // call the tasks variable to look for tasks
    if (localStorage.getItem('tasks') === null) { //if tasks are null then show empty array.
        tasks = [];
    } else { // otherwise set local storage to whatever is in tasks
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) { //loop through the tasks that exist as before and spit out html content of task list.
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task)); //this time there is no taskInput.value - only tasks from local storage so we replace taskInput.value to just 'task'
        const link = document.createElement('a');
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}
// Add task function

// this function will take in an event object (e)
function addTask(e) {
    if (taskInput.value === '') {
        alert('To add a task, first give it a description, dude!');
        document.getElementById('addbtn').disabled = true;
    } else {
        document.getElementById('addbtn').disabled = false;
        // if the value input equals nothing...
        // if nothing is entered and you click add task button you get an alert ( conditional statement )

        // Creating list item when a task is added

        const li = document.createElement("li");

        // add class
        li.className = "collection-item";
        // create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value)); // whatever you call the task item will show up with taskInput.value
        // create new link element (x)
        const link = document.createElement("a");

        // add the delete-item class to link
        link.className = "delete-item secondary-content";
        // this is the class for the (x) that appears next to task item. The secondary-content class will apply the item to the right of task item

        //add the icon html to the link - using innerHTML to create the html for the link as seen below
        link.innerHTML = '<i class="fa fa-remove"></i>'; // font awsome icon x
        //append delete link to li
        li.appendChild(link);
        //append li to ul - adds the list item under Tasks title
        taskList.appendChild(li);

        // store in local storage
        storeTaskInLocalStorage(taskInput.value); // we create this function which will store whatever is typed into taskInput.value

        //clear input
        taskInput.value = ""; //makes sure the input field is empty
        e.preventDefault(); // this will prevent the defult behaviour of submit button sumbitting
    }
}

function success() {
    if (taskInput.value === '') {
        document.getElementById('addbtn').disabled = true;
    } else {
        document.getElementById('addbtn').disabled = false;

    }
}
// store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) { // conditional statement to see if there are any tasks in local storage.
        tasks = []; // if empty set tasks variable to an empty array
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); // otherwise we set the tasks variable to whataver is in local storage. Local storage only stores string data so we parse this as JSON when it comes out
    }

    tasks.push(task); //we are pushing the contents of the (task) variable into the tasks variable

    localStorage.setItem('tasks', JSON.stringify(tasks)); //..then we set the content back to local storage

}

//REMOVE TASK 
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) { // if the task list item contains a delete icon...
     

            e.target.parentElement.parentElement.remove(); //then make sure when the x is clicked on that it's deleted from list. 1st parentElement is the li class="collection-item" , 2nd parentElement is the <a class="delete-item secondary-content">

            //Remove tasks from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement); // we create the function to remove tasks from local storage using the same list item string
        }
    }
}
//Remove tasks from Local Storage
function removeTaskFromLocalStorage(taskItem) { // run function created above with the taskItem variable
    let tasks;
    if (localStorage.getItem('tasks') === null) { // conditional statement to see if there are any tasks in local storage.
        tasks = []; // if empty set tasks variable to an empty array
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); // otherwise we set the tasks variable to whataver is in local storage. Local storage only stores string data so we parse this as JSON when it comes out
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//CLEAR ALL TASKS
function clearTasks() {
    // taskList.innerHTML = '';
    // this is older method of removing all items. using innerHTML to equal nothing is the same as removing all tasks.

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    } // the while loop loops through function until there are no more tasks - better method

    // CLEAR FROM LOCAL STORAGE - function name
    clearTasksFromLocalStorage();
}
// CLEAR FROM LOCAL STORAGE - function call
function clearTasksFromLocalStorage() {
    localStorage.clear();
}


function filterTasks(e) {
    const text = e.target.value.toLowerCase(); // this changes the input value letters to lowercase

    document.querySelectorAll('.collection-item').forEach(function (task) {
        // we'll take all of the list items with 
        //querySelectorAll that have a class of .collection-item and loop through those with .forEach
        const item = task.firstChild.textContent; //we create a variable item to grab text content of firstChild https://www.w3schools.com/jsref/prop_node_firstchild.asp
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block'
            // we create a conditional statement to check the text content. If the text does not equal -1 then display the text as block display style... 
        } else {
            task.style.display = 'none' // ..otherwise display nothing
        } // any text that exists task list will be matched by what you type in the filter area.
    });
}
