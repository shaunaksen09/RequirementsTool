import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm} from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { req } from '../../req.model';
import { RequirementformService } from '../../requirementform.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  isHide = true;
  editForm: FormGroup; 
  editID = "0"
  requirements: any;
  requirementType: any[]=[{displayValue: "New",displayName:"New Automation"}, {displayValue: "Old",displayName:"Enhancement"}]
  selectedType: string;
  selectedstatus: string;
  statusOptions: any[] = [
    { value: "Active" },
    { value: "Reject" },
    { value: "In-Progress" },
    { value: "Completed" }
  ];
  Id = localStorage.getItem("id");   

  constructor(private requirementservice: RequirementformService,
    private fb: FormBuilder, 
    private router: Router) {  }

  ngOnInit(): void {     
    let Id = localStorage.getItem("id");  
    if(Id!=null)  
    {  
      this.GetDetailsbyId(Id) ;  
    } 
    this.editForm = this.fb.group({
      id: new FormControl(),
      reqname: [''],
      selectedteam: new FormControl(),
      reqteam: new FormControl(),   
      reqtype: new FormControl('New', Validators.required),   
      shortdesc: ['', [Validators.minLength(20)]],
      selectedshortdesc: new FormControl({ value: '', disabled: true}),
      automationdesc: ['', [Validators.minLength(20)]],
      workinstructiondesc: ['', [Validators.minLength(20)]],
      techdetailsdesc: ['', [Validators.minLength(20)]],
      business: [''],
      time: [''],
      cost: [''],
      effort: [''],
      comments: '',
      eta: '',
      poc: '',
      status: ['', Validators.required]
    });
  }  

  
  GetDetailsbyId(id: string) { 
    this.requirementservice
    .getDetailsbyId(id)
    .subscribe((data: any) => {
      this.requirements = data;
      // console.log('Data requested...');
      this.editForm.controls['reqname'].setValue(data.reqname);
      this.editForm.controls['reqteam'].setValue(data.reqteam);
      this.editForm.controls['selectedteam'].setValue(data.selectedteam);
      this.editForm.controls['reqtype'].setValue(data.reqtype);
      this.editForm.controls['shortdesc'].setValue(data.shortdesc);
      this.editForm.controls['selectedshortdesc'].setValue(data.selectedshortdesc);
      this.editForm.controls['automationdesc'].setValue(data.automationdesc); 
      this.editForm.controls['workinstructiondesc'].setValue(data.workinstructiondesc);
      this.editForm.controls['techdetailsdesc'].setValue(data.techdetailsdesc);
      this.editForm.controls['business'].setValue(data.business);
      this.editForm.controls['time'].setValue(data.time);
      this.editForm.controls['cost'].setValue(data.cost); 
      this.editForm.controls['effort'].setValue(data.effort);      
      this.editForm.controls['poc'].setValue(data.poc);
      this.editForm.controls['eta'].setValue(data.eta); 
      this.editForm.controls['comments'].setValue(data.comments); 
      this.editForm.controls['status'].setValue(data.status); 
      console.log("file data",this.requirements)
      if(Array.isArray(this.requirements.file.data) && this.requirements.file.data.length >0){
        console.log("true")
        console.log("file data",this.requirements.file.data)
        // this.editForm.controls['file'].setValue(data.file); 
        this.isHide = false;
      }
    });    
  }
  
  updateDetails(form: NgForm){
    this.requirementservice
    .updateDetails(this.Id, form)
    .subscribe(()=>{
      console.log(form);
      alert("Form updated successfully...!") 
      this.router.navigate(['/list'])
    });
  }

  download(){
    this.requirementservice
    .downloadFile(this.Id)
    .subscribe((res) =>{
        // let blob = new Blob([res]);
        console.log(res)
        // let url = window.URL.createObjectURL(blob);
        // let pwa = window.open(url);
        // if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        //     alert( 'Please disable your Pop-up blocker and try again.');
        // }
    });
  }



  back(){
    this.router.navigate(['/list']);    
  }
}
