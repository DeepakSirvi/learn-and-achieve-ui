import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ClassMaster } from '../../Model/class-master';
import { ClassMasterService } from '../../Service/class-master.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Toast from '../../Util/helper';
import { Route, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-class-master-management',
  templateUrl: './class-master-management.component.html',
  styleUrls: ['./class-master-management.component.css']
})
export class ClassMasterManagementComponent implements OnInit {

  currentDate!: string;
  constructor(private fb: FormBuilder, private classService: ClassMasterService, private route: Router) {

  }
  ngOnInit(): void {
    this.getAllClass();
    this.initializeForm();
    this.currentDate = new Date().toISOString().split('T')[0];
  }

  search: string = ''
  classMasterList: ClassMaster[] = [];
  classId: string = '';
  classMaster: ClassMaster = new ClassMaster();


  pageEvent!: PageEvent;
  length!: number;
  pageSize = 5;
  pageIndex = 0;


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getAllClass();
  }


  getAllClass() {
    this.classService.getAllClass(this.search, this.pageIndex, this.pageSize).subscribe((result: any) => {
      this.classMasterList = result.classMasterList.content;
      this.length = result.classMasterList.totalElements;
    })
  }

  classForm = new FormGroup({
    className: new FormControl(
      '', [
      Validators.required,
    ]
    ),
    endDate: new FormControl(
      '', [
      Validators.required,
    ]
    )
  })

  get className() {
    return this.classForm.get('className');
  }

  get endDate() {
    return this.classForm.get('endDate');
  }

  addClass() {
    if (this.validateDate(!(this.classForm.value.endDate === null || this.classForm.value.endDate === undefined) ? this.classForm.value.endDate : '')) {
      this.classService.addClass(this.classForm.value).subscribe((data: any) => {
        this.classForm.reset()
        Toast.fire({
          icon: 'success',
          title: data.message,
        })
        this.getAllClass()
      }, (error) => {
        Toast.fire({
          icon: 'error',
          title: error.error.message
        })
      });
    }
    else {
      Toast.fire({
        icon: 'error',
        title: "Invalid date"
      })
    }
  }
  getId(classId: any) {
    this.classId = classId;
  }
  deleteClass() {
    this.classService.deleteClassMaster(this.classId).subscribe((data: any) => {
      Toast.fire({
        icon: 'success',
        title: data.message,
      })
      this.getAllClass()
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    });
  }

  getClassMaster(id: any) {
    this.classService.getClass(id).subscribe((data: any) => {
      this.classMaster = data.classMaster;
      this.initializeForm()
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    });
  }

  initializeForm() {
    this.classForm = this.fb.group({
      className: [this.classMaster.className, Validators.required],
      endDate: [this.classMaster.endDate, Validators.required],

    });
  }

  updateClass() {
    if (!(this.classForm.value.className === null || this.classForm.value.className === undefined ||
      this.classForm.value.endDate === null || this.classForm.value.endDate === undefined)) {
        if (this.validateDate(this.classForm.value.endDate)) {
      this.classMaster.className = this.classForm.value.className;
      this.classMaster.endDate = this.classForm.value.endDate;
      this.classService.updateClass(this.classMaster).subscribe((data: any) => {
        this.classForm.reset()
        Toast.fire({
          icon: 'success',
          title: data.message,
        })
        this.getAllClass()
      }, (error) => {
        Toast.fire({
          icon: 'error',
          title: error.error.message
        })
      });
      
    }
  }
  else {
    Toast.fire({
      icon: 'error',
      title: "Invalid date"
    })
  }
  }
  status!: boolean;
  getStatus(id: any, status: boolean) {
    this.classId = id;
    this.status = status
  }
  updateStatus() {
    this.classService.updateClassMasterStatus(this.classId, !this.status).subscribe((data: any) => {
      Toast.fire({
        icon: 'success',
        title: data.message,
      })
      this.getAllClass()
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    });
  }

  validateDate(date: string): boolean {
    const currentDate = new Date();
    const parts = date.split('-');
    const selectedDate = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    if (selectedDate < currentDate) {
      return false;
    } else {
      return true;
    }
  }

}
