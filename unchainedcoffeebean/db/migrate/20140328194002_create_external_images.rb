class CreateExternalImages < ActiveRecord::Migration
  def change
    create_table :external_images do |t|
      t.text :url
      t.references :shop, index: true

      t.timestamps
    end
  end
end
