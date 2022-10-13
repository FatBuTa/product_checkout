import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { DiscountRule, GetFreeRule, Item, Rule } from '../interfaces';
import { PROMOTION_TYPE, USER_TYPE } from '../const';
import * as ProductService from '../services/product';
import styles from '../styles/Checkout.module.css';

const getPromotionText = (promotions: Array<Rule>): string => {
  return promotions?.map((promot: Rule) => {
    switch(promot.type) {
      case PROMOTION_TYPE.PERCENTAGE_DISCOUNT:
      case PROMOTION_TYPE.MONEY_DISCOUNT:
        return promot.description.replaceAll('{discount}', `${(promot as DiscountRule).discount}`);
      case PROMOTION_TYPE.GET_FREE_ITEM:
        return promot.description
          .replaceAll('{free}', `${(promot as GetFreeRule).free}`)
          .replaceAll('{buy}', `${(promot as GetFreeRule).buy}`);
      default:
        return '';
    }
  }).join(', ');
}

const getAccountType = (userType: number): string => {
  let account = 'Default';
  switch(userType) {
    case USER_TYPE.MICROSOFT:
      account = 'Microsoft';
      break;
    case USER_TYPE.FACEBOOK:
      account = 'Facebook';
      break;
    case USER_TYPE.AMAZON:
      account = 'Amazon';
      break;
    default:
      account = 'Default';
      break;
  }
  return account;
}

type DataItem = Item & { amount: number, payAmount: number, payPrice: number };
interface Order {
  [key: string]: DataItem;
}
const Checkout: NextPage = () => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [items, setItems] = useState<Array<Item>>([]);
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState<Order>({});
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { userType } = router.query;
      if (!userType) return;
      ProductService.getProductItems(Number(userType)).then((res: ProductService.GetProductItemsResponse) => {
        setItems(res.items);
        setData(res.items.reduce(
          (p: Order, i: Item) => { p[i.id] = { ...i, amount: 0, payAmount: 0, payPrice: i.price }; return p; },
          {},
        ))
      });
    }
  }, [router.query]);

  const onChangeAmount = (item: Item, event: ChangeEvent<HTMLInputElement>) => {
    setData((d: Order) => {
      const temp = { ...d };
      temp[item.id] = { ...item, amount: +event.target.value, payAmount: +event.target.value, payPrice: item.price };
      return temp;
    })
  }

  const checkout = (order: Order): number => {
    const prices =  Object.values(order).filter(i => i.amount > 0).map((item: DataItem) => {
      let subPrice = 0;
      if (item.promotions) {
        for (let promot of item.promotions) {
          switch(promot.type) {
            case PROMOTION_TYPE.PERCENTAGE_DISCOUNT:
              item.payPrice = item.payPrice * (1 - (promot as DiscountRule).discount);
              break;
            case PROMOTION_TYPE.MONEY_DISCOUNT:
              item.payPrice = item.payPrice - (promot as DiscountRule).discount;
              break;
            case PROMOTION_TYPE.GET_FREE_ITEM:
              const p = promot as GetFreeRule;
              const freeAmount = p.free * Math.floor(item.payAmount/(p.buy + p.free));
              item.payAmount = item.payAmount - freeAmount;
              break;
            default:
              break;
          }
        }
      }
      subPrice = item.payPrice * item.payAmount;
      return { ...item, subPrice }
    });
    return prices.reduce((p, c) => p + c.subPrice, 0);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    const total = checkout(data);
    setTotalAmount(total);
  }

  return (
    <div className={styles.container}>
      <Link data-cy="back-button" href="/"><h1>&larr;{getAccountType(Number(router?.query?.userType))}</h1></Link>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {items?.map((item: Item) => {
          return (
            <Form.Group key={item.name} className={styles.item} controlId={item.name}>
              <Form.Label className={styles.itemLabel}>{`${item.name} (${item.price}$)`}<span className={styles.itemDescription}>{item.description}</span></Form.Label>
              <Form.Control
                required type="number"
                placeholder="Please input amount"
                defaultValue={0}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeAmount(item, e)}
                className={styles.itemInput}
              />
              <div className={styles.promotion}>{item.promotions && getPromotionText(item.promotions)}</div>
            </Form.Group>
          );
        })}
        <div className={styles.total}>Total: <span data-cy="total-amount">{totalAmount}</span></div>
        <Button data-cy="checkout-button" type="submit" className={styles.submitButton} >Checkout</Button>
      </Form>
    </div>
  );
}

export default Checkout
