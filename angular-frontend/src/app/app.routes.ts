import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

export const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'create-employees', component: CreateEmployeeComponent },
  { path: 'update-employee/:id', component: UpdateEmployeeComponent },
  { path: 'details-employee/:id', component: EmployeeDetailsComponent },
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: '**', redirectTo: 'employees', pathMatch: 'full' }
];
