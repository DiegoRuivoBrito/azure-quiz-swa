output "swa_url" {
  description = "URL pública do Static Web App"
  value       = azurerm_static_web_app.main.default_host_name
}

output "swa_deployment_token" {
  description = "Token usado pelo GitHub Actions para fazer deploy"
  value       = azurerm_static_web_app.main.api_key
  sensitive   = true
}

output "cosmosdb_endpoint" {
  description = "Endpoint do Cosmos DB — usado como variável de ambiente na Function"
  value       = azurerm_cosmosdb_account.main.endpoint
}

output "cosmosdb_primary_key" {
  description = "Chave primária do Cosmos DB — usar só para configurar o app setting, nunca commitar"
  value       = azurerm_cosmosdb_account.main.primary_key
  sensitive   = true
}
