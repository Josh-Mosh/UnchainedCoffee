class Comment < ActiveRecord::Base
  belongs_to :shop
  belongs_to :user

  validates :message, presence: true
  validates :user_id, presence: true
  validates :shop_id, presence: true
end
