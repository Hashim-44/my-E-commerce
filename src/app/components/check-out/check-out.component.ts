import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
constructor(private _FormBuilder:FormBuilder , private _ActivatedRoute:ActivatedRoute , private _CartService:CartService){}

checkOut:FormGroup = this._FormBuilder.group({
details:['',[Validators.required ,  Validators.minLength(3)]],
phone:['',[Validators.required , Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
city:['',[Validators.required ,  Validators.minLength(3)]]

})
cartId:any=''
ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(
      {
        next:(params)=>{
console.log(params.get('id'));
this.cartId=params.get('id')
        }
      }
    )
}
handleForm():void{
  console.log(this.checkOut.value);
 if(this.checkOut.valid){
  this._CartService.checkOut( this.cartId , this.checkOut.value).subscribe({
    next:(response)=>{
      if(response.status =='success'){
        window.open(response.session.url , '_self')
      }
console.log(response);

    }
  })
 }else{
  this.checkOut.markAllAsTouched()
 }
}
}
