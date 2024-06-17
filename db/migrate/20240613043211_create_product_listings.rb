class CreateProductListings < ActiveRecord::Migration[7.1]
  def change
    create_table :product_listings do |t|
      t.string :shopify_product_id, null: false
      t.integer :condition, null: false, default: 0
      t.monetize :listing_price
      t.string :seller_note

      t.timestamps
    end
  end
end
