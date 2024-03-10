import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit{
  myname:any= localStorage.getItem('eName')

  constructor( private _AuthService:AuthService , private _CartService:CartService){}

  cartCount:number=0
  ngOnInit(): void {
      this._CartService.cartNumber.subscribe({
        next:(num)=>{
this.cartCount=num
        }
      })

      this._CartService.getUserCart().subscribe({
        next:(response)=>{
          this._CartService.cartNumber.next(response.numOfCartItems)
        }
      })
  }
  logOutUser(){
    this._AuthService.logOut()
  }
}
