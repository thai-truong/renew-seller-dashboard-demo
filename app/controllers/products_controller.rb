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
      raw_product(1, 'Blue T-Shirt', 'BTS-1', '50.50', 'USD', 'https://www.joinusonline.net/pub/media/catalog/product/cache/c9a86b5d6ed7765664725105f8d84377/t/s/tshirt_royal_blue_1.jpg'),
      raw_product(2, 'Black Jeans', 'BJ-2', '75.99', 'USD', 'https://balenciaga.dam.kering.com/m/4643f4a2bd756380/Medium-724715TNW401105_F.jpg?v=4'),
      raw_product(3, 'Yellow Blouse', 'YB-3', '40.00', 'USD', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6w2JeVR1Qh8qZADUzy6Wppoi5JqwHQ_PN5A&s'),
      raw_product(4, 'Adidas Samba Classic', 'ASC-4', '112.35', 'USD', 'https://assets.adidas.com/images/w_600,f_auto,q_auto/3bbecbdf584e40398446a8bf0117cf62_9366/Giay_Samba_OG_trang_B75806_01_standard.jpg'),
      raw_product(5, 'Pokemon Hat', 'PH-5', '63.10', 'USD', 'https://target.scene7.com/is/image/Target/GUEST_2bf98a18-2ce1-4edd-90a7-ed430a5ad671?wid=488&hei=488&fmt=pjpeg')
    ]
  end

  def raw_product(id, name, sku, price_amount, price_currency, image_url)
    OpenStruct.new(
      id:, name:, sku:, price: OpenStruct.new(amount: price_amount, currency: price_currency), image_url:
    )
  end
end
