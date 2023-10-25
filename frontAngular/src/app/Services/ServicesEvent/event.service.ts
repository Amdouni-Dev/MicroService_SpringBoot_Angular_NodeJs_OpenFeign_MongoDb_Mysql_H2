import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from 'app/models/Event';
import {catchError, delay, Observable, of, retry, throwError} from 'rxjs';
//import { getSystemErrorMap } from 'util'; 
import {NgForm} from '@angular/forms';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
//import * as http from 'http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  equipes:Event[]=[];

  constructor(private http: HttpClient) { }

  /********************************Add Equipe************************************/
  saveEvent(event: Event):Observable<Event>{
    return this.http.post<Event>("http://localhost:8040/events/saveEvent", event);
  }

 

  /********************************Get Equipe************************************/
  getEquipes(): Observable<Event[]>{
    console.log("Get Equipes********************************")
    return this.http.get<Event[]>("http://localhost:8090/events/getAll/")

  }

  /********************************Update Equipe************************************/
  updateEvent(id:number, d:any):Observable<any>{
    return this.http.put<Event>("http://localhost:8040/events/"+id, d);


  }

   /********************************Delete Equipe************************************/
   deleteEquipe(id:number):Observable<any>{
    return this.http.delete("http://localhost:8040/events/"+id , {responseType: 'text'} );
  }
}
