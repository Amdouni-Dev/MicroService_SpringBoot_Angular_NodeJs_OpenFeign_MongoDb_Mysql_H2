import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from 'app/models/Organization';
import { environment } from 'environments/environment';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class OrganizationserviceService {
  organizations:Organization[]=[];
  url='http://localhost:8083/organizations';
  urlApi = environment.baseUrl+'organizations';
  constructor(private http: HttpClient) { }

  /********************************Add Organization************************************/
  saveOrganization(organization: Organization):Observable<Organization>{
    return this.http.post<Organization>(this.url +'/', organization);
  }

 

  /********************************Get Organization************************************/
  getOrganizations(): Observable<Organization[]>{
    return this.http.get<Organization[]>(this.urlApi+'/') 
  
  }

  /********************************Update Organization************************************/
  updateOrganization(id:number, d:any):Observable<any>{
    return this.http.put<Organization>(this.url+"/"+id, d);


  
  }

   /********************************Delete Organization************************************/
   deleteOrganization(id:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {responseType: 'text'});
  }
}
