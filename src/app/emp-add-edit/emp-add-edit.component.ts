import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../Core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empform: FormGroup;
  education: string[] = [
    'Metric',
    'Highschool',
    'Diploma',
    'Graduation',
    'Post-Graduation'
  ];

  constructor(
    private _fb: FormBuilder, 
    private _empService: EmployeeService, 
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreService: CoreService,
  ) {
    this.empform = this._fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: ['', Validators.required],
      package: ['', Validators.required],
    });
  }
  ngOnInit(): void {
      this.empform.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empform.valid) {
      if (this.data) {
        this._empService.updateEmployee(this.data.id,this.empform.value).subscribe({
          next: (value: any) => {
            this._coreService.openSnackBar('Employee Updated!', 'Done');
            this._dialogRef.close(true);
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      }else{
        this._empService.addEmployee(this.empform.value).subscribe({
          next: (value: any) => {
            this._coreService.openSnackBar('Employee added sucessfully!', 'Done');
            this._dialogRef.close(true);
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      }
    }
  }
}
