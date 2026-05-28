output "swa_url" {
  description = "URL pública do Static Web App"
  value       = azurerm_static_web_app.main.default_host_name
}

output "swa_deployment_token" {
  description = "Token usado pelo GitHub Actions para fazer deploy"
  value       = azurerm_static_web_app.main.api_key
  sensitive   = true
}
