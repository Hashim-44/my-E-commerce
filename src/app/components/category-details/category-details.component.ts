import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
constructor(private _ActivatedRoute:ActivatedRoute , private _EcomDataService:EcomDataService){}

categoryId:string| null=''
categoryDetails:any=[]
ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
    this.categoryId=    params.get('id')
      }
    })

    this._EcomDataService.getCategoryDetails(this.categoryId).subscribe({
      next:(response)=>{
        console.log(response);
        this.categoryDetails=response.data
      }
    })
}
}
