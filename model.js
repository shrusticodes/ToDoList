export class Model{
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