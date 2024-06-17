export type Product = {
  id: number;
  name: string;
  sku: string;
  price: string;
  imageUrl: string;
  productListingId: number | null;
}

export type ProductListing = {
  id: number;
  shopifyProductUrl: string;
  listingPrice: string;
  condition: string;
  sellerNote: string | null;
  imageUrls: string[];
}
