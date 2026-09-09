export interface BurgerItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  badgeNumber: number;
  image: string;
  fallbackImage: string;
  ingredients: string[];
  calories?: string;
  isPopular?: boolean;
  category: 'burgers' | 'sides' | 'desserts' | 'drinks';
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Utensils' | 'Flame' | 'Zap' | 'Clock' | 'Award';
}

export interface MenuCategory {
  id: string;
  title: string;
  image: string;
  fallbackImage: string;
  items: {
    name: string;
    description: string;
    price: number;
    tag?: string;
  }[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  avatar: string;
  dishLoved: string;
}

export interface ReservationFormData {
  fullName: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  specialRequests?: string;
}
