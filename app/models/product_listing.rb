class ProductListing < ApplicationRecord
  has_many_attached :images

  enum condition: %i[excellent good middling worn]

  validates :shopify_product_id, :condition, :listing_price_cents, :listing_price_currency, presence: true
  validates :listing_price_cents, numericality: { only_integer: true, greater_than: 0 }

  monetize :listing_price_cents
end
