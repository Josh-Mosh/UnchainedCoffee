class Address < ActiveRecord::Base
	belongs_to :addressable, polymorphic: true

	geocoded_by :address
	after_validation :geocode
end
