# PostsBackend

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `npm install` inside the `assets` directory
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix


  ## Development Steps
  * Generates controller, views, and context for the Post, which is going to be a JSON resource.
    *  mix phx.gen.json Content Post posts title:string body:text status:string published_at:utc_datetime
  * Add CREAT TYPE post_status AS ENUM('unpublished', 'published'); in the migration file
  * Add Route /api/posts in router.ex for the CRUD operations via api
