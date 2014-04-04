class AddAttachmentShopPicToImgaes < ActiveRecord::Migration
  def self.up
    change_table :images do |t|
      t.attachment :shop_pic
    end
  end

  def self.down
    drop_attached_file :images, :shop_pic
  end
end
