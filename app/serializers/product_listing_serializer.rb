class ProductListingSerializer
  def initialize(raw_product_listing)
    @raw_product_listing = raw_product_listing
  end

  def serialize
    listing_price = raw_product_listing.listing_price

    {
      id: raw_product_listing.id,
      shopifyProductUrl: "https://admin.shopify.com/store/thai-dev-store-3/products/#{raw_product_listing.shopify_product_id}",
      listingPrice: listing_price.format(symbol: "#{listing_price.currency.iso_code} ").strip,
      condition: raw_product_listing.condition,
      sellerNote: raw_product_listing.seller_note,
      imageUrls: raw_product_listing.images.map(&:url)
    }
  end

  private

  attr_reader :raw_product_listing
end
