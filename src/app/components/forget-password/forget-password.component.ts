import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetPassService } from 'src/app/shared/services/forget-pass.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})

export class ForgetPasswordComponent {
constructor(private _ForgetPassService:ForgetPassService ,private _Router:Router){}

step1:boolean=true
step2:boolean=false
step3:boolean=false
email:string=''
userMessage:string=''
forgetform:FormGroup=new FormGroup({
  email:new FormControl('', [Validators.required, Validators.email])
})

resetCodeform:FormGroup=new FormGroup({
  resetCode:new FormControl('', [Validators.required, Validators.minLength(6)])
})
resetPasswordform:FormGroup=new FormGroup({
  newPassword:new FormControl('', [Validators.required ,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)])
})

forgetPassword():void{
  let userEmail= this.forgetform.value
  this.email=userEmail.email
this._ForgetPassService.forgetPass(userEmail).subscribe({
  next:(response)=>{
    console.log(response);
    this.userMessage=response.message
    this.step1=false
    this.step2=true
  },
  error:(err)=>{
    this.userMessage=err.error.message
  }
})
}




resetCode():void{
  let resetCode = this.resetCodeform.value;
this._ForgetPassService.resetCode(resetCode).subscribe({
  next:(response)=>{
    console.log(response);
    this.userMessage=response.status
    this.step2=false
    this.step3=true

  },error:(err)=>{
    this.userMessage=err.error.message
  }
})
}
newPassword():void{
  let resetForm = this.resetPasswordform.value

  resetForm.email = this.email
  if(this.resetPasswordform.valid){
    this._ForgetPassService.resetPassword(resetForm).subscribe({
      next:(response)=>{
        if(response.token){
          localStorage.setItem('_token',response.token)
          this._Router.navigate(['/home'])
        }
        console.log(response);
        
      },error:(err)=>{
        this.userMessage=err.error.message
      }
    })
  }

}
}
