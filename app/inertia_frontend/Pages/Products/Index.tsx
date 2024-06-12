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
      {products.map(product => <p key={product.id}>{product.name}</p>)}
    </div>
  )
}

export default Index;
