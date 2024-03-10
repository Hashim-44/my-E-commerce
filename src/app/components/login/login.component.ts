import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor( private _AuthService:AuthService , private _Router:Router){}

  msgError:string ='';
  isLoading:boolean=false;
loginForm:FormGroup= new FormGroup({
  email:new FormControl(null , [Validators.required, Validators.email]),
  password:new FormControl(null, [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),

  


})


handelForm():void{
if(this.loginForm.valid){
  this.isLoading=true;
  this._AuthService.setLog(this.loginForm.value).subscribe({
    next:(response)=>{

      if(response.message == 'success'){
        this.isLoading=false;

localStorage.setItem('eToken', response.token)
localStorage.setItem('eName', response.user.name)

this._AuthService.decodeUserData()

this._Router.navigate(['/home'])
console.log(response);



      }
      
    },
    error:(err:HttpErrorResponse)=>{
      this.isLoading=false;

      this.msgError=err.error.message

      console.log(err.error.message);

    }
  })
}else{
  this.loginForm.markAllAsTouched()
}
}
}


