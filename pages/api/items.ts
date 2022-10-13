// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { Item } from '../../interfaces';
import { PROMOTION_TYPE, USER_TYPE } from '../../const';

type Data = {
  items: Array<Item>,
}

const defaultProduct = [
  {
    id: 1,
    name: 'Small Pizza',
    description: "10'' pizza for one person",
    price: 11.99,
  },
  {
    id: 2,
    name: 'Medium Pizza',
    description: "12'' Pizza for two persons",
    price: 15.99,
  },
  {
    id: 3,
    name: 'Large Pizza',
    description: "15'' Pizza for four persons",
    price: 21.99,
  },
];

const microsoftProduct = [
  {
    id: 1,
    name: 'Small Pizza',
    description: "10'' pizza for one person",
    price: 11.99,
    promotions: [{
      type: PROMOTION_TYPE.GET_FREE_ITEM,
      description: "Get {free} free for {buy} deal",
      buy: 2,
      free: 1,
      freeProduct: [],
      isBuySameProduct: true,
      isFreeSameProduct: true,
    }]
  },
  {
    id: 2,
    name: 'Medium Pizza',
    description: "12'' Pizza for two persons",
    price: 15.99,
  },
  {
    id: 3,
    name: 'Large Pizza',
    description: "15'' Pizza for four persons",
    price: 21.99,
  },
];

const fbProduct = [
  {
    id: 1,
    name: 'Small Pizza',
    description: "10'' pizza for one person",
    price: 11.99,
  },
  {
    id: 2,
    name: 'Medium Pizza',
    description: "12'' Pizza for two persons",
    price: 15.99,
    promotions: [{
      type: PROMOTION_TYPE.GET_FREE_ITEM,
      description: "Get {free} free for {buy} deal",
      buy: 4,
      free: 1,
      freeProduct: [],
      isBuySameProduct: true,
      isFreeSameProduct: true,
    }]
  },
  {
    id: 3,
    name: 'Large Pizza',
    description: "15'' Pizza for four persons",
    price: 21.99,
  },
];

const amazonProduct = [
  {
    id: 1,
    name: 'Small Pizza',
    description: "10'' pizza for one person",
    price: 11.99,
  },
  {
    id: 2,
    name: 'Medium Pizza',
    description: "12'' Pizza for two persons",
    price: 15.99,
  },
  {
    id: 3,
    name: 'Large Pizza',
    description: "15'' Pizza for four persons",
    price: 21.99,
    promotions: [{
      type: PROMOTION_TYPE.MONEY_DISCOUNT,
      description: "Discount {discount}$",
      discount: 2,
    }]
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userType } = req.query;
  let items = [];
  switch(Number(userType)) {
    case USER_TYPE.MICROSOFT:
      items = microsoftProduct;
      break;
    case USER_TYPE.FACEBOOK:
      items = fbProduct;
      break;
    case USER_TYPE.AMAZON:
      items = amazonProduct;
      break;
    default:
      items = defaultProduct;
      break;
  }
  res.status(200).json({ items });
}
