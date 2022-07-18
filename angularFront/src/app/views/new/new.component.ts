// register.component.ts

import { Component } from "@angular/core";
import{ApiService}from "../../conector/api/api.conector"
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.css"]
})
export class NewComponent {
  user!: string;
  password!: string;
  confirmPassword!: string;
  passwordError!: boolean;

  constructor(public ApiService: ApiService,public router: Router) {}

  register() {
    const user = { email: this.user, password: this.password };
    this.ApiService.register(user).subscribe(data => {
      this.ApiService.setToken(data.token);
      this.router.navigateByUrl('/');
      
    },
     error => {
      console.log(error);
    });
  }
}
