import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRoutes } from '../Util/app-routes';

@Injectable({
  providedIn: 'root'
})
export class ClassMasterService {

  constructor(private http:HttpClient) { }

  public getAllClass(search:string,pageIndex:any,pageSize:any){
    return this.http.get(AppRoutes.GET_ALL_CLASS+"?search="+`${search}`+"&pageIndex="+`${pageIndex}`+"&pageSize="+`${pageSize}`);
  }

  public addClass(classMaster:any){
    return this.http.post(AppRoutes.ADD_CLASS,classMaster);
  }

  public deleteClassMaster(id:any){
    return this.http.delete(AppRoutes.DELETE_CLASS+id);
  }

  public getClass(id:any){
    return this.http.get(AppRoutes.ADD_CLASS+id)
  }

  public updateClassMasterStatus(id:any,status:boolean)
  {
    return this.http.patch(AppRoutes.ADD_CLASS + id + "/" + status,{});
  }

  public updateClass(classRequest:any){
    return this.http.put(AppRoutes.ADD_CLASS,classRequest);
  }

}
