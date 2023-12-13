import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm !:FormGroup;
  type!: 'success' | 'error';
  message!:string | null;
  constructor(private formBuilder:FormBuilder,private userService:UserService,private route:Router){}
  ngOnInit(): void {
    this.loginForm =this.formBuilder.group({
   
      email : ['',  [Validators.required]],
      password: ['',  [Validators.required]],

      })
      this.userService.getRole();
  
  }
  onSubmitForm(){
    this.userService.login(this.loginForm.value).subscribe({
      
      next:(response) => {
        let token = response.token;
        localStorage.setItem('Token', token);
        if(this.userService.getRole()=="ETUDIANT"){
          this.route.navigateByUrl("/front/accueil");

        }else if(this.userService.getRole()=="ADMIN"){
          this.route.navigateByUrl("/admin/accueil");

        }
      },
      error:(error) => {        
          console.log(error);
          this.type = 'error';
          this.message =error.error;


      }
    }
    );
  }
 
}
