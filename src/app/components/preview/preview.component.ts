import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {Location} from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  createFormData: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _location: Location) { }

  ngOnInit(): void {

    // this.route.queryParams.subscribe((params) =>{
    //   this.createFormData =JSON.parse(params.formData)
    // }) 
    
    console.log(JSON.parse(sessionStorage.getItem('formData')))
    
    JSON.parse(sessionStorage.getItem('formData')) 
    ? 
    this.createFormData = JSON.parse(sessionStorage.getItem('formData'))
    :
    null;
  }
  ngOnDestroy(){
    sessionStorage.removeItem('formData');
  }

  backClicked() {
    this._location.back();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
    this._location.back();
  }

}
