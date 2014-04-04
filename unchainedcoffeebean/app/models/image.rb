class Image < ActiveRecord::Base

attr_accessor :photo_file_name, :photo_content_type, :photo_file_size, :photo_updated_at, :photo

  belongs_to :shop

### File Uploads
    
end
