let toDoList = new Array();
let obj1 = new tasks(123, 'Go to sleep', true);
let obj2 = new tasks(193, 'Clean up the mess', false);
let obj3 = new tasks(89, 'Gardening', true);
let obj4 = new tasks(10, 'Badminton', true);
let obj5 = new tasks(128, 'Finish assesment', false);
toDoList = [obj1, obj2, obj3, obj4, obj5];
console.log(toDoList);
function tasks(id, task, isChecked) {
  this.id = id;
  this.task = task;
  this.isChecked = isChecked;
}
window.onload=function()
{
displayAll(toDoList);
}
function submit() {
  if (document.querySelector('#newtask textarea').value == '') {
    alert('Kindly Enter Task Name');
  } else {
    let objID = Math.floor(Math.random() * 1000 + 1);
    let text = `${document.querySelector('#newtask textarea').value}`;
    let truthOrFalse = toDoList.find((o) => o.task == text);
    if (truthOrFalse) alert('Same task name');
    else {
      let obj = new tasks(objID, text, false);
      toDoList.push(obj);
      display(objID, obj.task);
    }
  }
  console.log(toDoList);
}
function display(objId, text) {
  let task = document.getElementById('tasks');
  let divProperties = { className: 'task', element: 'div' };
  let div = createHTMLElements(divProperties);
  let spanProperties = {
    id: objId,
    element: 'span',
    taskname: text,
  };
  let span = createHTMLElements(spanProperties);
  let span1 = createSpanWithButtons();
  document.querySelector('#newtask textarea').value = '';
  div.appendChild(span);
  div.appendChild(span1);
  task.appendChild(div);
}
function edit() {
  let newDiv = document.querySelector('#newtask');
  let submit = document.getElementById('push');
  let editTasks = document.querySelectorAll('.edit');
  let update = document.createElement('button');
  update.innerText = 'Update';
  let i;
  for (i = 0; i < editTasks.length; i++) {
    editTasks[i].onclick = (function (i) {
      return function () {
        document.querySelector('#newtask textarea').value =
          this.parentElement.previousElementSibling.innerText;
        let id = this.parentElement.previousElementSibling.id;
        newDiv.replaceChild(update, submit);
        update.onclick = function () {
          taskEdit(id);
          let spanElement = document.querySelectorAll('.task span:first-child');
          spanElement[i].textContent = `${
            document.querySelector('#newtask textarea').value
          }`;
          newDiv.replaceChild(submit, update);
          console.log(toDoList);
        };
      };
    })(i);
  }
  document.querySelector('#newtask textarea').value = '';
}
function deleteTask() {
  var current_tasks = document.querySelectorAll('.delete');
  for (var i = 0; i < current_tasks.length; i++) {
    current_tasks[i].onclick = function () {
      let id = this.parentElement.previousElementSibling.id;
      arrayDelete(id);
      this.parentElement.parentElement.remove();
      console.log(toDoList);
    };
  }
}
function arrayDelete(id) {
  let index = toDoList.findIndex((o) => o.id == id);
  toDoList.splice(index, 1);
}
function onChecked() {
  let checkedtask = document.querySelectorAll('.check');
  for (var i = 0; i < checkedtask.length; i++) {
    checkedtask[i].onclick = (function (i) {
      return function () {
        handleCheck(this, i);
      };
    })(i);
  }
}
function handleCheck(element, i) {
  if (element.checked == true) {
    toDoList[i].isChecked = true;
  } else {
    toDoList[i].isChecked = false;
  }
  console.log(toDoList);
}
function taskEdit(id) {
  let index = toDoList.findIndex((o) => o.id == id);
  toDoList[index].task = `${document.querySelector('#newtask textarea').value}`;
}
function createHTMLElements(object) {
  let newElement = document.createElement(object.element);
  if (object.className != undefined) {
    newElement.className = object.className;
  } else if (object.id != undefined && object.taskname != undefined) {
    newElement.id = object.id;
    newElement.textContent = object.taskname;
  }
  return newElement;
}
function createButton(buttonClassName, iconClassName) {
  let buttonProperties = { className: buttonClassName, element: 'button' };
  let button = createHTMLElements(buttonProperties);
  let iconProperties = { className: iconClassName, element: 'i' };
  let icon = createHTMLElements(iconProperties);
  button.appendChild(icon);
  return button;
}
function createSpanWithButtons(isChecked) {
  let spanProperties = { element: 'span' };
  let span1 = createHTMLElements(spanProperties);
  let checkProperties = { className: 'check', element: 'input' };
  let check = createHTMLElements(checkProperties);
  check.addEventListener('mouseover', onChecked);
  check.type = 'checkbox';
  check.value = `${document.querySelector('#newtask textarea').value}`;
  span1.appendChild(check);
  if (isChecked == true) {
    check.checked = true;
  }
  let button = createButton('delete', 'far fa-trash-alt');
  let button1 = createButton('edit', 'far fa-edit');
  button.addEventListener('mouseover', deleteTask);
  button1.addEventListener('mouseover', edit);
  span1.appendChild(button);
  span1.appendChild(button1);
  return span1;
}
function displayAll(array) {
  array.forEach((eachItem) => {
    let task = document.getElementById('tasks');
    let divProperties = { className: 'task', element: 'div' };
    let div = createHTMLElements(divProperties);
    let spanProperties = {
      id: eachItem.id,
      element: 'span',
      taskname: eachItem.task,
    };
    let span = createHTMLElements(spanProperties);
    let span1 = createSpanWithButtons(eachItem.isChecked);
    div.appendChild(span);
    div.appendChild(span1);
    task.appendChild(div);
    return task;
  });
}
