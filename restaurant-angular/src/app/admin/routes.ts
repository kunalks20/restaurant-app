import { Route } from "@angular/router";
import { DashBoardComponent } from "./dashboard/dashboard.component";
import { AddCategoryComponent } from "./add-category/add-category.component";

export const ADMIN_ROUTES: Route[] = [
  {path: '', redirectTo:'/admin/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashBoardComponent},
  {path: 'category', component: AddCategoryComponent},
];