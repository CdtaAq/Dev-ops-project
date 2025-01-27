import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Employee  } from '../employee';
import { EmployeeService } from '../employee.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, NgFor, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  employees:  Employee[]=[];
  constructor(private employeeService: EmployeeService,
    private router: Router
  ){ }

  ngOnInit(): void {
      this.getEmployees() ;
  }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    })
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe(data => {
      console.log(data);
      this.getEmployees();
    })
  }

  getEmployeeById(id: number){
    this.employeeService.getEmployeeById(id).subscribe(data => {
      console.log(data);
      this.router.navigate(['details-employee', id]);
    })
  }
}
