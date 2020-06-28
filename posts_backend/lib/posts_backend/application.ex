defmodule PostsBackend.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      PostsBackend.Repo,
      # Start the Telemetry supervisor
      PostsBackendWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: PostsBackend.PubSub},
      # Start the Endpoint (http/https)
      PostsBackendWeb.Endpoint
      # Start a worker by calling: PostsBackend.Worker.start_link(arg)
      # {PostsBackend.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: PostsBackend.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    PostsBackendWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
