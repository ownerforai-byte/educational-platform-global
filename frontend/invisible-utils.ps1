param([string]$Action = 'scan')
$path = 'C:\Users\ASUS\Desktop\rn\frontend\components\lab\vectors-all-conditions-3d.tsx'
$t = [IO.File]::ReadAllText($path)
$hexs = '3164 200B 200C 200D FEFF 2060 180E'.Split(' ')
$cps = New-Object System.Collections.Generic.List[int]
foreach ($h in $hexs) {
  $h2 = $h -replace '[^0-9A-Fa-f]',''
  if ($h2 -ne '') { $cps.Add([Convert]::ToInt32($h2, [Globalization.NumberStyles]::HexNumber)) }
}
$cls = New-Object System.Collections.Generic.List[string]
foreach ($cp in $cps) { $cls.Add([regex]::Escape([char]::ConvertFromUtf32($cp))) }
$re = New-Object Text.RegularExpressions.Regex('[' + ($cls -join '') + ']')
$before = $re.Matches($t).Count
Write-Host ('MATCHES_BEFORE=' + $before)
if ($Action -eq 'strip') {
  [IO.File]::WriteAllText($path, $re.Replace($t, ''))
  Write-Host 'STRIPPED_OK'
}