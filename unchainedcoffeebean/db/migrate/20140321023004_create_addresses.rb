class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.float :lon
      t.float :lat
      t.references :addressable, polymorphic: true

      t.timestamps
    end
  end
end
