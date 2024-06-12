class ProductsController < ApplicationController
  def index
    serialized_products = raw_products.map { |product| ProductSerializer.new(product).serialize }

    render inertia: 'Products/Index', props: {
      products: serialized_products
    }
  end

  private

  def raw_products
    [
      raw_product(1, 'Blue T-Shirt', '50.50', 'USD', 'adsf'),
      raw_product(2, 'Black Jeans', '75.99', 'USD', 'adsf'),
      raw_product(3, 'Yellow Blouse', '40.00', 'USD', 'adsf'),
      raw_product(4, 'Adidas Samba Classic', '112.35', 'USD', 'adsf'),
      raw_product(5, 'Pokemon Hat', '63.10', 'USD', 'adsf')
    ]
  end

  def raw_product(id, name, price_amount, price_currency, image_url)
    OpenStruct.new(
      id:, name:, price: OpenStruct.new(amount: price_amount, currency: price_currency), image_url:
    )
  end
end
