export class config {
  //public static API_URL = 'https://adcai-backend-production.up.railway.app';
  public static API_URL = 'http://localhost:8080';
  public static CLIENT_ID_GOOGLE = '742126564330-sia6o8jmu6jni7ocpg68n5n3iagp12ni.apps.googleusercontent.com';
  public static SESSION_STORAGE = {
    TOKEN_GOOGLE: 'tokenGoogle',
    TOKEN: 'token',
    ACTIVE_ROLE: 'activeRole',
    IS_COMPLETE: 'isComplete',
    ID_USER: 'idUser',
    ID_DEPARTMENT: 'idDepartment',
    UNREAD_NOTIFICATIONS: 'unreadNotifications'
  };
  public static STATES_CAI = {
    1: 'DILIGENCIADO',
    2: 'APROBADO DIRECTOR',
    3: 'APROBADO DECANO',
    4: 'RECHAZADO DECANO',
    5: 'RECHAZADO DIRECTOR',
  };
  public static LIMIT_BASE_HOURS = 40;
}
