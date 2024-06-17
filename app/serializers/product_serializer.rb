class ProductSerializer
  def initialize(raw_product)
    @raw_product = raw_product
  end

  def serialize
    price_money = Money.from_amount(raw_product.price.amount.to_f, raw_product.price.currency)

    {
      id: raw_product.id,
      name: raw_product.name,
      sku: raw_product.sku,
      price: price_money.format(symbol: "#{price_money.currency.iso_code} ").strip,
      imageUrl: raw_product.image_url,
      listed: ProductListing.find_by(shopify_product_id: raw_product.id).present?
    }
  end

  private

  attr_reader :raw_product
end
