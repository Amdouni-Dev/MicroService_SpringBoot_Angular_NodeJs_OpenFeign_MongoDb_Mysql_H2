import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Object } from 'app/models/Object';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  object:Object[]=[];
  urlApi = environment.baseUrl+'api/objects';
  url='http://localhost:8082/api/objects';

  constructor(private http: HttpClient) { }

  /********************************Add Object************************************/
  saveObject(object: Object):Observable<Object>{
    return this.http.post<Object>(this.url +'/addObject', object);
  }

 

  /********************************Get Object************************************/
  getAllObjects(): Observable<Object[]>{
    return this.http.get<Object[]>(this.urlApi+'/getAllObjects') 
  
  }

  /********************************Update Object************************************/
  updateObject(id:number, d:any):Observable<any>{
    return this.http.put<Object>(`${this.url}/${id}`, d )


    
  }
  /********************************Delete Object************************************/
  deleteObject(id:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {responseType: 'text'});
  }

}


