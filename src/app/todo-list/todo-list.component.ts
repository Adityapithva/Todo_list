import { Component } from '@angular/core';
import { Todo } from '../todo';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {addDoc,collection,Firestore} from '@angular/fire/firestore';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent{
  constructor(private fs : Firestore){}
  todos: Todo[] = [];
  newTodoTitle: string = '';
  async addTodo() {
    if (this.newTodoTitle.trim() !== '') {
      const newTodo = {
        title: this.newTodoTitle,
        completed: false
      };

      // Add data to Firestore using addDoc()
      const docRef = await addDoc(collection(this.fs, 'todos'), newTodo);

      // (Optional) Update local array for immediate UI update
      this.todos.push({ ...newTodo, id: docRef.id }); // Spread operator (...) for immutability

      this.newTodoTitle = '';
    }
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  editTodo(todo: Todo) {
    if (todo.newTitle !== undefined && todo.newTitle.trim() !== '') {
      todo.title = todo.newTitle;
      todo.editing = false;
    }
  }

  saveEditedTodo(todo: Todo) {
    if (todo.newTitle !== undefined && todo.newTitle.trim() !== '') {
      todo.title = todo.newTitle;
      todo.editing = false;
    }
  }
  

  cancelEdit(todo: Todo) {
    todo.editing = false;
  }
  deleteTodo(todo:Todo){
    this.todos = this.todos.filter(item => item !== todo);
  }
}
