import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component'; // Import the component
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  { path: 'create-employees', component: CreateEmployeeComponent },
  { path: 'employee-list', component: EmployeeListComponent }
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
