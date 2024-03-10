import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
constructor(private _ActivatedRoute:ActivatedRoute , 
  private _EcomDataService:EcomDataService ,
   private _CartService:CartService  ,
  private _ToastrService:ToastrService,
  private _WishListService:WishListService){}

productDetails:Product = {}as Product;
wisListData:string[]=[]

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

detailsSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['',''],
  autoplay:true,
 autoplaySpeed:1000,
 autoplayTimeout:5000,
 responsive: {
  0: {
    items: 1
  },
  400: {
    items: 1
  },
  740: {
    items: 1
  },
  940: {
    items: 1
  }
},
  nav: false
}

ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        
        
       let idProduct:any = params.get('id')

       this._EcomDataService.getProductDetails(idProduct).subscribe({
        next:(response)=>{
          this.productDetails=response.data
          console.log(this.productDetails);
          
        }
       })
       
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
