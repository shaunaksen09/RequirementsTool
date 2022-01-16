import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { req } from '../../req.model';
import { RequirementformService } from '../../requirementform.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  requirements: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['reqname', 'reqteam', 'reqtype', 'shortdesc', 'status', 'actions'];  
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }
  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }
  

  constructor(private requirementservice: RequirementformService, private router: Router) { }

  ngOnInit(){
    localStorage.clear();
    this.fetchRequirementDetails();       
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  fetchRequirementDetails(){
    this.requirementservice
    .getDetails()
    .subscribe((res: any) => {
      this.dataSource.data = res;
      console.log('Data requested...');      
    })
  }

  editDetails(id: any){
    console.log(id);
    localStorage.removeItem("id");  
    localStorage.setItem("id",id.toString());  
    this.router.navigate(['/edit'], { queryParams: { Id: id } });      
  }

  deleteDetails(id:any){
    if (confirm("Are You Sure To Delete this Informations")) { 
      this.requirementservice.deleteDetails(id)
      .subscribe(() => { 
          this.fetchRequirementDetails(); 
          alert("Deleted Successfully");
          this.router.navigate(['/list'])  
        }  
      );  
    }    
  }
}
