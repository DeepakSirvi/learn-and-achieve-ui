import { Injectable } from '@angular/core';
import { AppRoutes } from '../Util/app-routes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http:HttpClient) { }

  
  public getAllSubject(search:string,pageIndex:any,pageSize:any){
    return this.http.get(AppRoutes.GET_ALL_SUBJECT+"?search="+`${search}`+"&pageIndex="+`${pageIndex}`+"&pageSize="+`${pageSize}`);
  }

  public addSubject(subject:any){
    return this.http.post(AppRoutes.ADD_SUBJECT,subject);
  }

  public deleteSubject(id:any){
    return this.http.delete(AppRoutes.DELETE_SUBJECT+id);
  }

  public getSubject(id:any){
    return this.http.get(AppRoutes.ADD_SUBJECT+id)
  }

  public updateSubjectStatus(id:any,status:boolean)
  {
    return this.http.patch(AppRoutes.ADD_SUBJECT + id + "/" + status,{});
  }

  public updateSubject(subject:any){
    return this.http.put(AppRoutes.ADD_SUBJECT,subject);
  }

}
