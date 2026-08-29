$e = Get-Content 'frontend\.tc.log' -ErrorAction SilentlyContinue | Where-Object { $_ -match 'error TS' }
if ($e) {
  Write-Output "ERRORS=$($e.Count)"
  $e | Select-Object -First 20
} else {
  Write-Output 'NO_TS_ERRORS_OR_STILL_RUNNING'
}