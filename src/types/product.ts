export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

// Navigation param list used across the app (Stack + Tabs)
export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { product: Product };
};

export type RootTabParamList = {
  ProductsTab: undefined;
  FavoritesTab: undefined;
};
