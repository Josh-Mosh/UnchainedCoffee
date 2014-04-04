class AddAttachmentImg1ToImages < ActiveRecord::Migration
  def self.up
    change_table :images do |t|
      t.attachment :img1
      t.attachment :img2
      t.attachment :img3
    end
  end

  def self.down
    drop_attached_file :images, :img1
    drop_attached_file :images, :img2
    drop_attached_file :images, :img3
  end
end
