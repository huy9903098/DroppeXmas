export interface UserInterface {
  address: any;
  email: string;
  id: number;
  name: FullName;
  password: string;
  phone: string;
  username: string;
}

export interface FullName {
  firstname: string;
  lastname: string;
}

export interface CartsInterface {
  [key: number]: CartInterface;
}

export interface ProductDiscounts {
  [key: number]: number;
}

export interface CartInterface {
  id: number;
  userId: number;
  date: Date;
  products: PreProduct[];
}

export interface PreProduct {
  productId: number;
  quantity: number;
  discard: false;
}

export interface ProductObjectByUser {
  [key: number]: ProductInterface;
}

export interface ProductInterface {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
  discard: boolean;
}
