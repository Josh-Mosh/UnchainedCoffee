class CommentsController < ApplicationController
  def create
  	puts params

  	shop = Shop.find(params[:comment][:shop_id])
  	user = User.find(session[:user_id])

  	@comment = user.comments.create(message: params[:comment][:message])
  	shop.comments += [@comment]

  	if @comment.save
  		flash[:success] = "Comment Posted"
  	else
  		flash[:errors] = "Comment could not be posted"
  	end
  	redirect_to :back
  end

  def destroy
  end
end
