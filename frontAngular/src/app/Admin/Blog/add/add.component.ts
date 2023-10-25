import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Blog } from 'app/models/Blog';
import { BlogService } from 'app/Services/BlogService/blog.service';
import { ListOfBlogsComponent } from '../list-of-blogs/list-of-blogs.component';
import { Router } from '@angular/router';
import { Status } from 'app/models/Status';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  blogForm: FormGroup;
  blog:Blog;

  status:StatusEnum[]= [
    {value: 'Publique', viewValue: 'Publique'},
    {value: 'Privé', viewValue: 'Privé'},
  
];
selected: Date | null;
    @Output()list=new EventEmitter()

  constructor(private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<ListOfBlogsComponent>,
              private serviceC:BlogService,private _routerUp: Router) { }

    blogs:Blog[]=[]


  ngOnInit(): void {
      this.serviceC.getAllBlogs().subscribe((data)=>{
          console.log(data)
      })

      this.blogForm = this._formBuilder.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
        status: ['', Validators.required],
       
      })


  }

  submit(f:any){
      this.blog=f;
      this.blog.image='image.png';
      this.blog.views=0;
      this.blog.publicationDate=new Date('2023-04-22');
     this.serviceC.saveBlog(this.blog).subscribe((c)=>{
         this.list.emit(this.blog);
         this.reloadComponent()
         console.log("Success !", c)
     });
      this.dialogRef.close()
      console.log('A new blog added to the database');
      console.log("*****",f)
      this.dialogRef.close(`${f}`);
  }
  reloadComponent() {
    this._routerUp.routeReuseStrategy.shouldReuseRoute = () => false;
    this._routerUp.onSameUrlNavigation = 'reload';
    this._routerUp.navigate(['/Blog']);

}


}
interface StatusEnum {
  value: string;
  viewValue: string;
}

