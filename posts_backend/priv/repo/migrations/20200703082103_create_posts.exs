defmodule PostsBackend.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    execute("CREATE TYPE post_status AS ENUM('unpublished', 'published');")
    create table(:posts) do
      add :title, :string, null: false
      add :body, :text
      add :status, :post_status, null: false, default: "unpublished"
      add :published_at, :utc_datetime

      timestamps()
    end

  end
end
