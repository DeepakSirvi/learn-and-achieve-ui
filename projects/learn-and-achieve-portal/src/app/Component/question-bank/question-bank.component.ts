import { Component } from '@angular/core';
import Toast from '../../Util/helper';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBakService } from '../../Service/question-bak.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { QuestionBank } from '../../Model/question-bank';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.css']
})
export class QuestionBankComponent {

  constructor(private fb: FormBuilder,private bankService:QuestionBakService,private route:Router){}
  ngOnInit(): void {
    this.getAllQuestion();
    this.initializeForm()
  }
  
  search:string=''
  questionList:QuestionBank[]=[];
  questionId:string='';
  questions:QuestionBank=new QuestionBank();
 
  pageEvent!: PageEvent;
  length!:number;
  pageSize = 5;
  pageIndex = 0;
    
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getAllQuestion();
  }

  getAllQuestion(){
    this.bankService.getAllQuestion(this.search,this.pageIndex,this.pageSize).subscribe((result:any)=>{
      this.questionList = result.questionList.content;
      this.length=result.questionList.totalElements;
     })
  }

  questionForm = new FormGroup({
    question: new FormControl(
      '', [
      Validators.required,
    ]
    )
  })

  get question() {
    return this.questionForm.get('question');
  }

  addQuestion(){
    this.bankService.addQuestion(this.questionForm.value).subscribe((data: any) => {
      Toast.fire({
        icon: 'success',
        title: data.message,
      }) 
      this.getAllQuestion()
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    });
  }
  getId(questionId:any){
    this.questionId=questionId;
  }
  deleteQuestion()
  {
    this.bankService.deleteQuestion(this.questionId).subscribe((data: any) => {
      Toast.fire({
        icon: 'success',
        title: data.message,
      }) 
      this.getAllQuestion()
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    });
  }

  getQuestion(id:any){
    this.bankService.getQuestion(id).subscribe((data: any) => {
      this.questions=data.question;
      this.initializeForm()
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    });
  }

  
  updateForm = new FormGroup({
    questionName: new FormControl(
      '', [
      Validators.required,
    ]
    )
  })

  get questionName() {
    return this.updateForm.get('questionName');
  }

 

  initializeForm() {
    this.updateForm = this.fb.group({
      questionName: [this.questions.question, Validators.required],
     
    });
  }

  updateClass(){
    if(!(this.updateForm.value.questionName===null || this.updateForm.value.questionName===undefined  ))
      {
        this.questions.question=this.updateForm.value.questionName;
        this.bankService.updateQuestion(this.question).subscribe((data: any) => {
      Toast.fire({
        icon: 'success',
        title: data.message,
      }) 
      this.getAllQuestion()
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
    this.questionId=id;
    this.status=status
  }
  updateStatus()
  {
    this.bankService.updateQuestionStatus(this.questionId,!this.status).subscribe((data: any) => {
      Toast.fire({
        icon: 'success',
        title: data.message,
      }) 
      this.getAllQuestion()
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    });
  }
  file!:File;
  uploadFile(){
    console.log(this.file)
    if(!this.file)
    {
      Toast.fire({
        icon: 'error',
        title: 'File is not selected'
      })
      return
    }
    this.bankService.uploadFile(this.file).subscribe((data: any) => {
      let row:any[number]=[];
      let message;
      row=data.notAdded;
      if(row.length===0)
      message=data.message;
      else
      {
       let rowList:string='';
        for(let n of row)
        {
          rowList=rowList + n+" ,";
        }
        message=data.message+"But this row can not added "+rowList;
      }
      Toast.fire({
        icon: 'success',
        title: message,
      }) 
      this.getAllQuestion()
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    }
  }
}
