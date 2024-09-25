// Retrieve the tasks from localStorage or initialize an empty array if none exist
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to sync the current task list with localStorage
function syncLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

// Function to display tasks in the UI
function displayTasks() {
    // Get the container element to display the task list
    let taskContainer = document.getElementById("task-list");
    // Clear the existing content of the task container
    taskContainer.innerHTML = "";

    // Iterate over each task in the task list
    for (let task of taskList) {
        // Create a list item element for the task
        let taskWrapper = document.createElement('li');

        // Create a checkbox for the task
        let taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.checked = task.completed; // Set checkbox state based on task completion

        // Create a span to hold the task name
        let taskName = document.createElement('span');
        taskName.className = 'task';
        taskName.textContent = task.text; // Set the text of the task
        if (task.completed) {
            // Apply strikethrough style if the task is completed
            taskName.style = "text-decoration: line-through";
        }

        // Add event listener to handle checkbox changes
        taskCheckbox.addEventListener('change', () => {
            if (taskCheckbox.checked) {
                // Mark task as completed
                taskName.style = "text-decoration: line-through";
                task.completed = true;
            } else {
                // Mark task as not completed
                taskName.style = "text-decoration: none";
                task.completed = false;
            }
            // Sync changes with localStorage
            syncLocalStorage();
        });

        // Create a delete button for the task
        let taskDeleteButton = document.createElement('button');
        taskDeleteButton.className = "delete-btn";
        taskDeleteButton.textContent = "Delete"; // Set button text

        // Add event listener to handle task deletion
        taskDeleteButton.addEventListener('click', () => {
            taskWrapper.remove(); // Remove task element from the UI
            taskList.splice(taskList.indexOf(task), 1); // Remove task from the task list
            syncLocalStorage(); // Sync changes with localStorage
        });

        // Append checkbox, task name, and delete button to the task wrapper
        taskWrapper.appendChild(taskCheckbox);
        taskWrapper.appendChild(taskName);
        taskWrapper.appendChild(taskDeleteButton);
        // Append the task wrapper to the task container
        taskContainer.appendChild(taskWrapper);
    }
}

// Initial call to display tasks on page load
displayTasks();

// Function to add a new task to the list
function addTask() {
    // Get the new task name from the input field
    let newTaskName = document.getElementById('input-task').value;
    // Create a new task object
    let task = { text: newTaskName, completed: false };
    taskList.push(task); // Add the new task to the task list
    syncLocalStorage(); // Sync changes with localStorage
    displayTasks(); // Refresh the displayed task list
}
