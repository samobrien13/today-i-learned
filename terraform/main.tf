terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
}

resource "vercel_project" "default" {
  name      = "today-i-learned"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = "samobrien13/today-i-learned"
  }
}

resource "vercel_project_domain" "default" {
  project_id = vercel_project.default.id
  domain     = "todayilearned.au"
}

resource "vercel_project_domain" "root" {
  project_id           = vercel_project.default.id
  domain               = "www.todayilearned.au"
  redirect             = "todayilearned.au"
  redirect_status_code = 308
}

