import {Component, EventEmitter, Input, OnInit, Output, Type} from '@angular/core';
import {BlogService} from "../../../Services/BlogService/blog.service";
import {Blog} from "../../../models/Blog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { Status } from 'app/models/Status';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @Output() requested = new EventEmitter<any>();
  @Input()ctrct:any;
  blogForm: FormGroup;
  status:StatusEnum[]= [
    {value: 'Publique', viewValue: 'Publique'},
    {value: 'Privé', viewValue: 'Privé'},
  
];
  constructor(private cService: BlogService, private _formBuilder:FormBuilder,private _routerUp: Router) { }

  ngOnInit(): void {


    this.blogForm = this._formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      status: ['', Validators.required],
     
    })


  }

  updateBlog(c:Blog){
    console.log(this.ctrct.id)
    c.image='image.png';
    c.views=0;
    c.publicationDate=new Date('2023-04-22');
    this.cService.updateBlog(this.ctrct.id, c).subscribe((data)=>{
      console.log(data);
      this.reloadComponent();
      
    })
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


