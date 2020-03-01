class User < ApplicationRecord
    has_secure_password

    has_many :transactions
    accepts_nested_attributes_for :transactions, :allow_destroy => true

    validates_confirmation_of :password, allow_nil: true, allow_blank: false
    before_validation{
       (self.email = self.email.to_s.downcase) 
    }
    validates :email, uniqueness: true, presence: true

    def stocks
        stock_hash = {}
        self.transactions.map { |s| 
            if stock_hash[s.ticker]
                stock_hash[s.ticker] += s.quantity
            else
                stock_hash[s.ticker] = s.quantity
            end 
        }
        return stock_hash
    end
end
