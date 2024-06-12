import React from "react";

type Product = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

type Props = {
  products: Product[]
}

const Index = ({ products }: Props) => {
  return (
    <div>
      <p>Hi there!</p>
      {products.map(product => <p>{product.name}</p>)}
    </div>
  )
}

export default Index;
