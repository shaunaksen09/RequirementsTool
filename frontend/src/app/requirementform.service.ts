import { Injectable, ɵSWITCH_ELEMENT_REF_FACTORY__POST_R3__ } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ɵangular_packages_forms_forms_t, NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequirementformService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  login(userCredential) {
    return this.http.post(`${this.uri}/reqdetails/login`, userCredential)
                    .pipe(map((user:any) => {
                      // console.log(user)
                      return user;
                  }));
  }

  getDetails() {
    return this.http.get(`${this.uri}/reqdetails`)
                    .pipe(map((res:any) =>{      
                      return res.data
                    }));
  }

  getDetailsbyId(id) {
    return this.http.get(`${this.uri}/reqdetails/${id}`)
                    .pipe(map((res:any) =>{      
                      return res.data
                    }));
  }

  getShortDescDetails(reqteam){
    return this.http.get(`${this.uri}/reqdetails/${reqteam}`)
                    .pipe(map(res => {                      
                      return res;
                  }));
  }

  getShortDescByTeam(reqteam){
    return this.http.get(`${this.uri}/reqdetails/find/${reqteam}`)
    .pipe(map((res:any) =>{      
      return res.data
    }));
  
  }

  getShortDescBySelectedTeam(selectedteam){    
    return this.http.get(`${this.uri}/reqdetails/select/${selectedteam}`)
    .pipe(map((res:any) =>{
      return res.data
    }));
  } 
  
  addDetails(formdetails){
    return this.http.post<any>(`${this.uri}/reqdetails/add`, formdetails)
                    .pipe(map(res => {
                      console.log(res)
                      return res;
                  }));

  }

  upload(formdetails){
    return this.http.post<any>(`${this.uri}/reqdetails/upload`, formdetails)
                    .pipe(map(res => {
                      console.log(res)
                      return res;
                  }));

  }

  downloadFile(id){
    //  return this.http.get(`${this.uri}/reqdetails/download/${id}`, { responseType: 'blob'}).subscribe(res => {
    //   window.open(window.URL.createObjectURL(res));
    // });
    return this.http.get(`${this.uri}/reqdetails/download/${id}`, { responseType: 'blob'})
                    .pipe(map(res => {
                      window.open(window.URL.createObjectURL(res));
                  }));
  }  

  updateDetails(id, formdetails){
    return this.http.put(`${this.uri}/reqdetails/update/${id}`, formdetails)
                    .pipe(map(res => {
                      console.log(res)
                      return res;
                  }));
  }
  
  deleteDetails(id){
    return this.http.delete(`${this.uri}/reqdetails/delete/${id}`)
                    .pipe(map(res => {
                      console.log(res)
                      return res;
                  }));
  }  
}
