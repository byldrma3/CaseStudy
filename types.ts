export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  quantity: number;
  images: string[];
}

export interface ProductData {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
