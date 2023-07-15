resource "digitalocean_project" "nullsheen" {
  name        = "nullsheen"
  description = "nullsheen.com project"
  purpose     = "Web Application"
  environment = "Production"
  resources   = [
  digitalocean_app.sr-initiative-tracker.urn,
  digitalocean_domain.nullsheen.urn
  ]
}