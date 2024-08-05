import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:3000/employee';

  constructor(private _http: HttpClient) { }

  addEmployee(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get(this.apiUrl);
  }
  
  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employee/${id}`);
  } 

  updateEmployee(id: number, data:any): Observable<any> {
    return this._http.put(`http://localhost:3000/employee/${id}`,data);
  } 
}
