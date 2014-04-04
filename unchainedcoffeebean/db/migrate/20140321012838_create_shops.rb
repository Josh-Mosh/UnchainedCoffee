class CreateShops < ActiveRecord::Migration
  def change
    create_table :shops do |t|
      t.string :name
      t.text :description
      t.string :pricing
      t.string :website
      t.float :rating
      t.references :user, index: true

      t.timestamps
    end
  end
end
