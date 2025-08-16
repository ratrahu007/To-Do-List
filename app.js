// This function wraps our entire application to create a private scope.
// This is an example of an IIFE (Immediately Invoked Function Expression).
(function() {
    // --- CONCEPTS: Variables (let, const), DOM Manipulation (Selectors) ---
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('new-task-input');
    const taskList = document.getElementById('task-list');
    const taskCounter = document.getElementById('task-counter');
    const statusMessage = document.getElementById('status-message');

    // --- CONCEPT: Closures & Lexical Scope ---
    // 'tasks' is a private variable. It can only be accessed and modified
    // by the functions inside this IIFE, creating a closure.
    let tasks = [];

    // --- CONCEPT: Event Bubbling & Delegation ---
    // We add ONE listener to the parent list. It listens for clicks on any
    // child element, including future ones we add.
    taskList.addEventListener('click', function(event) {
        // We check if the clicked element was a delete button
        if (event.target.classList.contains('delete-btn')) {
            const taskId = parseInt(event.target.parentElement.dataset.id);
            removeTask(taskId);
        }
    });

    // --- CONCEPT: Events (submit), event.preventDefault() ---
    taskForm.addEventListener('submit', function(event) {
        // Prevents the default form behavior of reloading the page.
        event.preventDefault();

        // --- CONCEPT: Control Structures (if), Operators (===) ---
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = ''; // Clear the input
        }
    });

    // --- CONCEPT: Functions (Arrow, Declarations), Objects, Arrays ---
    const addTask = (text) => {
        // Create a task object
        const task = {
            id: Date.now(), // A simple unique ID using the timestamp
            text: text,
            completed: false
        };

        tasks.push(task);
        render(); // Update the screen
        simulateSave(); // Show async behavior
    };

    function removeTask(id) {
        // --- CONCEPT: Array Methods (filter) ---
        // Create a new array containing all tasks EXCEPT the one with the matching id.
        tasks = tasks.filter(task => task.id !== id);
        render();
        simulateSave();
    }

    // --- CONCEPT: DOM Manipulation, Template Literals, Ternary Operator ---
    function render() {
        // Clear the current list to prevent duplicates
        taskList.innerHTML = '';

        // --- CONCEPT: Array Methods (forEach) ---
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.dataset.id = task.id; // Store the id on the element

            // Use a template literal for clean HTML string creation
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="delete-btn">Delete</button>
            `;
            taskList.appendChild(li);
        });

        // Use a ternary operator for a compact if/else statement
        const counterText = tasks.length === 1 ? '1 task' : `${tasks.length} tasks`;
        taskCounter.textContent = `You have ${counterText}.`;
    }

    // --- CONCEPT: Async JavaScript (setTimeout), Event Loop ---
    function simulateSave() {
        statusMessage.classList.remove('hidden'); // Show "Saving..."

        // setTimeout offloads this function. The browser will run it after 1 sec
        // without freezing the UI, demonstrating the Event Loop.
        setTimeout(() => {
            statusMessage.classList.add('hidden'); // Hide "Saving..."
        }, 1000);
    }

    // Initial render to show the starting state
    render();

})(); // The () at the end calls the function immediately.