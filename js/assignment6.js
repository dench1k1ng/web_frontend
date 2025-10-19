// Task 0: First Script
console.log("=== Task 0: First Script ===");
console.log("Student Name: Shin Denis");
console.log("Group: SE-2434");
console.log("Hello, JavaScript World!");

// Alert button functionality
document.addEventListener('DOMContentLoaded', function () {
    const alertBtn = document.getElementById('alertBtn');
    alertBtn.addEventListener('click', function () {
        alert("Hello, JavaScript World!");
    });
});

// Task 1: Variables & Operators
console.log("\n=== Task 1: Variables & Operators ===");

// Declare variables of different data types
let studentName = "Shin Denis";           // string
let age = 20;                            // number
let isStudent = true;                    // boolean
let gpa = 3.85;                         // number (float)
let hobbies = ["coding", "reading", "music"]; // array

console.log("Variables declared:");
console.log("Name (string):", studentName);
console.log("Age (number):", age);
console.log("Is Student (boolean):", isStudent);
console.log("GPA (number):", gpa);
console.log("Hobbies (array):", hobbies);

// Arithmetic operations
let num1 = 15;
let num2 = 4;

let addition = num1 + num2;
let subtraction = num1 - num2;
let multiplication = num1 * num2;
let division = num1 / num2;
let modulus = num1 % num2;

console.log("\nArithmetic Operations:");
console.log(`${num1} + ${num2} = ${addition}`);
console.log(`${num1} - ${num2} = ${subtraction}`);
console.log(`${num1} * ${num2} = ${multiplication}`);
console.log(`${num1} / ${num2} = ${division}`);
console.log(`${num1} % ${num2} = ${modulus}`);

// String concatenation
let greeting = "Hello, my name is " + studentName;
let info = `I am ${age} years old and my GPA is ${gpa}`;
let combined = greeting + ". " + info;

console.log("\nString Concatenation:");
console.log("Greeting:", greeting);
console.log("Info:", info);
console.log("Combined:", combined);

// Variables button functionality
document.addEventListener('DOMContentLoaded', function () {
    const variablesBtn = document.getElementById('variablesBtn');
    const variablesOutput = document.getElementById('variablesOutput');
    const variablesResults = document.getElementById('variablesResults');

    variablesBtn.addEventListener('click', function () {
        variablesOutput.style.display = 'block';
        variablesResults.innerHTML = `
            <p><strong>Variables:</strong></p>
            <ul>
                <li>Name: ${studentName} (${typeof studentName})</li>
                <li>Age: ${age} (${typeof age})</li>
                <li>Is Student: ${isStudent} (${typeof isStudent})</li>
                <li>GPA: ${gpa} (${typeof gpa})</li>
            </ul>
            <p><strong>Arithmetic Operations:</strong></p>
            <ul>
                <li>${num1} + ${num2} = ${addition}</li>
                <li>${num1} - ${num2} = ${subtraction}</li>
                <li>${num1} × ${num2} = ${multiplication}</li>
                <li>${num1} ÷ ${num2} = ${division.toFixed(2)}</li>
                <li>${num1} % ${num2} = ${modulus}</li>
            </ul>
            <p><strong>String Concatenation:</strong></p>
            <p>${combined}</p>
        `;
    });
});

// =====================================================
// PART 2: DOM MANIPULATION
// =====================================================

console.log("\n=== PART 2: DOM MANIPULATION ===");

document.addEventListener('DOMContentLoaded', function () {

    // Task 2: Changing Content
    console.log("Task 2: Changing Content - Ready");
    const paragraph = document.getElementById('changeable-paragraph');
    const changeContentBtn = document.getElementById('changeContentBtn');

    let isOriginal = true;
    changeContentBtn.addEventListener('click', function () {
        if (isOriginal) {
            paragraph.textContent = "🎉 The paragraph text has been changed using JavaScript! This demonstrates DOM manipulation.";
            changeContentBtn.textContent = "Restore Original Text";
        } else {
            paragraph.textContent = "This is the original text of the paragraph.";
            changeContentBtn.textContent = "Change Paragraph Text";
        }
        isOriginal = !isOriginal;
    });

    // Task 3: Changing Styles
    console.log("Task 3: Changing Styles - Ready");
    const styleTarget = document.getElementById('style-target');
    const changeColorBtn = document.getElementById('changeColorBtn');
    const changeFontBtn = document.getElementById('changeFontBtn');
    const resetStyleBtn = document.getElementById('resetStyleBtn');

    const colors = ['lightcoral', 'lightgreen', 'lightyellow', 'lightpink', 'lightcyan', 'lightgray'];
    const fontSizes = ['16px', '20px', '24px', '28px', '32px'];
    let colorIndex = 0;
    let fontIndex = 0;

    changeColorBtn.addEventListener('click', function () {
        colorIndex = (colorIndex + 1) % colors.length;
        styleTarget.style.backgroundColor = colors[colorIndex];
        console.log(`Background color changed to: ${colors[colorIndex]}`);
    });

    changeFontBtn.addEventListener('click', function () {
        fontIndex = (fontIndex + 1) % fontSizes.length;
        styleTarget.style.fontSize = fontSizes[fontIndex];
        console.log(`Font size changed to: ${fontSizes[fontIndex]}`);
    });

    resetStyleBtn.addEventListener('click', function () {
        styleTarget.style.backgroundColor = 'lightblue';
        styleTarget.style.fontSize = '16px';
        colorIndex = 0;
        fontIndex = 0;
        console.log("Styles reset to original");
    });

    // Task 4: Creating & Removing Elements
    console.log("Task 4: Creating & Removing Elements - Ready");
    const dynamicList = document.getElementById('dynamic-list');
    const addItemBtn = document.getElementById('addItemBtn');
    const removeItemBtn = document.getElementById('removeItemBtn');

    let itemCounter = 3; // Starting from 3 since we have 2 initial items

    addItemBtn.addEventListener('click', function () {
        const newItem = document.createElement('li');
        newItem.className = 'list-group-item';
        newItem.textContent = `Dynamic Item ${itemCounter}`;
        dynamicList.appendChild(newItem);
        console.log(`Added: Dynamic Item ${itemCounter}`);
        itemCounter++;
    });

    removeItemBtn.addEventListener('click', function () {
        const items = dynamicList.getElementsByTagName('li');
        if (items.length > 0) {
            const lastItem = items[items.length - 1];
            console.log(`Removed: ${lastItem.textContent}`);
            dynamicList.removeChild(lastItem);
        } else {
            alert("No items to remove!");
        }
    });
});

// =====================================================
// PART 3: EVENTS
// =====================================================

console.log("\n=== PART 3: EVENTS ===");

document.addEventListener('DOMContentLoaded', function () {

    // Task 5: Mouse Events
    console.log("Task 5: Mouse Events - Ready");
    const mouseTarget = document.getElementById('mouse-target');
    const originalColor = '#e9ecef';
    const hoverColors = ['#ffcccb', '#90ee90', '#ffd700', '#dda0dd', '#98fb98'];

    mouseTarget.addEventListener('mouseover', function () {
        const randomColor = hoverColors[Math.floor(Math.random() * hoverColors.length)];
        this.style.backgroundColor = randomColor;
        this.textContent = 'Mouse is over!';
        console.log("Mouse entered - color changed to:", randomColor);
    });

    mouseTarget.addEventListener('mouseout', function () {
        this.style.backgroundColor = originalColor;
        this.textContent = 'Hover over me!';
        console.log("Mouse left - color restored");
    });

    // Task 6: Keyboard Events
    console.log("Task 6: Keyboard Events - Ready");
    const keyboardInput = document.getElementById('keyboard-input');
    const currentValue = document.getElementById('current-value');
    const charCount = document.getElementById('char-count');

    keyboardInput.addEventListener('keyup', function () {
        const value = this.value;
        currentValue.textContent = value || "(empty)";
        charCount.textContent = value.length;
        console.log(`Input value: "${value}" (${value.length} characters)`);
    });

    // Also handle input event for better responsiveness
    keyboardInput.addEventListener('input', function () {
        const value = this.value;
        currentValue.textContent = value || "(empty)";
        charCount.textContent = value.length;
    });

    // Task 7: Calculator
    console.log("Task 7: Calculator - Ready");
    const calcDisplay = document.getElementById('calc-display');
    const calcButtons = document.querySelectorAll('.calc-btn');

    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let shouldResetDisplay = false;

    function updateDisplay(value) {
        calcDisplay.value = value || '0';
    }

    function calculate(prev, current, op) {
        const prevNum = parseFloat(prev);
        const currentNum = parseFloat(current);

        switch (op) {
            case '+':
                return prevNum + currentNum;
            case '-':
                return prevNum - currentNum;
            case '*':
            case '×':
                return prevNum * currentNum;
            case '/':
                return currentNum !== 0 ? prevNum / currentNum : 'Error';
            default:
                return currentNum;
        }
    }

    calcButtons.forEach(button => {
        button.addEventListener('click', function () {
            const action = this.dataset.action;
            const number = this.dataset.number;

            if (action === 'clear') {
                currentInput = '';
                operator = '';
                previousInput = '';
                updateDisplay('');
                console.log("Calculator cleared");
            }
            else if (action === 'backspace') {
                currentInput = currentInput.slice(0, -1);
                updateDisplay(currentInput);
                console.log("Backspace pressed");
            }
            else if (action === 'equals') {
                if (previousInput && operator && currentInput) {
                    const result = calculate(previousInput, currentInput, operator);
                    updateDisplay(result);
                    console.log(`Calculation: ${previousInput} ${operator} ${currentInput} = ${result}`);
                    currentInput = result.toString();
                    operator = '';
                    previousInput = '';
                    shouldResetDisplay = true;
                }
            }
            else if (['+', '-', '*', '×', '/'].includes(number)) {
                if (currentInput) {
                    if (previousInput && operator) {
                        const result = calculate(previousInput, currentInput, operator);
                        updateDisplay(result);
                        currentInput = result.toString();
                    }
                    previousInput = currentInput;
                    operator = number;
                    currentInput = '';
                    console.log(`Operator selected: ${number}`);
                }
            }
            else if (number) {
                if (shouldResetDisplay) {
                    currentInput = '';
                    shouldResetDisplay = false;
                }
                currentInput += number;
                updateDisplay(currentInput);
                console.log(`Number entered: ${number}`);
            }
        });
    });
});

// =====================================================
// PART 4: MINI PROJECT - INTERACTIVE TO-DO LIST
// =====================================================

console.log("\n=== PART 4: MINI PROJECT - TO-DO LIST ===");

document.addEventListener('DOMContentLoaded', function () {

    // Task 8: Build a To-Do App
    console.log("Task 8: To-Do App - Ready");

    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');
    const clearCompletedBtn = document.getElementById('clear-completed-btn');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const totalCount = document.getElementById('total-count');
    const completedCount = document.getElementById('completed-count');
    const remainingCount = document.getElementById('remaining-count');

    // Array to store tasks
    let tasks = [];
    let taskIdCounter = 1;

    // Function to update statistics
    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const remaining = total - completed;

        totalCount.textContent = total;
        completedCount.textContent = completed;
        remainingCount.textContent = remaining;
    }

    // Function to render all tasks
    function renderTasks() {
        todoList.innerHTML = '';

        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            todoList.appendChild(taskElement);
        });

        updateStats();
    }

    // Function to create a task element
    function createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = `todo-item ${task.completed ? 'completed' : ''}`;
        taskDiv.dataset.taskId = task.id;

        taskDiv.innerHTML = `
            <div class="d-flex align-items-center">
                <input type="checkbox" class="form-check-input me-2" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
            </div>
            <div>
                <button class="btn btn-outline-primary btn-sm edit-btn me-1">Edit</button>
                <button class="btn btn-outline-danger btn-sm delete-btn">Delete</button>
            </div>
        `;

        // Add event listeners
        const checkbox = taskDiv.querySelector('input[type="checkbox"]');
        const editBtn = taskDiv.querySelector('.edit-btn');
        const deleteBtn = taskDiv.querySelector('.delete-btn');
        const taskText = taskDiv.querySelector('.task-text');

        // Toggle completion
        checkbox.addEventListener('change', function () {
            task.completed = this.checked;
            taskDiv.classList.toggle('completed', task.completed);
            updateStats();
            console.log(`Task ${task.completed ? 'completed' : 'uncompleted'}: ${task.text}`);
        });

        // Edit task
        editBtn.addEventListener('click', function () {
            const newText = prompt('Edit task:', task.text);
            if (newText && newText.trim()) {
                task.text = newText.trim();
                taskText.textContent = task.text;
                console.log(`Task edited: ${task.text}`);
            }
        });

        // Delete task
        deleteBtn.addEventListener('click', function () {
            const index = tasks.findIndex(t => t.id === task.id);
            if (index > -1) {
                tasks.splice(index, 1);
                renderTasks();
                console.log(`Task deleted: ${task.text}`);
            }
        });

        return taskDiv;
    }

    // Function to add a new task
    function addTask(text) {
        if (text.trim()) {
            const newTask = {
                id: taskIdCounter++,
                text: text.trim(),
                completed: false,
                createdAt: new Date()
            };

            tasks.push(newTask);
            renderTasks();
            console.log(`Task added: ${newTask.text}`);
            return true;
        }
        return false;
    }

    // Add task button event
    addTodoBtn.addEventListener('click', function () {
        const text = todoInput.value;
        if (addTask(text)) {
            todoInput.value = '';
        } else {
            alert('Please enter a task!');
        }
    });

    // Enter key support for adding tasks
    todoInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const text = this.value;
            if (addTask(text)) {
                this.value = '';
            } else {
                alert('Please enter a task!');
            }
        }
    });

    // Clear completed tasks
    clearCompletedBtn.addEventListener('click', function () {
        const completedTasks = tasks.filter(task => task.completed);
        if (completedTasks.length > 0) {
            if (confirm(`Are you sure you want to delete ${completedTasks.length} completed task(s)?`)) {
                tasks = tasks.filter(task => !task.completed);
                renderTasks();
                console.log(`${completedTasks.length} completed tasks cleared`);
            }
        } else {
            alert('No completed tasks to clear!');
        }
    });

    // Clear all tasks
    clearAllBtn.addEventListener('click', function () {
        if (tasks.length > 0) {
            if (confirm(`Are you sure you want to delete all ${tasks.length} task(s)?`)) {
                tasks = [];
                renderTasks();
                console.log('All tasks cleared');
            }
        } else {
            alert('No tasks to clear!');
        }
    });

    // Initialize with some sample tasks
    addTask('Learn JavaScript DOM manipulation');
    addTask('Complete Assignment #6');
    addTask('Practice event handling');

    console.log("To-Do App initialized with sample tasks");
});

// =====================================================
// ADDITIONAL UTILITY FUNCTIONS
// =====================================================

// Function to log performance (bonus feature)
function logPerformance() {
    console.log("\n=== Performance Information ===");
    console.log("Page loaded at:", new Date().toLocaleString());
    console.log("User Agent:", navigator.userAgent);
    console.log("Screen Resolution:", `${screen.width}x${screen.height}`);
    console.log("Viewport Size:", `${window.innerWidth}x${window.innerHeight}`);
}

// Run performance log when page is fully loaded
window.addEventListener('load', function () {
    logPerformance();
    console.log("\n🎉 Assignment #6 JavaScript implementation completed successfully!");
    console.log("All tasks are working and interactive. Check the console for detailed logs.");
});

// Error handling for the entire application
window.addEventListener('error', function (e) {
    console.error('JavaScript Error:', e.message, 'at', e.filename, ':', e.lineno);
});
