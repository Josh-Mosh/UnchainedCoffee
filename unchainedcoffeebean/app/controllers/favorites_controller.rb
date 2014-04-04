class FavoritesController < ApplicationController
  def create
    puts "\n\n\n\n", params

  	if session[:user_id]
	  	@user = User.find(session[:user_id])
  		@favorite = @user.favorites.create(shop_id: params[:favorite][:shop_id])	
  		if @favorite.save
  			flash[:success] = "Added to Favorites"
        @activity = @user.activities.create(shop_id: params[:favorite][:shop_id], kind: "favorite")
          if @activity.save
            @new_activity = @activity
            flash.now[:newactivity] = 'new activity!'
          else
            flash[:activityerror] = @activity.errors.full_messages
          end
  		else
  			flash[:favoriteerror] = @favorite.errors.full_messages
  		end

  	end
  end

  def destroy
  	puts "\n\n\n\n\n\n", params
  	user = User.find(session[:user_id])
  	user.favorites.where("shop_id = #{params[:favorite][:shop_id]}").each do |favorite|
  		Favorite.destroy(favorite.id)
  	end
  end
end
