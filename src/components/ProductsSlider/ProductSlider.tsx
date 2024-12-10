import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { ProductCard } from '../ProductCard';

import styles from './ProductSlider.module.scss';
import arrowPrev from '../../images/icons/arrow_left.svg';
import arrowNext from '../../images/icons/arrow_right.svg';
import arrowPrevDis from '../../images/icons/arrow_left_dis.png';
import arrowNextDis from '../../images/icons/arrow_right_dis.png';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
  title: string;
};

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(6);

  const updateVisibleCards = useCallback(() => {
    const width = window.innerWidth;

    if (width < 390) {
      setVisibleCards(1);
    } else if (width < 640) {
      setVisibleCards(2);
    } else if (width < 820) {
      setVisibleCards(3);
    } else if (width < 900) {
      setVisibleCards(4);
    } else {
      setVisibleCards(6);
    }
  }, []);

  useEffect(() => {
    updateVisibleCards();

    window.addEventListener('resize', updateVisibleCards);

    return () => {
      window.removeEventListener('resize', updateVisibleCards);
    };
  }, [updateVisibleCards]);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + 1, products.length - visibleCards),
    );
  };

  return (
    <>
      <div className={cn(styles['product-slider'])}>
        <div className={cn(styles['product-slider__container'])}>
          <h2 className={cn(styles['product-slider__title'])}>{title}</h2>
          <div className={cn(styles['product-slider__buttons'])}>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={cn(
                styles['product-slider__button'],
                styles['product-slider__button--prev'],
              )}
            >
              <img
                src={currentIndex === 0 ? arrowPrevDis : arrowPrev}
                className={styles['product-slider__image']}
              />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === products.length - visibleCards}
              className={cn(
                styles['product-slider__button'],
                styles['product-slider__button--next'],
              )}
            >
              <img
                src={
                  currentIndex === products.length - visibleCards
                    ? arrowNextDis
                    : arrowNext
                }
                className={styles['product-slider__image']}
              />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.products__container}>
        <ul className={styles.products__list}>
          {products
            .slice(currentIndex, currentIndex + visibleCards)
            .map(product => {
              return (
                <li key={product.id} className={styles.products__item}>
                  <ProductCard product={product} />
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};