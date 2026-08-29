$ErrorActionPreference = "Continue"
$base = "https://ravikisan.ravikisan1814.workers.dev"
$pages = @()
Get-ChildItem -Path "app" -Recurse -Filter "page.tsx" | ForEach-Object {
  $dir = $_.DirectoryName.Substring((Resolve-Path "app").Path.Length).TrimStart("\", "/")
  $dir = $dir -replace "\\", "/"
  if ($dir -notmatch "\[" -and $dir -notmatch "\]") { $pages += $dir }
}
$apis = @()
Get-ChildItem -Path "app" -Recurse -Filter "route.ts" | ForEach-Object {
  $dir = $_.DirectoryName.Substring((Resolve-Path "app").Path.Length).TrimStart("\", "/")
  $dir = $dir -replace "\\", "/"
  if ($dir -notmatch "\[" -and $dir -notmatch "\]") { $apis += $dir }
}
$results = @()
foreach ($p in $pages) {
  $url = "$base/$p"
  try {
    $r = curl.exe -s -o "$env:TEMP\check.html" -w "%{http_code}" --max-time 25 $url
  } catch { $r = "ERR" }
  $assetNote = ""
  if ($r -eq "200") {
    $js = Select-String -Path "$env:TEMP\check.html" -Pattern 'src="/_next/static/[^"]*\.js"' -AllMatches
    $refs = @()
    if ($js) { foreach ($m in $js.Matches) { $refs += $m.Groups[0].Value -replace 'src="', "" -replace '"', "" } }
    if ($refs.Count -gt 0) {
      $ref = $refs[0]
      $sr = curl.exe -s -o /dev/null -w "%{http_code}" --max-time 25 "$base$ref"
      $assetNote = " js[$($refs.Count)]first=$sr"
    }
  }
  $results += [pscustomobject]@{ Route = "/" + $p; Status = $r; Note = $assetNote }
}
foreach ($a in $apis) {
  $url = "$base/$a"
  try { $r = curl.exe -s -o /dev/null -w "%{http_code}" --max-time 25 $url } catch { $r = "ERR" }
  $results += [pscustomobject]@{ Route = "/" + $a; Status = $r; Note = "" }
}
$results | Format-Table -AutoSize
"=== NON-200 / ERRORS ==="
$results | Where-Object { $_.Status -ne "200" } | Format-Table -AutoSize