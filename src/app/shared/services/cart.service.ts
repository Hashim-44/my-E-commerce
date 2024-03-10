import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }
  cartNumber:BehaviorSubject<number>= new BehaviorSubject(0)
headers:any = {token: localStorage.getItem('eToken')}
  addToCart(productId:string):Observable <any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,   
    {productId:productId  },
  
    )
  }

  getUserCart():Observable <any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart` , 
  )
  }

  removeItem(productId:string):Observable <any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
   )
  }


  UpdateCart(idProduct:string , newCount:number):Observable<any>{
return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${idProduct}`,
{
count:newCount
},



)

  }


  clearCart():Observable <any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
   )
  }
checkOut(cartId:string , userData:object):Observable <any>{
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://hashim-44.github.io/my-E-commerce`,
  {
    shippingAddress:userData
  })
}
}


