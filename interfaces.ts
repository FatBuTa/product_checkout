export interface BaseRule {
  type: string;
  description: string;
};

export interface DiscountRule extends BaseRule {
  discount: number;
}

export interface GetFreeRule extends BaseRule {
  buy: number;
  free: number;
  freeProduct: Array<number>;
  isBuySameProduct: boolean;
  isFreeSameProduct: boolean;
}

export type Rule = DiscountRule | GetFreeRule;

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  promotions?: Array<Rule>;
};
