import { Route } from "@angular/router";
import { DashBoardComponent } from "./dashboard/dashboard.component";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { PostProductComponent } from "./post-product/post-product.component";
import { ViewProductsComponent } from "./view-products/view-products.component";
import { UpdateProductComponent } from "./update-product/update-product.component";
import { ReservationsComponent } from "./reservations/reservations.component";

export const ADMIN_ROUTES: Route[] = [
  { path: '', redirectTo:'/admin/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'category', component: AddCategoryComponent },
  { path: ':categoryId/product', component: PostProductComponent },
  { path: ':categoryId/products', component: ViewProductsComponent},
  { path: 'product/:productId', component: UpdateProductComponent},
  { path: 'reservations', component: ReservationsComponent}
];