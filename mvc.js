class Model{
    constructor(){
     this.toDoList=[
      {id:81, task:"Plant a tree", checked:false},
      {id:278, task:"Pick up the papers",checked:true},
      {id:335, task:"Run 100m", checked:false},
      {id:74, task:"Water the plants", checked:false},
      {id:95, task:"Clean the house", checked:true}]
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
        this.toDoList=this.toDoList.forEach((toDo)=>
        toDo.id===id?toDo.task=updatedTask:toDo.task);
    }
    deleteTask
}