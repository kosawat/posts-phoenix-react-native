defmodule PostsBackendWeb.PostView do
  use PostsBackendWeb, :view
  alias PostsBackendWeb.PostView

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, PostView, "post.json")}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, PostView, "post.json")}
  end

  def render("post.json", %{post: post}) do
    %{id: post.id,
      title: post.title,
      body: post.body,
      status: post.status,
      published_at: post.published_at,
      created_at: post.inserted_at,
      updated_at: post.updated_at}
  end
end
