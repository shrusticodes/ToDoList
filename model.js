export class Model{
//   constructor(){
//       this.toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
//   }
constructor(key) {
    if (key === 'local') {
      this.storage = localStorage;
    } else if (key === 'session') {
      this.storage = sessionStorage;
    } 
    this.toDoList = JSON.parse(this.storage.getItem('toDoList')) || [];
  }
  
  _commit(toDoList) {
    this.onTodoListChanged(toDoList);
    this.storage.setItem('toDoList', JSON.stringify(toDoList));
  }
  
  addItem(currentTask) {
      let toDoObject = { id: Math.floor(Math.random() * 1000 + 1), task: currentTask, check: false };
      this.toDoList.push(toDoObject);
      this._commit(this.toDoList);
  }
  
  editTask(id, updatedTask) {
      let index = this.toDoList.findIndex((task) => task.id === id);
      this.toDoList[index].task = updatedTask;
      this._commit(this.toDoList);
  }
  
  deleteTask(id) {
      let index = this.toDoList.findIndex((task) => task.id === id);
      this.toDoList.splice(index, 1);
      this._commit(this.toDoList);
  }
  
  checkedTask(id) {
      let index = this.toDoList.findIndex((task) => task.id === id);
      this.toDoList[index].check = !this.toDoList[index].check;
      this._commit(this.toDoList);
  }
  
  passToDoListChanges(callback) {
      this.onTodoListChanged = callback;
  }
}