class Shop < ActiveRecord::Base
	attr_accessor :number, :street, :city, :state, :zip, :cntry, :url

  belongs_to :user

  has_one :address, as: :addressable, dependent: :destroy
  accepts_nested_attributes_for :address

  has_many :comments, dependent: :destroy
  has_many :favorites, dependent: :destroy
  # has_many :images, dependent: :destroy
  # accepts_nested_attributes_for :images, :reject_if => lambda { |t| t['image'].nil? }
  has_and_belongs_to_many :categories

  has_many :activities, dependent: :destroy
  has_many :external_images, dependent: :destroy
  accepts_nested_attributes_for :external_images


  validates :name, presence: true
  validates :address, presence: true
  validates :street, presence: true
  validates :city, presence: true
  validates :pricing, presence: true
  validates :description, presence: true


  ### File Uploads
    has_attached_file :photo, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/assets/coffee-clip.png"
    validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/
end
