import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  taskObj : Task = new Task();
  pendingTasks : Task[] = [];
  addTaskValue : string = '';
  editTaskValue : string = '';
  completedTasks: Task[] = [];
  deleteTaskValue: string= '';

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    const pendingTasks = localStorage.getItem('pendingTasks') ? JSON.parse(localStorage.getItem('pendingTasks') || '{}') : [];
    if(pendingTasks){
      this.pendingTasks = pendingTasks.filter((a:Task) => a.status === "pending");
    }

    const completedTasks = localStorage.getItem('completedTasks') ? JSON.parse(localStorage.getItem('completedTasks') || '{}') : [];
    if(completedTasks){
      this.completedTasks = completedTasks.filter((a:Task) => a.status === "completed");
    }

  }
 

  addTask(){
    this.taskObj.task_name = this.addTaskValue
    const newTask = this.crudService.addTask(this.taskObj);
    this.pendingTasks.push(newTask);
    this.taskObj = new Task();

    localStorage.setItem('pendingTasks', JSON.stringify(this.pendingTasks));

  }
  edittask(){
    this.taskObj.task_name= this.editTaskValue;
    this.crudService.editTask(this.taskObj);
    this.taskObj = new Task();
    localStorage.setItem('pendingTasks', JSON.stringify(this.pendingTasks));
  }

  deleteTask(task: Task){ 
    this.pendingTasks =  localStorage.getItem('pendingTasks') ? JSON.parse(localStorage.getItem('pendingTasks') || '{}') : [];
    const newListOfTask = this.pendingTasks.filter(a => a.id !== task.id);
    this.pendingTasks = newListOfTask;
    localStorage.removeItem('pendingTasks');
    localStorage.setItem('pendingTasks', JSON.stringify(this.pendingTasks));

    // this.pendingTasks = this.pendingTasks.splice(this.pendingTasks.indexOf(task), 1);
    // localStorage.removeItem('pendingTasks');
    // localStorage.setItem('pendingTasks', JSON.stringify(this.pendingTasks));
    //this.crudService.deleteTask(task);
    //alert ("clicked");
// perform delete operation in angular typescript file


  }

  done(task: Task){
    this.pendingTasks =  localStorage.getItem('pendingTasks') ? JSON.parse(localStorage.getItem('pendingTasks') || '{}') : [];
    const newListOfTask = this.pendingTasks.filter(a => a.id !== task.id);
    this.pendingTasks = newListOfTask;
    localStorage.removeItem('pendingTasks');
    localStorage.setItem('pendingTasks', JSON.stringify(this.pendingTasks));

    //setting completed tasks in localstorage
    task.status = "completed";
    this.completedTasks.push(task);
    localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
    this.completedTasks = localStorage.getItem('completedTasks') ? JSON.parse(localStorage.getItem('completedTasks') || '{}') : [];

    this.pendingTasks =  localStorage.getItem('pendingTasks') ? JSON.parse(localStorage.getItem('pendingTasks') || '{}') : [];

  }

  deletecompletedTask(task : Task){
    this.completedTasks =  localStorage.getItem('completedTasks') ? JSON.parse(localStorage.getItem('completedTasks') || '{}') : [];
    const newListOfTask = this.completedTasks.filter(a => a.id !== task.id);
    this.completedTasks = newListOfTask;
    localStorage.removeItem('completedTasks');
    localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
  }


  call(etask: Task){
    this.taskObj= etask;
    this.editTaskValue= etask.task_name;
  }

}
