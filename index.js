let arr=new Array();
let chArr=new Array();
function tasks(id,task){
    this.id=id;
    this.task=task;
}
function submit(){
    if(document.querySelector('#newtask textarea').value==""){
        alert("Kindly Enter Task Name")
    }
    else{
        let obj;
        let objID=Math.floor((Math.random() * 1000) + 1);
        let text=`${document.querySelector('#newtask textarea').value}`;
        let tof=arr.find((o)=>o.task==text);
        if(tof)
        alert("Same task name");
        else{
        obj=new tasks(objID,`${document.querySelector('#newtask textarea').value}`);
        arr.push(obj);
        display(objID);
        console.log(arr);
        checked();
        deleteTask();
        edit();
    }
}
}
function display(id){
        let task=document.getElementById('tasks');
        let div=document.createElement('div');
        div.className="task";
        let but=document.createElement('button');
        but.className="delete"
        let icon=document.createElement('i');
        icon.className="far fa-trash-alt"
        let but1=document.createElement('button');
        but1.className="edit"
        let icon1=document.createElement('i');
        icon1.className="far fa-edit"
        let check=document.createElement('input');
        check.type="checkbox";
        check.value=`${document.querySelector('#newtask textarea').value}`;
        check.className="check";
        let span=document.createElement('span');
        span.id=id;
        let span1=document.createElement('span');
        let t=document.createTextNode(`${document.querySelector('#newtask textarea').value}`);
        document.querySelector('#newtask textarea').value="";
        span1.appendChild(check);
        span.appendChild(t);
        div.appendChild(span);
        but.appendChild(icon);
        but1.appendChild(icon1);
        span1.appendChild(but);
        span1.appendChild(but1);
        div.appendChild(span1);
        task.appendChild(div);
}
function edit()
{ 
    const divs=document.querySelector("#newtask");       
    let submit=document.getElementById('push');
    var edit_tasks=document.querySelectorAll(".edit");
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
              divs.replaceChild(submit,update);
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
   let m=arr.findIndex((o)=>o.id==id);
   let n=chArr.findIndex((o)=>o===arr[m].task)
   chArr.splice(n,1);
   arr.splice(m,1);
   console.log(chArr);
}
function checked()
{
var checkedtask = document.querySelectorAll('.check');
for (var i = 0; i < checkedtask.length; i++) {
checkedtask[i].onclick= function() {
handleCheck(this);};
}
}
function handleCheck(element) 
{
    if (element.checked == true) {
       chArr.push(element.value);
       console.log(chArr);
    }
    else{
         let m=chArr.findIndex((o)=>(o===element.value));
         chArr.splice(m,1);
         console.log(chArr);
        }
}
function taskEdit(id)
{
    let m=arr.findIndex((o)=>o.id==id); 
    arr[m].task=`${document.querySelector('#newtask textarea').value}`;
    console.log(arr);
}


// function checked()
// {
//     var checkedtask=document.querySelectorAll('.check');
//     for(var i=0;i<checkedtask.length;i++)
//     {
//     checkedtask[i].onclick=function(){
//     if(checkedtask[i].check==true){
//     ids.forEach((o)=>{let checkbox=document.getElementById(o).value;
//     chArr.push(checkbox);
//     console.log(chArr);})
//     }
// function checked(id){
//     var checkedtask= document.querySelectorAll(".check");
//     console.log(checkedtask)
//     for(var i=0; i<checkedtask.length; i++){
//         if(checkedtask[i].checked==true)
//         {
//             let checkbox=document.getElementById(id);
//             chArr.push(checkbox.textContent);
//             console.log(chArr);
//         }
//     }
// }
 // document.querySelector('#tasks').innerHTML += `
        //     <div class="task">
        //         <span id="taskname">
        //             ${document.querySelector('#newtask textarea').value}
        //         </span>
        //         <button class="delete">
        //         <i class="far fa-trash-alt"></i>
        // //         </button>
        // <input type="checkbox" checked="checked">
        // <span class="geekmark"></span>
        //     </div>
        // `;

         // var current_tasks = document.querySelectorAll(".delete");
        // for(var i=0; i<current_tasks.length; i++){
        //     current_tasks[i].onclick = function(){
        //         this.parentElement.parentElement.remove();
        //     }
        // }