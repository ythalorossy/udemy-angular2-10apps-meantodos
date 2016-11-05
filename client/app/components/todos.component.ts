/**
 * Created by yross on 09/10/16.
 */
import { Component } from '@angular/core';

import { Todo } from "../shared/Todo";
import { TodoService } from "../services/todo.service";

@Component({
    moduleId: module.id,
    selector: 'todos',
    templateUrl: 'todos.component.html'
})
export class TodosComponent {

    private todos: Todo[];

    constructor (private _todoService: TodoService) {
    }

    ngOnInit(): void {
        this.todos = [];
        this._todoService
            .getTodos()
            .subscribe(todos => this.todos = todos);
    }

    addTodo (event: any, todoText) {
        let result;
        var newTodo: Todo = {
            _id: '',
            text : todoText.value,
            isCompleted: false
        };

        result = this._todoService.saveTodo(newTodo);

        result.subscribe( res => {
            console.log(res);
            this.todos.push(newTodo);
            todoText.value = '';
        })
    }

    setEditState(todo, state) {
        if (state) {
            todo.isEditMode = state;
        } else {
            delete todo.isEditMode;
        }
    }

    updateState(todo: Todo) {
        var _todo = {
            _id: todo._id,
            text: todo.text,
            isCompleted: !todo.isCompleted
        };

        this._todoService.updateTodo(_todo)
            .subscribe( data => {
                todo.isCompleted = !todo.isCompleted;
            })
    }

    updateTodoText(event, todo: Todo) {
        if (event.which === 13) {
            todo.text = event.target.value;
            let _todo: Todo = {
                _id: todo._id,
                text: todo.text,
                isCompleted: todo.isCompleted
            };

            this._todoService.updateTodo(_todo)
                .subscribe(data => {
                   this.setEditState(todo, false);
                });
        }
    }

    deleteTodo(todo: Todo) {

        let todos = this.todos;

        this._todoService.deleteTodo(todo._id)
            .subscribe(data => {
                if (data.n == 1) {
                    for (let i = 0; i < todos.length; i++){
                        if (todos[i]._id == todo._id) {
                            todos.splice(i, 1);
                            break;
                        }
                    }
                }
            });
    }

}
