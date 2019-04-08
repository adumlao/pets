class PostsController < ApplicationController
  before_action :ensure_signed_in

  def index
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

  private

  def post_params
    params.require(:post).permit(:body, :description, :user_id)
  end
end
