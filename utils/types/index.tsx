export interface UserInterface {
  address: any;
  email: string;
  id: number;
  name: FullName;
  password: string;
  phone: string;
  username: string;
}
[];

export interface FullName {
  firstname: string;
  lastname: string;
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

export interface ProductInterface {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
}
