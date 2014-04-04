class SessionsController < ApplicationController

  def create
  	user = User.authenticate(params[:session][:email], params[:session][:password])

  	if user.nil?
      render text: "Invalid email or password"
  	else
      session[:user_id] = user.id
      render text: "success"
    end
  end

  def destroy
  	session[:user_id] = nil
  	redirect_to '/'
  end
end
