class ApplicationController < ActionController::API
    def secret
        Rails.application.credentials.secret_key_base
    end

end
