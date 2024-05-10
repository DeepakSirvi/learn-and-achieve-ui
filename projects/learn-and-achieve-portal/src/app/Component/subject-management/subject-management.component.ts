import { Component } from '@angular/core';
import Toast from '../../Util/helper';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { SubjectService } from '../../Service/subject.service';
import { Router } from '@angular/router';
import { Subject } from '../../Model/subject';

@Component({
  selector: 'app-subject-management',
  templateUrl: './subject-management.component.html',
  styleUrls: ['./subject-management.component.css']
})
export class SubjectManagementComponent {

  constructor(private fb: FormBuilder,private subjectService:SubjectService,private route:Router){}
  ngOnInit(): void {
    this.getAllSubject();
    // this.initializeForm()
  }
  

  search:string=''
  subjectList:Subject[]=[];
  subjectId:string='';
  subject:Subject=new Subject();
 
 
  pageEvent!: PageEvent;
  length!:number;
  pageSize = 5;
  pageIndex = 0;
  
  
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getAllSubject();
  }


  getAllSubject(){
    this.subjectService.getAllSubject(this.search,this.pageIndex,this.pageSize).subscribe((result:any)=>{
      this.subjectList = result.subjectList.content;
      this.length=result.subjectList.totalElements;
     })
  }



  subjectForm = new FormGroup({
    subjectName: new FormControl(
      '', [
      Validators.required,
    ]
    )
  })

  get subjectName() {
    return this.subjectForm.get('subjectName');
  }



  addSubject(){
    this.subjectService.addSubject(this.subjectForm.value).subscribe((data: any) => {
      this.subjectForm.reset()
      Toast.fire({
        icon: 'success',
        title: data.message,
      }) 
      this.getAllSubject()
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    });
  }
  getId(classId:any){
    this.subjectId=classId;
  }
  deleteSubject()
  {
    this.subjectService.deleteSubject(this.subjectId).subscribe((data: any) => {
      Toast.fire({
        icon: 'success',
        title: data.message,
      }) 
      this.getAllSubject()
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    });
  }

  getSubject(id:any){
    this.subjectService.getSubject(id).subscribe((data: any) => {
      this.subject=data.subject;
      this.initializeForm()
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    });
  }

  initializeForm() {
    this.subjectForm = this.fb.group({
      subjectName: [this.subject.subjectName, Validators.required],
    });
  }

  updateSubject(){
    if(!(this.subjectForm.value.subjectName===null || this.subjectForm.value.subjectName===undefined  ))
      {
        this.subject.subjectName=this.subjectForm.value.subjectName;
        this.subjectForm.reset()
        this.subjectService.updateSubject(this.subject).subscribe((data: any) => {
      Toast.fire({
        icon: 'success',
        title: data.message,
      }) 
      this.getAllSubject()
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    });
    }
  }
  status!:boolean;
  getStatus(id:any,status:boolean)
  {
    this.subjectId=id;
    this.status=status
  }
  updateStatus()
  {
    this.subjectService.updateSubjectStatus(this.subjectId,!this.status).subscribe((data: any) => {
      Toast.fire({
        icon: 'success',
        title: data.message,
      }) 
      this.getAllSubject()
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    });
  }
}
