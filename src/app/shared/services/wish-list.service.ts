import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor( private _HttpClient:HttpClient) { }

addToWishList(productId:string):Observable<any>{
return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,

{
  productId: productId

})
}
getWishList():Observable<any>{
  return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist')
}

removeItem(productId:string):Observable<any>{
  return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`)
}
}
