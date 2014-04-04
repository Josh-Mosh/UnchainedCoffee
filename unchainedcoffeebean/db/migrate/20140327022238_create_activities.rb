class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.references :user, index: true
      t.references :shop, index: true
      t.string :type

      t.timestamps
    end
  end
end
