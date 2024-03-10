import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private _EcomDataService:EcomDataService, private _CartService:CartService ,  private _ToastrService:ToastrService, 
    private _WishListService:WishListService){}
  products:Product[]=[]
  searchTerm:string=''
  wisListData:string[]=[]

  
  addCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._CartService.cartNumber.next(response.numOfCartItems)

        this._ToastrService.success(response.message)

      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  ngOnInit(): void {
    this._EcomDataService.getAllProducts().subscribe({
      next:(response)=>{
this.products=response.data
console.log(this.products);

      }
    })
    this._WishListService.getWishList().subscribe({
      next:(response)=>{
        const newData=response.data.map((item:any)=>item._id)

        this.wisListData=newData
      }
    })

   
}
addWish(productId:string){
  this._WishListService.addToWishList(productId).subscribe({
    next:(response)=>{
console.log(response);
this._ToastrService.success(response.message)
this.wisListData=response.data
    }
  })
}
removeWish(productId:string):void{
  this._WishListService.removeItem(productId).subscribe({
    next:(response)=>{
      console.log(response);
      this._ToastrService.error(response.message)
      this.wisListData=response.data

    }
  })
  }
}
