class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.date :birthdate
      t.string :gender
      t.string :encrypted_password
      t.string :salt
      t.text :picture_path
      t.text :bio

      t.timestamps
    end
  end
end
