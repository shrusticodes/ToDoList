let arr=new Array();
function tasks(id,task,isChecked){
    this.id=id;
    this.task=task;
    this.isChecked=isChecked;
}
function submit(){
    if(document.querySelector('#newtask textarea').value==""){
        alert("Kindly Enter Task Name")
    }
    else{
        let obj;
        let objID=Math.floor((Math.random() * 1000) + 1);
        let text=`${document.querySelector('#newtask textarea').value}`;
        let truthOrFalse=arr.find((o)=>o.task==text);
        if(truthOrFalse)
        alert("Same task name");
        else{
        obj=new tasks(objID,`${document.querySelector('#newtask textarea').value}`,false);
        arr.push(obj);
        display(objID);
        console.log(arr);
        onChecked(objID);
        deleteTask();
        edit();
    }
}
}
function display(id){
        // let div1=document.getElementById('newtask');
        let task=document.getElementById('tasks');
        let div=document.createElement('div');
        div.className="task";
        let button=document.createElement('button');
        button.className="delete"
        let icon=document.createElement('i');
        icon.className="far fa-trash-alt"
        let button1=document.createElement('button');
        button1.className="edit"
        let icon1=document.createElement('i');
        icon1.className="far fa-edit"
        // let button3=document.createElement('button');
        // button3.className="filter"
        // button3.innerText="Filter"
        let check=document.createElement('input');
        check.type="checkbox";
        check.value=`${document.querySelector('#newtask textarea').value}`;
        check.className="check";
        let span=document.createElement('span');
        span.id=id;
        let span1=document.createElement('span');
        let textNode=document.createTextNode(`${document.querySelector('#newtask textarea').value}`);
        document.querySelector('#newtask textarea').value="";
        span1.appendChild(check);
        span.appendChild(textNode);
        div.appendChild(span);
        button.appendChild(icon);
        button1.appendChild(icon1);
        // div1.appendChild(button3);
        span1.appendChild(button);
        span1.appendChild(button1);
        div.appendChild(span1);
        task.appendChild(div);
}
function edit()
{ 
    const newDiv=document.querySelector("#newtask");       
    let submit=document.getElementById('push');
    let edit_tasks=document.querySelectorAll(".edit");
    let update=document.createElement('button');
    update.innerText = "Update";
    let i;
    for (i = 0; i < edit_tasks.length; i++) {
        edit_tasks[i].onclick = (function(i) {
          return function() {
            document.querySelector('#newtask textarea').value = this.parentElement.previousElementSibling.innerText;
            let id = this.parentElement.previousElementSibling.id;
            divs.replaceChild(update, submit);
            update.onclick = function() {
              taskEdit(id);
              let spanElement = document.querySelectorAll('.task span:first-child');
              spanElement[i].textContent = `${document.querySelector('#newtask textarea').value}`;
              newDiv.replaceChild(submit,update);
            }
          }
        })(i)
       }   
}
function deleteTask(){
    var current_tasks = document.querySelectorAll(".delete");
        for(var i=0; i<current_tasks.length; i++){
        current_tasks[i].onclick = function(){
        let id=this.parentElement.previousElementSibling.id;
        arrayDelete(id);
        this.parentElement.parentElement.remove();
        }
    }
}
function arrayDelete(id)
{
   let index=arr.findIndex((o)=>o.id==id);
   arr.splice(index,1);
}
function onChecked(objID)
{
var checkedtask = document.querySelectorAll('.check');
for (var i = 0; i < checkedtask.length; i++) {
checkedtask[i].onclick= (function(i) {
    return function(){
    handleCheck(this,i);}
})(i);
}
}
function handleCheck(element,i) 
{
    if (element.checked == true) {
        arr[i].isChecked=true;
    }
    else {
         arr[i].isChecked=false;
        }
}
function taskEdit(id)
{
    let index=arr.findIndex((o)=>o.id==id); 
    arr[index].task=`${document.querySelector('#newtask textarea').value}`;
    console.log(arr);
}