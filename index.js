function submit(){
    if(document.querySelector('#newtask textarea').value==" "){
        alert("Kindly Enter Task Name!!!!")
    }

    else{
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
        let span=document.createElement('span');
        let span1=document.createElement('span');
        let t=document.createTextNode(`${document.querySelector('#newtask textarea').value}`);
        document.querySelector('#newtask textarea').value=" ";
        span.appendChild(t);
        div.appendChild(span);
        but.appendChild(icon);
        but1.appendChild(icon1);
        span1.appendChild(check);
        span1.appendChild(but);
        span1.appendChild(but1);
        div.appendChild(span1);
        task.appendChild(div);
        var current_tasks = document.querySelectorAll(".delete");
        for(var i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentElement.parentElement.remove();
            }
        }
        var edit_tasks=document.querySelectorAll(".edit");
        for(var i=0;i<edit_tasks.length;i++){
            edit_tasks[i].onclick=function()
            {
                document.querySelector('#newtask textarea').value=this.parentElement.previousElementSibling.innerHTML;
                this.parentElement.parentElement.remove();
            }
        }
    }
}








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