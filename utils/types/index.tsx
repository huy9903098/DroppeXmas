export interface User {
  address: any;
  email: String;
  id: number;
  name: FullName;
  password: String;
  phone: String;
  username: String;
}

export interface FullName {
  firstname: String;
  lastname: String;
}
