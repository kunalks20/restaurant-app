import { Routes } from "@angular/router";
import { DashBoardComponent } from "./dashboard/customer.component";
import { ViewProductsComponent } from "./view-products/view-products.component";
import { CreateReservationComponent } from "./create-reservation/create-reservation.component";
import { ViewReservationsComponent } from "./view-reservations/view-reservations.component";


export const CUSTOMER_ROUTES: Routes = [
  { path: '', redirectTo:'/customer/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashBoardComponent },
  { path: ':categoryId/products', component: ViewProductsComponent },
  { path: 'reservation', component: CreateReservationComponent },
  { path: 'view-reservations', component: ViewReservationsComponent }
]