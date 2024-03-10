import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
constructor(private _EcomDataService:EcomDataService , private _CartService:CartService  ,private _ToastrService:ToastrService , private _WishListService:WishListService){}

products:Product[]=[]
categories:any[] = []
wisListData:string[]=[]
searchTerm:string=''



addCart(id:string):void{
  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
      console.log(response);
      this._ToastrService.success(response.message)
      this._CartService.cartNumber.next (response.numOfCartItems)
      console.log(this._CartService.cartNumber);
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}



categoriesSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  autoplay:true,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}
ngOnInit(): void {
    this._EcomDataService.getAllProducts().subscribe({
      next:(response)=>{
this.products=response.data
console.log(this.products);

      }
    })


    this._EcomDataService.getCategories().subscribe({
      next:(response)=>{
        this.categories = response.data

      }
    })

    this._WishListService.getWishList().subscribe({
      next:(response)=>{
        const newData=response.data.map((item:any)=>item._id)

        this.wisListData=newData
      }
    })
}

mainSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
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
