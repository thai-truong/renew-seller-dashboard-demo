class ProductSerializer
  def initialize(raw_product)
    @raw_product = raw_product
  end

  def serialize
    price_money = Money.from_amount(raw_product.price.amount.to_f, raw_product.price.currency)

    {
      id: raw_product.id,
      name: raw_product.name,
      price: price_money.format(symbol: "#{price_money.currency.iso_code} ").strip,
      image_url: raw_product.image_url
    }
  end

  private

  attr_reader :raw_product
end