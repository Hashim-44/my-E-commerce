import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor( private _AuthService:AuthService , private _Router:Router){}

  msgError:string ='';
  isLoading:boolean=false;
registerForm:FormGroup= new FormGroup({
  name:new FormControl(null , [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  email:new FormControl(null , [Validators.required, Validators.email]),
  password:new FormControl(null, [Validators.required ,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  rePassword:new FormControl(null),
  phone:new FormControl(null ,[Validators.required , Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]),

} , {validators:[this.confirmPassword]} as FormControlOptions)



confirmPassword (group:FormGroup):void{

let password = group.get('password')
let rePassword = group.get('rePassword')


if(rePassword?.value==null){
rePassword?.setErrors({required:true})
}
else if(password?.value != rePassword?.value){
  rePassword?.setErrors({notMach:true})
}
}



handelForm():void{
if(this.registerForm.valid){
  this.isLoading=true;
  this._AuthService.setReg(this.registerForm.value).subscribe({
    next:(response)=>{

      if(response.message == 'success'){
        this.isLoading=false;

this._Router.navigate(['/login'])


      }
      
    },
    error:(err:HttpErrorResponse)=>{
      this.isLoading=false;

      this.msgError=err.error.message

      console.log(err.error.message);

    }
  })
}else{
  this.registerForm.markAllAsTouched()
}
}
}
