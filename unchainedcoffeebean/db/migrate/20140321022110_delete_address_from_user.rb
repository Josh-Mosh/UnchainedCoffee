class DeleteAddressFromUser < ActiveRecord::Migration
  def change
  	remove_column :users, :address_id
  end
end
