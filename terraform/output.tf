output "URL" {
    value = digitalocean_app.matrix-gen.live_url
}

output "project_id" {
    value = digitalocean_project.nullsheen.id
}