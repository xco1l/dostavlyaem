import React from "react";

import { Product as ProductModel } from "@/models";

export interface IProductProps {
  product: ProductModel;
}

export const Product: React.FC<IProductProps> = ({ product }) => {
  return (
    <div className="product">
      <div className="product__inner">
        <div className="product__image"></div>
        <div className="product__description"></div>
        <div className="product__controll">
          <div className="product__price"></div>
          <div className="product__add-to-cart"></div>
        </div>
      </div>
    </div>
  );
};
