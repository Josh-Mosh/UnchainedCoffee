class ShopsController < ApplicationController
  layout "shop_layout"

  def new
    if !session[:user_id]
      flash[:adderror] = "You must be logged in to add new coffee shops"
      redirect_to :back
    else
      @shop = Shop.new
      render layout: "add_layout"
    end
  end

  def create
    puts params
    shop = params[:shop]
    @user = User.find(session[:user_id])
    address = [shop[:number], shop[:street], shop[:city], shop[:state], shop[:zip], shop[:cntry]].compact.join(', ')
    @shop = @user.shops.create(shop_params)
    @address = Address.new(address: address)
    @shop.address = @address
    
    puts "\n\n\n\n\n\nShop Info", @shop.inspect

    @shop.save
    if @shop.save
      @new_activity = @user.activities.create(shop_id: @shop.id, kind: "newshop")

      puts "came here\n\n\n\n\n\n"
      if shop[:url]
        @shop.external_images.create(url: params[:shop][:url])
      end
    else
      flash.now[:errors] = @shop.errors.full_messages
      render text: "error"
    end
  end

  def edit
  end

  def update
  end

  def show
    @user = User.new
    @newcomment = Comment.new
    @favorite = Favorite.new
    @showshop = Shop.find(params[:id])

    gon.shopAddress = @showshop.address
    gon.shopInfo = @showshop

    @comments = Comment.all.where("shop_id = #{params[:id]}")
    render layout: "shop_layout"
  end

  def destroy
  end

  def near
    @favorite = Favorite.new
    @allshops = Shop.all
    @shown_shops = []
    @user = User.new
    @allshops.each do |shop|
      if shop.address.latitude < params[:north].to_f and shop.address.latitude > params[:south].to_f and shop.address.longitude < params[:east].to_f and shop.address.longitude > params[:west].to_f
        if @shown_shops.length < 50
          @shown_shops.push(shop)
        end
      end
    end
  end

  private

  def shop_params
    params.require(:shop).permit(:name, :street, :city, :state, :zip, :description, :website, :pricing, :address, :photo, :category_ids)
  end

  # def user_params
  #   params.require(:shop).permit(:name, :street, :city, :state, :zip, :description, :website, :pricing, :image, :address, :category_ids)
  # end
end
