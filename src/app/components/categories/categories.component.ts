import { Component, OnInit } from '@angular/core';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
constructor(private _EcomDataService:EcomDataService){}

categoreData:any[]=[]
ngOnInit(): void {
    this._EcomDataService.getCategories().subscribe({
      next:(response)=>{
        console.log(response);
        this.categoreData=response.data
      }
    })
}
}
