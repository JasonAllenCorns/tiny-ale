Rails.application.routes.draw do

  resources :students
  resources :statuses, controller: 'status'

end