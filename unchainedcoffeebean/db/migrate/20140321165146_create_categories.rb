class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name

      t.timestamps
    end

    create_table :shops_categories do |t|
      t.belongs_to :shop
      t.belongs_to :category
  	end
  end
end