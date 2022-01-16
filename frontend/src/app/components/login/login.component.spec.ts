import { async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../_services/authentication.service';


describe('AuthenticationService', () => {
  beforeEach(() => {
  TestBed.configureTestingModule({
  providers: [AuthenticationService],
  imports: [ HttpClientModule ]
  });
  });
  
  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
  expect(service).toBeTruthy();
  }));
  });
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
