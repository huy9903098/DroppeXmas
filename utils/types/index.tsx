export interface UserInterface {
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

export interface CartInterface {
  id: number;
  userId: number;
  date: Date;
  products: any[];
}

export interface PreProduct {
  productId: number;
  quantity: number;
}
