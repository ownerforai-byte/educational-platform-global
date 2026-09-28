param([string]$Mode = "report")
Set-Location "$PSScriptRoot\.."
if ($Mode -eq "baseline") {
  node node_modules/tsx/dist/cli.mjs frontend/scripts/content/validate.ts --write-baseline 1> validate-out.txt 2>&1
} elseif ($Mode -eq "strict") {
  node node_modules/tsx/dist/cli.mjs frontend/scripts/content/validate.ts --strict 1> validate-out.txt 2>&1
} else {
  node node_modules/tsx/dist/cli.mjs frontend/scripts/content/validate.ts 1> validate-out.txt 2>&1
}
Set-Content -Path validate-exit.txt -Value "exit=$LASTEXITCODE"
