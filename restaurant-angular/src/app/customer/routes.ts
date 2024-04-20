import { Routes } from "@angular/router";
import { DashBoardComponent } from "./dashboard/customer.component";


export const CUSTOMER_ROUTES: Routes = [
  { path: '', redirectTo:'/customer/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashBoardComponent }
]