class ApplicationController < ActionController::Base
  # https://github.com/rails/rails/issues/40855
  include ActiveStorage::SetCurrent
end
