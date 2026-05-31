export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface AdminSettings {
  whatsappNumber: string;
  heroVideoUrl: string;
  secondaryVideoUrl: string;
}
