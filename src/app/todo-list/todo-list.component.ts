import { Component } from '@angular/core';
import { Todo } from '../todo';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent{
  todos: Todo[] = [];
  newTodoTitle: string = '';
  addTodo() {
    if (this.newTodoTitle.trim() !== '') {
      this.todos.push({
        id: this.todos.length + 1,
        title: this.newTodoTitle,
        completed: false
      });
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
