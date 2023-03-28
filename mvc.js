class Model{
    constructor(){
     this.toDoList=[
      {id:81, task:"Plant a tree", check:false},
      {id:278, task:"Pick up the papers",check:true},
      {id:335, task:"Run 100m", check:false},
      {id:74, task:"Water the plants", check:false},
      {id:95, task:"Clean the house", check:true}]
    };
    addItem(currentTask)
    {
    let toDoObject={
       id:Math.floor(Math.random() * 1000 + 1),
       task:currentTask,
       checked:false};
    this.toDoList.push(toDoObject);
    }
    editTask(id,updatedTask)
    {
        let index = this.toDoList.findIndex((task) => task.id === id);
        this.toDoList[index].task=updatedTask;
    }
    deleteTask(id)
    {
        let index = this.toDoList.findIndex((task) => task.id === id);
        this.toDoList.splice(index, 1);
    }
    checkedTask(id)
    {
        let index=this.toDoList.findIndex((task) => task.id === id);
        this.toDoList[index].check=!this.toDoList[index].check;
    }
}
class View{
constructor(){
    this.form=this.createHTMLElement('form');
    this.input=this.createHTMLElement('input');
    this.input.type="text";
    this.input.name="task";
    this.submitButton=this.createHTMLElement('button');
    this.submitButton.textContent="SUBMIT";
    this.taskList=this.createHTMLElement('ul');
    this.form.append(this.input,this.submitButton);
    this.getHTMLElement('#root').append(this.form,this.taskList);
}
createHTMLElement(tagName,className)
{
    let element = document.createElement(tagName);
    if(className) element.className=className;
    return element;
}
getHTMLElement(selector)
{
    let element = document.querySelector(selector);
    return element;
}
get todoText() {
    return this.input.value;
  }
resetInput() {
    this.input.value = '';
}
displayElements(toDoList)
{
    while (this.taskList.firstChild) {
        this.taskList.removeChild(this.taskList.firstChild)
      }     
    toDoList.forEach((task)=>{
    let li=this.createHTMLElement('li');
    li.id=task.id;
    let checkbox=this.createHTMLElement('input');
    checkbox.type="checkbox";
    checkbox.checked=task.check;
    let span=this.createHTMLElement('span','editable');
    span.textContent=task.task;
    span.contentEditable=true;
    let deleteButton=this.createHTMLElement('button','delete');
    deleteButton.textContent="DELETE";
    li.append(checkbox,span,deleteButton);
    this.taskList.append(li);});
}
bindAddTask(handler)
{
    this.form.addEventListener('submit', (event) => {
        event.preventDefault();
    
        if (this.todoText) {
          handler(this.todoText);
          this.resetInput();
        }
      })
}
bindDeleteTask(handler)
{
    this.taskList.addEventListener('click', (event) => {
        if (event.target.className === 'delete') {
          const id = parseInt(event.target.parentElement.id);
          handler(id);
        }
      })
}
bindCheckedTask(handler)
{
    this.taskList.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
          const id = parseInt(event.target.parentElement.id);
          handler(id);
        }
      })    
}
}
class Controller{
  constructor(model,view){
    this.model=model;
    this.view=view;
    this.getTaskList(this.model.toDoList);
    this.view.bindAddTask(this.handleAddTask);
    this.view.bindCheckedTask(this.handleCheckedTask);
    this.view.bindDeleteTask(this.handleDeleteTask);
  }
  getTaskList=(task)=>{
    this.view.displayElements(task);
  }
  handleAddTask=(task)=>{
    this.model.addItem(task);
  }
  handleDeleteTask=(id)=>{
    this.model.deleteTask(id);
  }
  handleEditTask=(id,task)=>{
    this.model.editTask(id,task);
  }
  handleCheckedTask=(id)=>{
    this.model.checkedTask(id);
  }
}
let controllerObject=new Controller(new Model(),new View());