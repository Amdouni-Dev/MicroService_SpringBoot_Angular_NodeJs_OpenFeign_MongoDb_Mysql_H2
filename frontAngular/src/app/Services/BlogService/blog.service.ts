import { Injectable } from '@angular/core';
import {Blog} from "../../models/Blog";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogs:Blog[]=[];
  urlApi=environment.baseUrl+'blogs';  
  url='http://localhost:8085/blogs';  
 
  constructor(private http: HttpClient) { }

  /********************************Add Blog************************************/
  saveBlog(blog: Blog):Observable<Blog>{
    console.log("save ok ");
    return this.http.post<Blog>(this.url +'/', blog);
    
  }

  /********************************Delete Blog************************************/
  deleteBlog(id:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {responseType: 'text'});
  }

  /********************************Get Blogs************************************/
  getAllBlogs(): Observable<Blog[]>{
 
    return this.http.get<Blog[]>(this.urlApi+'/') 
    }

  /********************************Update Blog************************************/
  updateBlog(id:number, d:any):Observable<any>{
    return this.http.put<Blog>(this.url+"/"+id, d);
  }
}
