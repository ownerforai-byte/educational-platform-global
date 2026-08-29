$ErrorActionPreference = 'Stop'
$container = 'neb_pg_test'
$workspace = 'C:\Users\ASUS\Desktop\educational-platform-global'

docker rm -f $container 2>$null | Out-Null
Write-Host "Starting postgres:16 container..."
docker run -d --name $container -e POSTGRES_PASSWORD=test -e POSTGRES_DB=nebtest -v "${workspace}:/workspace" postgres:16 | Out-Null

Write-Host "Waiting for Postgres to become ready..."
for ($i=0; $i -lt 60; $i++) {
  docker exec $container pg_isready -U postgres 2>$null | Out-Null
  if ($LASTEXITCODE -eq 0) { break }
  Start-Sleep -Seconds 2
}

Write-Host "=== Running local_setup.sql (as postgres) ==="
docker exec $container psql -U postgres -d nebtest -v ON_ERROR_STOP=1 -f /workspace/scripts/local_setup.sql

Write-Host "=== Running local_tests.sql (as appuser) ==="
docker exec $container bash -c "PGPASSWORD=testpass psql -h localhost -U appuser -d nebtest -v ON_ERROR_STOP=1 -f /workspace/scripts/local_tests.sql"

Write-Host "=== Cleaning up container ==="
docker stop $container | Out-Null
docker rm -f $container | Out-Null
