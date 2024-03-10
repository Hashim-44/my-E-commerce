import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
constructor( private _CartService:CartService ,  private _ToastrService:ToastrService){}
cartDetils:any =[]

removeCartItem(id:string):void{
  this._CartService.removeItem(id).subscribe({
    next:(Response)=>{
      console.log(Response.data);
      this.cartDetils=Response.data
      this._ToastrService.error('Item Successfully Removed From Your Cart')
      this._CartService.cartNumber.next(Response.numOfCartItems)

    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:(response)=>{
console.log(response.data);
this.cartDetils=response.data

      } ,
      error:(err)=>{
        console.log(err);
        
      }
    })
}
changeCount(id:string , count:number):void{
  if(count>0){
    this._CartService.UpdateCart(id, count).subscribe({
      next:(response)=>{
      console.log(response);
      this.cartDetils =response.data
      },
      error:(err)=>{
        console.log(err);
        
      }
        })
  }
}

clear():any{
  this._CartService.clearCart().subscribe({
    next:(response)=>{
      this._ToastrService.error('Your Cart Has Been Cleard',)
      console.log(response);
     this._CartService.cartNumber.next(response.numOfCartItems)
      this.cartDetils =response



      
    }
   

  })
}
cleartoast(){
  this._ToastrService.error('Your Cart Has Been Cleard','' , {easeTime: 1000,});

}
}
