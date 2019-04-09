class UsersController < ApplicationController
  skip_before_action :ensure_signed_in, only: [:create, :login]

  def gen_token(user_id)
    payload = {id: user_id}
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def create
    email = params[:email]
    password = params[:password]
    name = params[:name]

    new_user = User.new({
      password: password,
      email: email,
      name: name
    })


    if new_user.valid?
      new_user.save!
      user_data = {
        name: name,
        email: email
      }
      render json: { user: user_data, token: gen_token(new_user.id)}
    else
      render nothing: true, status: 401
    end
  end

  def login
    email = params[:email]
    password = params[:password]

    user = User.find_from_credentials email, password
    if user.nil?
      render nothing: true, status: 401
    else
      render json: {user: user, token: gen_token(user.id)}
    end
  end

  def verify
    ensure_signed_in
    render json: { user: current_user }
  end

  def index
    render json: { users: User.all }
  end

  def show
    user = User.find(params[:id])
    render json: { user: user }
  end


 def update
   user = User.find(params[:id])
   user.update!(user_params)
     render json: { user: user }
  end

  def user_params
    params.require(:user).permit(:email, :name, :bio, :location, :profile_pic, :banner)
  end

end
