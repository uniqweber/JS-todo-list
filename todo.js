const todoContainer = document.getElementById("todoContainer"); //get the ul
const todoInput = document.getElementById("todoInput"); //get the input field
const todoButton = document.getElementById("addTodo"); // working done

todoButton.addEventListener("click", function (e) {
  e.preventDefault();
  addTodo(e);
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === "") {
    return;
  }
  const todoItem = document.createElement("li");

  todoItem.innerHTML = `   
  <div class="flex justify-between items-center gap-2 pt-4 border-gray-700">
        <div class="flex items-center truncate w-full  gap-2 ">
            <input type="checkbox" class="h-4 w-4 bg-gray-900 border-gray-700 rounded-full cursor-pointer border duration-300 checked:border-blue-500 checked:bg-blue-500  appearance-none" />
            <span id="todoText" >${todoText}</span>
        </div>
        <div class="flex-shrink-0">
            <button id="edit" class="px-3 text-sm bg-cyan-600 py-2 rounded-md">Edit</button>
                <button id="delete" class="px-3 text-sm bg-red-600 py-2 rounded-md">Delete</button>
        </div>
 </div>`;
  checkboxCheck(todoItem);
  editTodo(todoItem);
  deleteTodo(todoItem);
  todoContainer.appendChild(todoItem);
  todoInput.value = "";
  const todos = Array.from(todoContainer.children);
  todos.reverse();
  todos.forEach((todo) => todoContainer.appendChild(todo));
}

function checkboxCheck(todoItem) {
  const checkbox = todoItem.querySelector("input[type='checkbox']");
  const inputText = todoItem.querySelector("#todoText");
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      inputText.classList.add("line-through");
      inputText.classList.add("text-blue-500");
    } else {
      inputText.classList.remove("line-through");
      inputText.classList.remove("text-red-500");
    }
  });
}

function editTodo(todoItem) {
  const editButton = todoItem.querySelector("#edit");
  const inputText = todoItem.querySelector("#todoText");
  editButton.addEventListener("click", () => {
    todoInput.value = inputText.textContent;
    todoButton.textContent = "Update";
    todoButton.classList.remove("bg-blue-500");
    todoButton.classList.add("bg-green-500");
    todoContainer.removeChild(todoItem);
  });
  todoButton.textContent = "Add";
  todoButton.classList.remove("bg-green-500");
  todoButton.classList.add("bg-blue-500");
}

function deleteTodo(todoItem) {
  const deleteButton = todoItem.querySelector("#delete");
  deleteButton.addEventListener("click", () => {
    todoContainer.removeChild(todoItem);
  });
}
