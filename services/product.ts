import axios from 'axios';
import { Rule, Item } from '../interfaces';

export interface GetProductItemsResponse {
  items: Array<Item>;
}

export async function getProductItems(userType: number): Promise<GetProductItemsResponse> {
  try {
    const result = await axios.get(`/api/items?userType=${userType}`);
    if (result && result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('error: ', error);
  }
  return { items: [] };
}

// export interface GetPromotionResponse {
//   rules: Array<Rule>;
// }

// export async function getPromotion(userType: number): Promise<GetPromotionResponse> {
//   try {
//     const result = await axios.get(`/api/promotion?userType=${userType}`);
//     if (result && result.data) {
//       return result.data;
//     }
//   } catch (error) {
//     console.log('error: ', error);
//   }
//   return { rules: [] };
// }