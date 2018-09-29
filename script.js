const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const callingCounter = callCounter()

function callCounter(){
  var count = 0
  counter = function(){
    count++
    return count
  }
  return counter
}

function newTodo() {
  const newToDoButton = document.querySelector('button')
  const inputToDo = document.createElement("input")
  inputToDo.setAttribute('type', 'text')
  newToDoButton.insertAdjacentHTML('afterend', '<label class="center" for="todo">What to do</lable> \
                                                <input class="center" type="text" id="todo" style="width:60%"> \
                                                <button class="button center" id="addToDo" onClick="addToDo()">Add</button>')
}

function addToDo() {
  let label = document.querySelector("label")
  const inputToDo = document.querySelector("input")
  const addToDoButton = document.getElementById("addToDo")

  label.remove()
  inputToDo.remove()
  addToDoButton.remove()

  const toDoValue = inputToDo.value
  const toDoLi = document.createElement('li')
  toDoLi.setAttribute("class", classNames["TODO_TEXT"] + " " + classNames["TODO_CONTAINER"])
  toDoLi.innerHTML = toDoValue


  const count = callingCounter()
  label = document.createElement("label")
  label.setAttribute("for", "donecheck" + count)
  label.innerHTML = "Done"

  const checkboxEvent = function(evt){
      const checkbox = evt.target
      if (checkbox.checked === true){
          uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) - 1
        }else{
          uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) + 1
          }
      }

  const checkbox = document.createElement('input')
  checkbox.type = "checkbox"
  checkbox.addEventListener("change", checkboxEvent);
  checkbox.setAttribute("id", "donecheck" + count)
  checkbox.setAttribute("class", classNames["TODO_CHECKBOX"])

  const deleteLiButton = document.createElement("button")
  deleteButtonEvent = function(evt){
    const button = evt.target
    const li = button.parentNode
    const checkbox = button.previousSibling.previousSibling //buttons previousSibling is label. labels previousSibling is checkbox
    console.log(checkbox)
    if (Number(itemCountSpan.innerHTML) > 0){
      itemCountSpan.innerHTML = Number(itemCountSpan.innerHTML) - 1
    }
    if (Number(uncheckedCountSpan.innerHTML) > 0 && checkbox.checked === false){
      uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) - 1
    }
    li.remove()
  }

  deleteLiButton.addEventListener("click", deleteButtonEvent)
  deleteLiButton.innerHTML = "Delete"
  deleteLiButton.setAttribute("class", classNames["TODO_DELETE"])

  toDoLi.appendChild(checkbox)
  toDoLi.appendChild(label)
  toDoLi.appendChild(deleteLiButton)
  list.appendChild(toDoLi)

  itemCountSpan.innerHTML = Number(itemCountSpan.innerHTML) + 1
  uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) + 1

}
