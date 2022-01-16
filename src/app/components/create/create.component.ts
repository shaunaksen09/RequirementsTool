import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm} from '@angular/forms';
import { MatRadioModule, MatRadioChange} from '@angular/material/radio';
//import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { RequirementformService } from '../../requirementform.service';
import { ForbiddenNameValidator } from './shared/user-name.validator';
import { Observable, throwError,BehaviorSubject, Subject, } from 'rxjs';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit{

  isDisplayed = true;
  isHidden = true;
  isHide = true;
  formData: string;
  createForm: FormGroup; 
  radioselection: string;
  @Output() change: EventEmitter<MatRadioChange> 
  selectedItem: string;
  selectedShortDescItem: string;
  requirementType: any[]=[{displayValue: "New",displayName:"New Automation"}, {displayValue: "Old",displayName:"Enhancement"}]
  selectedType: string;
  selectedFiles: File;
  
  requesterTeamOptions: any[] = [
    { value: "Deals Desk" },
    { value: "Others" }
  ];

  shortDescriptionOptions: any[] = [];
  
  constructor(
    private requirementservice: RequirementformService, 
    private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute) {

  
  this.createForm = this.fb.group({
    reqname: ['', [Validators.required, Validators.minLength(4), ForbiddenNameValidator(/password/),  ForbiddenNameValidator(/admin/),ForbiddenNameValidator(/Password/),  ForbiddenNameValidator(/Admin/)] ],   
    selectedteam: new FormControl("", Validators.required),    
    reqteam: new FormControl({ value: "", disabled: true}, [ Validators.required]),    
    reqtype: new FormControl("New", Validators.required),
    file: [''],
    shortdesc: ['', [Validators.required,Validators.minLength(20)]],
    selectedshortdesc: new FormControl({ value: "", disabled: true}),
    automationdesc: ['', [Validators.required,Validators.minLength(20)]],
    workinstructiondesc: ['', [Validators.required,Validators.minLength(20)]],
    techdetailsdesc: ['', [Validators.required,Validators.minLength(20)]],
    business: ['',Validators.required],
    time: ['', Validators.required],
    cost: ['', Validators.required],
    effort: ['', Validators.required],
    comments: '',
    eta: '',
    poc: '',

    
    previewreqname:  new FormControl({ value: "", disabled: true}),
    previewselectedteam: new FormControl({ value: "", disabled: true}),
    previewreqteam: new FormControl({ value: "", disabled: true}),
    previewreqtype: new FormControl({ value: "", disabled: true}),
    previewattachment: new FormControl({ value: "", disabled: true}),
    previewshortdesc: new FormControl({ value: "", disabled: true}),
    previewselectedshortdesc: new FormControl({ value: "", disabled: true}),
    previewautomationdesc: new FormControl({ value: "", disabled: true}),
    previewworkinstructiondesc: new FormControl({ value: "", disabled: true}),
    previewtechdetailsdesc: new FormControl({ value: "", disabled: true}),
    previewbusiness: new FormControl({ value: "", disabled: true}),
    previewtime: new FormControl({ value: "", disabled: true}),
    previewcost: new FormControl({ value: "", disabled: true}),
    previeweffort: new FormControl({ value: "", disabled: true}),
    previewcomments: new FormControl({ value: "", disabled: true}),
    previeweta: new FormControl({ value: "", disabled: true}),
    previewpoc: new FormControl({ value: "", disabled: true}),

  });
  } 
   

  onSelectionChanged({ value}){
    console.log(value);
    if (value == "Deals Desk"){      
      this.createForm.get('reqteam').disable();
      this.createForm.get('time').disable();
      this.createForm.get('effort').disable();
      this.createForm.controls['reqteam'].setValue("Deals Desk");
      this.isHidden = true;            
    }
    else {
      this.createForm.get('reqteam').enable();
      this.createForm.get('time').enable();
      this.createForm.get('effort').enable();
      this.createForm.get('cost').disable();
      this.isHidden = false;
    }
  }

  onRadioBtnChange(mrChange: MatRadioChange, selectedteam, reqteam) {
    console.log(selectedteam);    
    if(mrChange.value == "Old"){
      // this.createForm.get('shortdesc').disable();      
      this.createForm.get('selectedshortdesc').enable();   
      this.isHide = true;
      if(selectedteam == "Deals Desk"){this.getShortDescBySelectedTeam("Deals Desk")}
      else{this.getShortDescByTeam(reqteam)} 
      
    }
    if(mrChange.value == "New"){
      this.createForm.get('shortdesc').enable();
      this.createForm.get('selectedshortdesc').disable();
      this.isHide = false;      
    }
  } 

  onSelectionShortDesc({ value }){
    this.createForm.controls['shortdesc'].setValue(value);
  }

  selectFile(event) {
    if (event.target.files.length > 0) {
      this.selectedFiles = event.target.files[0];
      this.createForm.get('file').setValue(this.selectedFiles);
    }
  }

  get reqname() {
    // this.formData.append('file', this.createForm.get('profile').value);
    return this.createForm.get('reqname');
  }  
  
  get reqteam() {
    return this.createForm.get('reqteam');
  }

  get selectedteam() {
    return this.createForm.get('selectedteam');
  }

  get reqtype() {
    return this.createForm.get('reqtype');
  }

  get shortdesc() {
    return this.createForm.get('shortdesc');
  } 

  get selectedshortdesc() {
    return this.createForm.get('selectedshortdesc');
  } 

  get automationdesc() {
    return this.createForm.get('automationdesc');
  }

  get workinstructiondesc() {
    return this.createForm.get('workinstructiondesc');
  }

  get techdetailsdesc() {
    return this.createForm.get('techdetailsdesc');
  }

  get time() {
    return this.createForm.get('time');
  }

  get cost(){
    return this.createForm.get('cost');
  }

  get effort() {
    return this.createForm.get('effort');
  }

  get business() {
    return this.createForm.get('business');
  }

  get poc() {
    return this.createForm.get('poc');
  }

  get eta() {
    return this.createForm.get('eta');
  }

  get comments() {
    return this.createForm.get('comments');
  }

  getShortDescByTeam(reqteam){
    this.requirementservice.getShortDescByTeam(reqteam).subscribe((res:any)=>{      
      this.shortDescriptionOptions = res as any[];
    });
  }
  
  getShortDescBySelectedTeam(selectedteam){
    this.requirementservice.getShortDescBySelectedTeam(selectedteam).subscribe((res:any)=>{
      console.log(res as any[])
      this.shortDescriptionOptions = res as any[];
    });
  }
  private prepareSave(): any {
    let input = new FormData();
    input.append('reqname', this.createForm.get('reqname').value);
    input.append('reqteam', this.createForm.get('reqteam').value);
    input.append('selectedteam', this.createForm.get('selectedteam').value);
    input.append('reqtype', this.createForm.get('reqtype').value);
    input.append('shortdesc', this.createForm.get('shortdesc').value);
    if(this.selectedShortDescItem) {
      console.log("if selectedshotDescItem")
      input.append('selectedshortdesc', this.createForm.get('selectedshortdesc').value);
    }
    input.append('automationdesc', this.createForm.get('automationdesc').value);
    input.append('workinstructiondesc', this.createForm.get('workinstructiondesc').value);
    input.append('techdetailsdesc', this.createForm.get('techdetailsdesc').value);
    if (this.selectedItem == "Deals Desk"){
      console.log("if selectedItem")
      input.append('cost', this.createForm.get('cost').value);
    }
    input.append('time', this.createForm.get('time').value);    
    input.append('effort', this.createForm.get('effort').value);
    input.append('business', this.createForm.get('business').value);
    input.append('eta', this.createForm.get('eta').value);
    input.append('poc', this.createForm.get('poc').value);
    input.append('comments', this.createForm.get('comments').value);
    input.append('file', this.createForm.get('file').value);    
    return input;
  }

  upload(){    
    const formModel = this.prepareSave();    
    this.requirementservice
    .upload(formModel)
    .subscribe(
      (isValid)=>{
      console.log("response", isValid); 
        if(isValid){
          alert("Form submit successfully...!, DevOps Team will takecare.")
          this.router.navigate(['/logout']);
        }
        else{
          alert("Error: Form not submit, kindly check with DevOps Team.")
          this.router.navigate(['/logout']);
        }
      },  
      error => {
        console.log("Error: ", error);  
        alert("Error: " + error)                  
        this.router.navigate(['/login']);
      });
  }
  addDetails(form: NgForm){
    this.requirementservice
    .addDetails(form)
    .subscribe(
      (isValid)=>{
      console.log("response", isValid); 
        if(isValid){
          alert("Form submit successfully...!, DevOps Team will takecare.")
          this.router.navigate(['/logout']);
        }
        else{
          alert("Error: Form not submit, kindly check with DevOps Team.")
          this.router.navigate(['/logout']);
        }
      },  
      error => {
        console.log("Error: ", error);  
        alert("Error: " + error)                  
        this.router.navigate(['/login']);
      });
  }

  sumbit(form: NgForm){
    console.log(this.selectedFiles)
    if(!this.selectedFiles)
    { 
      this.addDetails(form);
      
    }
    else{
      // console.log(this.selectedFiles)
      this.upload()
    }
  }
 
  ngOnInit(): void {  }

  onSubmit() {
    console.log(this.createForm.value);
  }
  
  previewCall(){
    let createFormData = this.createForm.value;
    // this.router.navigate(['./preview'],{
    //   queryParams:{formData:JSON.stringify(createFormData)}
    // });
    sessionStorage.setItem('formData', JSON.stringify(createFormData));
    this.router.navigate(['/preview']);
  }

  get createFormValue()
  {
    
    return this.createForm.value;
  }
    

  showMe(form: NgForm)
  {
    console.log(form);
      if(this.isDisplayed)
      {this.isDisplayed = false;}
      else
      {this.isDisplayed = true;}         
  }
  reset(){    
    this.router.navigate(['/create']);
  }

 }
