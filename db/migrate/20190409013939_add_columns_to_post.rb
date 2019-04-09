class AddColumnsToPost < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :posted_by, :string
  end
end
