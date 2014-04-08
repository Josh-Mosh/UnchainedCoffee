class UsersController < ApplicationController
  layout "coffee_beans_layout"

  def create

    puts "\n\n\n\n\n\n", params

    user = params[:user]
    @user = User.create(user_params)
    # @user = User.new(first_name: user[:first_name], last_name: user[:last_name], email: user[:email], birthdate: user[:birthdate], gender: user[:gender], password: user[:password], password_confirmation: user[:password_confirmation], bio: user[:bio])
    @address = Address.new(address: user[:address])
    @user.address = @address
    if @user.save
      puts "\n\n\n\n\n\nSAVED got here"
      render text: "success"
    else
      errarr = [];
      @user.errors.full_messages.each do |error|
        errarr.push(error);
      end
      render json: errarr
    end
  end

  def update
    @user = User.find(params[:id])
    puts "\n\n\n\n\n\n", @user.first_name
    @user.update(user_update_params)
    if @user.save 
      render text: "success"
    end
  end 

  def show
    @user = User.new

    if session[:user_id]
      @current_user = User.find(session[:user_id])
    end
    @showuser = User.find(params[:id])
  end

  def destroy
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :birthdate, :gender, :password, :password_confirmation, :bio, :avatar, :address)
  end

  def user_update_params
    params.require(:user).permit(:first_name, :last_name, :birthdate, :bio, :address)
  end

end
