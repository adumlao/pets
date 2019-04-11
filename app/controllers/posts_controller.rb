class PostsController < ApplicationController
  before_action :ensure_signed_in

    def index
      @user = User.find(params[:user_id])
      @posts = Post.where(user_id: @user.id)
      posts = @posts.order("created_at desc")
      render json: posts
    end

  def all
    render json: { posts: Post.order("created_at desc").all }
  end

  def create
    post = current_user.posts.create!(post_params)
    render json: { post: post }
  end

  def update
    post = Post.find(params[:id])
    if post.user == current_user
      post.update!(post_params)
      render json: { post: post }
    else
      render :unauthorized
    end
  end

  def show
    @user = User.find(params[:user_id])
    @post = Post.find(params[:id])
    render json: @post
  end

  def destroy
    @post = Post.find(params[:id])
    @user = User.find(params[:user_id])
    @post.destroy
    head 204
  end

  private

  def post_params
    params.require(:post).permit(:body, :description, :posted_by, :user_id)
  end
end
