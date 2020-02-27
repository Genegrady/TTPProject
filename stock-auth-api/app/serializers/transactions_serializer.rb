class TransactionsSerializer < ActiveModel::Serializer
  attributes :id, :price, :quantity, :ticker
end
