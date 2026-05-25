terraform {
  required_version = "1.15.4"
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "5.3.0"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
}

resource "vercel_project" "default" {
  name                                 = "today-i-learned"
  framework                            = "nextjs"
  node_version                         = "24.x"
  build_machine_type                   = null
  enable_affected_projects_deployments = false
  enable_preview_feedback              = false
  enable_production_feedback           = false
  git_repository = {
    type = "github"
    repo = "samobrien13/today-i-learned"
  }
  resource_config = {
    fluid = true
    function_default_regions = [
      "syd1",
    ]
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

