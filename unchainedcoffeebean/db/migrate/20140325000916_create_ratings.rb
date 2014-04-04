class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.references :shop, index: true
      t.references :user, index: true
      t.float :score

      t.timestamps
    end
  end
end
