class CreateCommnets < ActiveRecord::Migration
  def change
    create_table :commnets do |t|
      t.text :message
      t.references :shops, index: true

      t.timestamps
    end
  end
end
