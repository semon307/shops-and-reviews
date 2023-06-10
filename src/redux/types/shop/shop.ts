import { ShopCategory } from '../shop-category';

export type Shop = {
  tsID: string;
  shopName: string;
  shopUrl: string;
  reviewCount: number;
  shopDescription: string;
  averageRating: number;
  shopLogoUrl: string;
  profileUrl: string;
  shopCategories: Array<ShopCategory>;
  certificationState: boolean;
};
