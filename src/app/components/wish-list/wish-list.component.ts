import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
constructor( private _WishListService:WishListService , private _CartService:CartService , private _ToastrService:ToastrService){}
products:Product[]=[]
wisListData:string[]=[]

ngOnInit(): void {
    this._WishListService.getWishList().subscribe({
      next:(response)=>{
        console.log(response );
        this.products=response.data
        const newData=response.data.map((item:any)=>item._id)

        this.wisListData=newData
      }
    })
}
addCart(id:string):void{
  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
      console.log(response);
      this._ToastrService.success(response.message)
      this._CartService.cartNumber.next(response.numOfCartItems)

    },
    error:(err)=>{
      console.log(err);
      
    }
    
  })
  
}
removeWish(productId:string):void{
this._WishListService.removeItem(productId).subscribe({
  next:(response)=>{
    console.log(response);
    this._ToastrService.error(response.message)
    this.wisListData=response.data
this._WishListService.getWishList().subscribe({
  next:(response)=>{
    this.products=response.data
  }
})
  }
})
}
removeWishAddCart(productId:string):void{
  this._WishListService.removeItem(productId).subscribe({
    next:(response)=>{
      console.log(response);
      this.wisListData=response.data
  this._WishListService.getWishList().subscribe({
    next:(response)=>{
      this.products=response.data
    }
  })
    }
  })
  }
}
