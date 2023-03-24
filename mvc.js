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
let m=new Model();
class View{
constructor(){
    this.mainDiv=this.getHTMLElement('#root');
    this.title=this.createHTMLElement('h1');
    this.title.textContent="To Do List";
    this.form=this.createHTMLElement('form');
    this.input=this.createHTMLElement('input');
    this.input.type="text";
    this.input.name="task";
    this.submitButton=this.createHTMLElement('button');
    this.submitButton.textContent="SUBMIT";
    this.taskList=this.createHTMLElement('ul');
    this.form.append(this.input,this.submitButton);
    this.mainDiv.append(this.title,this.form,this.taskList);
}
createHTMLElement(tagName)
{
    let element = document.createElement(tagName);
    return element;
}
getHTMLElement(selector)
{
    let element = document.querySelector(selector);
    return element;
}
displayElements()
{
    while (this.taskList.firstChild) {
        this.taskList.removeChild(this.taskList.firstChild)
      }     
    m.toDoList.forEach((task)=>{
    let li=this.createHTMLElement('li');
    li.id=task.id;
    let checkbox=this.createHTMLElement('input');
    checkbox.type="checkbox";
    checkbox.checked=task.check;
    let span=this.createHTMLElement('span');
    span.textContent=task.task;
    span.contentEditable=true;
    let deleteButton=this.createHTMLElement('button');
    deleteButton.textContent="DELETE";
    li.append(checkbox,span,deleteButton);
    this.taskList.append(li);});
}
}
let v=new View();