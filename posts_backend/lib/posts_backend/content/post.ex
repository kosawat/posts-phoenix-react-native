defmodule PostsBackend.Content.Post do
  use Ecto.Schema
  import Ecto.Changeset

  status = %{
    unpublished: "unpublished",
    published: "published"}

  schema "posts" do
    field :body, :string
    field :published_at, :utc_datetime
    field :status, :string, default: status.unpublished
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:title, :body, :status, :published_at])
    |> validate_required([:title, :status]) # body can be blank
  end
end
