resource "digitalocean_app" "sr-initiative-tracker" {
  spec {
    name   = "sr-initiative-tracker"
    region = "nyc"
    domain {
      name = "initiative-tracker.nullsheen.com"
      type = "PRIMARY"
      zone = "nullsheen.com"
    }

    static_site {
      name          = "sr-initiative-tracker"
      build_command = "npm run build"
      output_dir    = "/build"

      git {
        repo_clone_url = "https://github.com/criticalfault/sr-initiative-tracker.git"
        branch         = "main"
      }
    }
  }
}