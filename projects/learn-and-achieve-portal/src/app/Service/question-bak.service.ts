import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRoutes } from '../Util/app-routes';

@Injectable({
  providedIn: 'root'
})
export class QuestionBakService {

  constructor(private http:HttpClient) { }

  public getAllQuestion(search:string,pageIndex:any,pageSize:any){
    return this.http.get(AppRoutes.GET_ALL_QUESTION+"?search="+`${search}`+"&pageIndex="+`${pageIndex}`+"&pageSize="+`${pageSize}`);
  }

  public addQuestion(question:any){
    return this.http.post(AppRoutes.ADD_QUESTION,question);
  }

  public deleteQuestion(id:any){
    return this.http.delete(AppRoutes.ADD_QUESTION+id);
  }

  public getQuestion(id:any){
    return this.http.get(AppRoutes.ADD_QUESTION+id)
  }

  public updateQuestionStatus(id:any,status:boolean)
  {
    return this.http.patch(AppRoutes.ADD_QUESTION + id + "/" + status,{});
  }

  public updateQuestion(questionRequest:any){
    return this.http.put(AppRoutes.ADD_QUESTION,questionRequest);
  }

  public uploadFile(file:File){
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
    const formData: FormData = new FormData();
      formData.append('file', file);
    return this.http.post(AppRoutes.BULK_UPLOAD_QUESTION,formData,{headers});
  }
}
