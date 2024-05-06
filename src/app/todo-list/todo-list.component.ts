import { Component,OnInit } from '@angular/core';
import { Todo } from '../todo';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent  implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';
  constructor(private firestore : AngularFirestore) {}
  ngOnInit(){
    this.firestore.collection('todos').valueChanges().subscribe(data => {
      this.todos = data as Todo[];
    })
  }
  addTodo() {
    if(this.newTodoTitle.trim() != ''){
      const newTodo :Todo ={
        id:this.firestore.createId(),
        title: this.newTodoTitle.trim(),
        completed: false,
        editing: false 
      };
      this.firestore.collection('todos').add(newTodo);
      this.newTodoTitle = '';
    }
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    this.firestore.collection('todos').doc(todo.id).update({ completed: todo.completed });
  }

  editTodo(todo: Todo) {
    todo.editing = true;
    todo.newTitle = todo.title;
  }

  saveEditedTodo(todo: Todo) {
    if (todo.newTitle !== undefined && todo.newTitle.trim() !== '') {
      todo.title = todo.newTitle;
      todo.editing = false;
      this.firestore.collection('todos').doc(todo.id).update({ title: todo.title });
    }
  }
  

  cancelEdit(todo: Todo) {
    todo.editing = false;
  }
  deleteTodo(todo:Todo){
    this.todos = this.todos.filter(item => item !== todo);
    this.firestore.collection('todos').doc(todo.id).delete();
  }
}
