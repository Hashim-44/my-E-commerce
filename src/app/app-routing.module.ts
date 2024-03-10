import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

const routes: Routes = [
  {path: '' ,
  canActivate:[authGuard],
   component:BlankLayoutComponent , children:[
    {path:"", redirectTo:'home' , pathMatch:'full' },
    {path:"home",component:HomeComponent , title:'E-commerce-Home'},
    {path:"cart",component:CartComponent  , title:'E-commerce-cart'},
    {path:"check-out/:id",component:CheckOutComponent  , title:'E-commerce-Check-Out'},
    {path:"allorders",component:AllordersComponent  , title:'E-commerce-All-Orders'},
    {path:"category-details/:id",component:CategoryDetailsComponent  , title:'E-commerce-Category-Details'},

    {path:"products",component:ProductsComponent  , title:'E-commerce-Products'},
    {path:'details/:id',component:DetailsComponent , title:'E-commerce-Products-Details'},
    {path:"brands",component:BrandsComponent   , title:'E-commerce-Brands'},
    {path:"categories",component:CategoriesComponent  , title:'E-commerce-Categoreis'},
    {path:"wish-list" , component:WishListComponent ,  title:'E-commerce-Wish-List'}




  ]},

  {path:"", component:AuthLayoutComponent , children:[

    // {path:"login",component:LoginComponent  , title:'E-commerce-Login'},
    {path:"register",component:RegisterComponent  , title:'E-commerce-Register'},
    {path:"login" , component:LoginComponent , title:'E-commerce-Login'},
    {path:"forget-password" , component:ForgetPasswordComponent , title:'E-commerce-Forget-Password'}



  ]},

  {path:"**", component:NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
