import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { findIndex } from 'rxjs';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{
constructor( private _EcomDataService:EcomDataService ){}
brandId:string | null = ''
brandsData:any=[]
brandDetails:any=[]
ngOnInit(): void {
    this._EcomDataService.getBrands().subscribe({
      next:(response)=>{
        console.log(response.data);
        this.brandsData=response.data
      }
    })
}

showImg(para: HTMLDivElement , id:any  ):void{
para.classList.add('d-block')
para.classList.remove('d-none')

this._EcomDataService.brandDetails(id).subscribe({
  next:(response)=>{
this.brandDetails=response.data
  }
})
}
closeModal(modal:HTMLDivElement ){
  modal.classList.add('d-none')
  this.brandDetails=[]
}

}
