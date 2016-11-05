import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

import {Todo} from "../shared/Todo";

@Injectable()
export class TodoService {
    constructor (private _http: Http) {
    }

    getTodos(): Observable<Todo[]> {
        return this._http
            .get('/api/v1/todos')
            .map( res => res.json());
    }

    saveTodo(todo: Todo) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post('/api/v1/todo', JSON.stringify(todo), {headers: headers})
            .map(res => res.json());
    }

    updateTodo(todo: Todo) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.put(`/api/v1/todo/${todo._id}`, JSON.stringify(todo), {headers: headers})
            .map(res => res.json());
    }

    deleteTodo(_id: string) {
        return this._http.delete(`/api/v1/todo/${_id}`)
            .map(res => res.json());
    }
}