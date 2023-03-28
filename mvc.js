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
      let toDoObject={id:Math.floor(Math.random() * 1000 + 1),task:currentTask,check:false};
      this.toDoList.push(toDoObject);
      this.getTaskList(this.toDoList);
    }
    editTask(id,updatedTask)
    {
        let index = this.toDoList.findIndex((task) => task.id === id);
        this.toDoList[index].task=updatedTask;
        this.getTaskList(this.toDoList);
    }
    deleteTask(id)
    {
        let index = this.toDoList.findIndex((task) => task.id === id);
        this.toDoList.splice(index, 1);
        this.getTaskList(this.toDoList);
    }
    checkedTask(id)
    {
        let index=this.toDoList.findIndex((task) => task.id === id);
        this.toDoList[index].check=!this.toDoList[index].check;
        this.getTaskList(this.toDoList);
    }
    passToDoListChanges(callback){
      this.getTaskList=callback;
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
    this.temporaryToDo;
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
    console.log(toDoList);
}
passAddTaskValue(handler)
{
    this.form.addEventListener('submit', (element) => {
        element.preventDefault();
    
        if (this.todoText) {
          handler(this.todoText);
          this.resetInput();
        }
      });
}
passDeleteTaskValue(handler)
{
    this.taskList.addEventListener('click', (element) => {
        if (element.target.className === 'delete') {
          const id = parseInt(element.target.parentElement.id);
          handler(id);
        }
      });
}
passCheckedTaskValue(handler)
{
    this.taskList.addEventListener('change', (element) => {
        if (element.target.type === 'checkbox') {
          const id = parseInt(element.target.parentElement.id);
          handler(id);
        }
      });  
}
passEditTaskValue(handler)
{
  this.taskList.addEventListener("input",(element)=>{
    if(element.target.className ==="editable") 
    this.temporaryToDo = element.target.innerText;
  });
  this.taskList.addEventListener('focusout',(element)=>{
    if(this.temporaryToDo){
      let id = parseInt(element.target.parentElement.id);
      handler(id,this.temporaryToDo);
      this.temporaryToDo='';
    }
  });
}
}
class Controller{
  constructor(model,view){
    this.model=model;
    this.view=view;
    this.getTaskList(this.model.toDoList);
    this.view.passAddTaskValue(this.handleAddTask);
    this.view.passCheckedTaskValue(this.handleCheckedTask);
    this.view.passDeleteTaskValue(this.handleDeleteTask);
    this.view.passEditTaskValue(this.handleEditTask);
    this.model.passToDoListChanges(this.getTaskList);
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
new Controller(new Model(),new View());