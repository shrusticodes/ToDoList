let arr=new Array();
function tasks(id,task,isChecked){
    this.id=id;
    this.task=task;
    this.isChecked=isChecked;
}
function submit() {
    if (document.querySelector('#newtask textarea').value == '') {
      alert('Kindly Enter Task Name');
    } else {
      let objID = Math.floor(Math.random() * 1000 + 1);
      let text = `${document.querySelector('#newtask textarea').value}`;
      let truthOrFalse = arr.find((o) => o.task == text);
      if (truthOrFalse) alert('Same task name');
      else {
        let obj = new tasks(
          objID,
          `${document.querySelector('#newtask textarea').value}`,
          false
        );
        arr.push(obj);
        display(objID);
      }
    }
    console.log(arr);
  }
  function display(id) {
    let task = document.getElementById('tasks');
    let div = createElements('task', 'div');
    let span = createSpan(
      id,
      'span',
      `${document.querySelector('#newtask textarea').value}`
    );
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
            console.log(arr);
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
        console.log(arr);
      };
    }
  }
  function arrayDelete(id) {
    let index = arr.findIndex((o) => o.id == id);
    arr.splice(index, 1);
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
      arr[i].isChecked = true;
    } else {
      arr[i].isChecked = false;
    }
    console.log(arr);
  }
  function taskEdit(id) {
    let index = arr.findIndex((o) => o.id == id);
    arr[index].task = `${document.querySelector('#newtask textarea').value}`;
  }
  function createElements(className, element) {
    let newElement = document.createElement(element);
    newElement.className = className;
    return newElement;
  }
  function createButton(className, iconClassName) {
    let button = createElements(className, 'button');
    let icon = createElements(iconClassName, 'i');
    button.appendChild(icon);
    return button;
  }
  function createSpan(id, element, text) {
    let newSpan = document.createElement(element);
    newSpan.id = id;
    let textNode = document.createTextNode(text);
    newSpan.appendChild(textNode);
    return newSpan;
  }
  function createSpanWithButtons() {
    let span1 = createElements('span', 'span');
    let check = createElements('check', 'input');
    check.addEventListener('mouseover', onChecked);
    check.type = 'checkbox';
    check.value = `${document.querySelector('#newtask textarea').value}`;
    span1.appendChild(check);
    let button = createButton('delete', 'far fa-trash-alt');
    let button1 = createButton('edit', 'far fa-edit');
    button.addEventListener('mouseover', deleteTask);
    button1.addEventListener('mouseover', edit);
    span1.appendChild(button);
    span1.appendChild(button1);
    return span1;
  }
// let button3=document.createElement('button');
// button3.className="filter"
// button3.innerText="Filter"
