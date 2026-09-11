$path = 'C:\Users\ASUS\Desktop\rn\frontend\components\lab\vectors-all-conditions-3d.tsx'
$content = [System.IO.File]::ReadAllText($path)
$lines = $content -split [Environment]::NewLine
$bad = [System.Collections.Generic.List[string]]::new()
for ($i = 0; $i -lt $lines.Count; $i++) {
  $l = $lines[$i]
  $found = @()
  for ($j =  ​0; $j -lt $l.Length; $j++) {
    $code = [int][char]$l[$j]
    if (($code -eq 0x3164) -or ($code -eq 0x200B) -or ($code -eq 0x200C) -or ($code -eq 0x200D) -or ($code -eq 0xFEFF) -or ($code -eq 0x2060) -or ($code -eq 0x180E)) {
      $found += ('U+{0:X4}' -f $code)
    }
  }
  if ($found.Count -gt 0) { $bad.Add(('Line {0}: {1}' -f ($i + 1), ($found -join ',')))) }
}
Write-Host ('TOTAL_LINES=' + $lines.Count)
if ($bad.Count -eq  ​0) { Write-Host 'NO_INVISIBLE_CHARS' } else { $bad | ForEach-Object { Write-Host $_ } }