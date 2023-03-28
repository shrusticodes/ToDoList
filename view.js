export class View{
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