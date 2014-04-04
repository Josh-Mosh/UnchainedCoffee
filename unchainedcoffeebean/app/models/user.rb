class User < ActiveRecord::Base
	attr_accessor :password
	has_many :shops
	has_one :address, as: :addressable, dependent: :destroy
  accepts_nested_attributes_for :address
	has_many :favorites, dependent: :destroy
	has_many :comments, dependent: :destroy
  has_many :activities, dependent: :destroy

	email_regex = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i

	validates :first_name,	presence: true
	validates :last_name, 	presence: true
	validates :email,		presence: true, 
							uniqueness: { case_sensitive: false }, 
							format: { with: email_regex }
	validates :password, presence: true, confirmation: true	
  validates :password_confirmation, presence: true
  
  before_save :encrypt_password

 ### File Uploads
    has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/assets/default_avatar.jpg"
    validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  ### password encryption
  def has_password?(submitted_password)
  	encrypted_password == encrypt(submitted_password)
  end

  # class method that checks whether the user's email and submitted_password are valid
  def self.authenticate(email, submitted_password)
  	user = find_by_email(email)

   	return nil if user.nil?
   	return user if user.has_password?(submitted_password)
  end

  private
  	def encrypt_password
  		# generate a unique salt if it's a new user
  		self.salt = Digest::SHA2.hexdigest("#{Time.now.utc}--#{password}") if self.new_record?
  	
  		# encrypt the password and store that in the encrypted_password field
  		self.encrypted_password = encrypt(password)
  	end

  	# encrypt the password using both the salt and the passed password
  	def encrypt(pass)
  		Digest::SHA2.hexdigest("#{self.salt}--#{pass}")
  	end

   
end
