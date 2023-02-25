/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import Rating from './Rating';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div key={product.slug} className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>
      <div className="center-content p-5">
        <h2 className="text-lg">
          <Link href={`/product/${product.slug}`}>{product.name.toUpperCase()}</Link>
        </h2>
        {<Rating rating={product.rating} />}
        <p className="mb-2">{product.color}</p>
        <p>Aed:{product.price}</p>
        <button
          onClick={() => addToCartHandler(product)}
          className="primary-button"
          type="button"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
