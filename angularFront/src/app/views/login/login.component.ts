import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms'
import{ApiService} from '../../services/api/api.service';
import{LoginI} from '../../models/login.interface';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ResponseI } from 'src/app/models/response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  

  constructor(
    public ApiService: ApiService,
    public router: Router,
    public fb: FormBuilder,
    private http: HttpClient
   ) {
     
   }
   ngOnInit() {
    this.checkLocalStorage();
  }
  checkLocalStorage(){
    if(localStorage.getItem('token')){
      
      this.router.navigateByUrl('/dashboard');
    }
  }

  login() {
    var formData: any = new FormData();
    formData.append("username", this.username);
    formData.append("password", this.password);
    
    console.log(this.username)
    console.log(this.password)
    this.ApiService.login(formData).subscribe(data => {
      let dataresponse:ResponseI=data
        console.log(dataresponse.access_token)
        this.ApiService.setToken(dataresponse.access_token);
        this.ApiService.setMyUser(this.username);
        this.router.navigateByUrl('/dashboard');
    },
    error => {
      console.log(error);
    });

    
     
    
  }
}
