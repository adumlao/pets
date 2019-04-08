class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :name
      t.string :bio
      t.string :location
      t.string :profile_pic
      t.string :banner

      t.timestamps
    end
  end
end
