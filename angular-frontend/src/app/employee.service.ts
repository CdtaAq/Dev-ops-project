import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://a8a501094ccc64d87bcb38138884222b-619803003.us-east-1.elb.amazonaws.com/backend/api/v1/employees";
  constructor(private httpclient: HttpClient) { }

  getEmployeesList(): Observable<Employee[]>{
    return this.httpclient.get<Employee[]>(`${this.baseUrl}`);
  }

  createEmployee(employee : Employee): Observable<Object>{
    return this.httpclient.post(`${this.baseUrl}`, employee);
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpclient.get<Employee>(`${this.baseUrl}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object>{
    return this.httpclient.put(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Object> {
    return this.httpclient.delete(`${this.baseUrl}/${id}`);
  }

}
