import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL: string;
  constructor(private http: HttpClient) { 

    this.serviceURL="http://localhost:3000/tasks"
  }

  addTask(task:Task): Task {
    // return this.http.post<Task>(this.serviceURL,task);
    let randomNumber = Math.floor((Math.random() * 10) + 1);;
    task.id = randomNumber;
    return task;
  }

  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL);
  }

  deleteTask(task:Task) {
    
    //return this.http.delete<Task>(this.serviceURL+'/'+task.id);
  }

  editTask(task:Task): Observable<Task> {
    return this.http.put<Task>(this.serviceURL+'/'+task.id,task);
  }
}
