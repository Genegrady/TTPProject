Rails.application.routes.draw do
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get   '/auth' => 'auth#persist'
  post  '/login' => 'auth#login'
end
