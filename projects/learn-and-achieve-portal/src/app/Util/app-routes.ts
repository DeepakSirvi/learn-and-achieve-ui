export class AppRoutes {
    // base url
  static baseUrl:string="http://localhost:8080/api";

  public static  USER_LOGIN= this.baseUrl+"/admin/generateOtp";
  public static  GET_OTP_EMAIL= this.baseUrl+"/admin/"
  public static  GET_VERIFY_LOGIN= this.baseUrl+"/admin/login";
  public static  VERIFY_OTP_FORPASSWORD= this.baseUrl+"/admin/verifyOtp"
  public static  GENERATE_NEW_PASSWORD= this.baseUrl+"/admin/setNewPassword"
  public static  UPDATEUSER= this.baseUrl+"/admin/update"
  public static  GET_USER= this.baseUrl+"/admin/user"
  public static  CHANGEPASSWORD= this.baseUrl+"/admin/changePassword/"

  // Class
  public static  GET_ALL_CLASS= this.baseUrl+"/classMaster/getAllClassMaster"
  public static  ADD_CLASS= this.baseUrl+"/classMaster/"
  public static  DELETE_CLASS= this.baseUrl+"/classMaster/"

  // Subject
  public static  GET_ALL_SUBJECT= this.baseUrl+"/subject/getAllSubject"
  public static  ADD_SUBJECT= this.baseUrl+"/subject/"
  public static  DELETE_SUBJECT= this.baseUrl+"/subject/"

   // Question
   public static  GET_ALL_QUESTION= this.baseUrl+"/question/getAllQuestionBank"
   public static  ADD_QUESTION= this.baseUrl+"/question/"
   public static  BULK_UPLOAD_QUESTION= this.baseUrl+"/question/upload"
  


}
