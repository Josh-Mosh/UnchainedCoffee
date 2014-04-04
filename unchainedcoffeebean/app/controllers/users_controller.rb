class UsersController < ApplicationController
  layout "coffee_beans_layout"
  def index
  end

  def new
  end

  def create
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

  def edit
  end

  def update
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
    params.require(:user).permit(:first_name, :last_name, :email, :birthdate, :gender, :password, :password_confirmation, :avatar, :bio)
  end
end
