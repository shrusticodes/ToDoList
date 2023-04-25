import {Model} from "./model.js";
import {View} from "./view.js";
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
new Controller(new Model("local"),new View());