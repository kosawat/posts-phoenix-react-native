defmodule PostsBackend.Repo do
  use Ecto.Repo,
    otp_app: :posts_backend,
    adapter: Ecto.Adapters.Postgres
end
