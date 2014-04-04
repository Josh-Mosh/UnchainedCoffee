class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.references :shop, index: true

      t.timestamps
    end
  end
end
