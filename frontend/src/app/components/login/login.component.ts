import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm} from '@angular/forms';
import { RequirementformService } from '../../requirementform.service';
//import { ToastrService } from 'ngx-toastr';

// import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showErrorMessage = false;
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginForm: FormGroup;
  constructor(private requirementformservice : RequirementformService, 
              private fb: FormBuilder, private router: Router) {
          this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.maxLength(50),Validators.email ]],
            // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
            password: ['',Validators.required],
          });
  }

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    this.requirementformservice.login(form)
        .subscribe(
          data => {
            console.log("Login Response: " + data.message);
              if(data.message == "User logged in successfully!")
              {
                alert("User logged in successfully!")
                this.router.navigate(['/create']);
              }
              else
              {
                alert("LDAP Error code 49!:Invalid credentials")
                this.showErrorMessage = true; 
          }},
          error => {
            console.log(`error ==> ${JSON.stringify(error)}`);
            alert("Error: "+ error)      
            this.router.navigate(['/login']);
          }
          );
  }

}