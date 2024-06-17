import DefaultLayout from "@/Layouts/DefaultLayout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";
import React, { ReactNode } from "react";
import ListingForm from "./ListingForm/ListingForm";

type Props = {
  product: Product;
  listingPriceCurrency: string;
  conditions: string[];
}

const New = ({ product, listingPriceCurrency, conditions }: Props) => (
  <div className="flex flex-col items-center h-full gap-y-3">
    <Card className="w-4/5">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-3">
            <div style={{ width: "100px", height: "100px" }}>
              <img src={product.imageUrl} style={{ objectFit: "contain" }} />
            </div>
            <div className="flex-col">
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.sku}</CardDescription>
            </div>
          </div>
          <div>
            <h4>1 x {product.price}</h4>
          </div>
        </div>
      </CardHeader>
    </Card>
    <ListingForm listingPriceCurrency={listingPriceCurrency} conditions={conditions} shopifyProductId={product.id} />
  </div>
);

New.layout = (page: ReactNode) => <DefaultLayout><div className="self-stretch">{page}</div></DefaultLayout>;

export default New;
