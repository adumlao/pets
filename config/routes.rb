Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :posts
  resources :users

  get "/users/verify", to: 'users#verify'
  post "/users/login", to: 'users#login'

end
