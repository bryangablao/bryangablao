@echo off
rem  Command Prompt music player - no Python needed. Uses only built-in Windows PowerShell.
set "CMDM_DIR=%~dp0"
title C:\Windows\system32\cmd.exe
powershell -NoProfile -ExecutionPolicy Bypass -Command "$s=[IO.File]::ReadAllText('%~f0'); iex $s.Substring($s.IndexOf('#PS#'+'START'))"
exit /b
#PS#START
# ---------------------------------------------------------------------------
# Type a song or artist at the prompt and press Enter.
#   pause | next | prev | vol 0-100 | np | stealth on/off | play <song> | cls | help | exit
# ---------------------------------------------------------------------------
$ErrorActionPreference = 'SilentlyContinue'
$ProgressPreference = 'SilentlyContinue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
[Console]::OutputEncoding = [Text.Encoding]::UTF8
Add-Type -AssemblyName PresentationCore

$Prompt = $env:USERPROFILE + '>'
$Tmp  = Join-Path $env:TEMP 'cmdmusic'
$Tool = Join-Path $env:LOCALAPPDATA 'cmdmusic'
New-Item -ItemType Directory -Force -Path $Tmp  | Out-Null
New-Item -ItemType Directory -Force -Path $Tool | Out-Null
$Yt = Join-Path $Tool 'yt-dlp.exe'

# first run only: fetch the small yt-dlp.exe helper (finds + downloads songs from YouTube)
if (-not (Test-Path $Yt)) {
    Write-Host 'Please wait, first-time setup...'
    try { Invoke-WebRequest -UseBasicParsing -Uri 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe' -OutFile $Yt -TimeoutSec 180 } catch {}
}

$S = @{ queue = @(); idx = 0; paused = $false; playing = $false; stealth = $true; vol = 0.8
        sj = $null; fj = $null; fails = 0; t0 = Get-Date }
$P = New-Object System.Windows.Media.MediaPlayer
$P.Volume = $S.vol
$global:Buf = ''

function Notify($m) {
    if ($S.stealth) { return }
    Write-Host -NoNewline ("`r" + (' ' * 110) + "`r")
    Write-Host $m
    Write-Host -NoNewline ($Prompt + $global:Buf)
}

# ------------------------------------------------------------ background jobs
$SearchJob = {
    param($q, $yt, $dirs)
    $ErrorActionPreference = 'SilentlyContinue'
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    [Console]::OutputEncoding = [Text.Encoding]::UTF8
    $out = New-Object System.Collections.ArrayList

    # 1) your own files
    $words = $q.ToLower().Split(' ', [StringSplitOptions]::RemoveEmptyEntries)
    foreach ($d in $dirs) {
        if (Test-Path $d) {
            Get-ChildItem -Path $d -Recurse -Depth 2 -Include *.mp3, *.wav, *.m4a, *.wma -File | ForEach-Object {
                $n = $_.BaseName.ToLower(); $ok = $true
                foreach ($w in $words) { if (-not $n.Contains($w)) { $ok = $false } }
                if ($ok -and $out.Count -lt 6) {
                    [void]$out.Add([pscustomobject]@{ title = $_.BaseName; artist = 'my music'; kind = 'file'; src = $_.FullName })
                }
            }
        }
    }

    # 2) YouTube (full songs)
    if (Test-Path $yt) {
        $lines = & $yt --flat-playlist --no-warnings --print "%(id)s`t%(title)s`t%(channel)s`t%(duration)s" "ytsearch6:$q" 2>$null
        foreach ($l in $lines) {
            $p = ("" + $l).Split("`t")
            if ($p.Count -ge 4 -and $p[0]) {
                $dur = [double]0
                if ([double]::TryParse($p[3], [ref]$dur) -and $dur -gt 900) { continue }
                if ($out.Count -lt 12) {
                    [void]$out.Add([pscustomobject]@{ title = $p[1]; artist = $p[2]; kind = 'yt'; src = $p[0] })
                }
            }
        }
    }

    # 3) 30-second previews (Deezer + iTunes)
    $enc = [uri]::EscapeDataString($q)
    try {
        $r = (Invoke-WebRequest -UseBasicParsing -Uri "https://api.deezer.com/search?limit=10&q=$enc" -TimeoutSec 10).Content | ConvertFrom-Json
        foreach ($x in $r.data) {
            if ($x.preview) { [void]$out.Add([pscustomobject]@{ title = $x.title; artist = $x.artist.name; kind = 'url'; src = $x.preview }) }
        }
    } catch {}
    foreach ($c in @('', '&country=PH')) {
        try {
            $r = (Invoke-WebRequest -UseBasicParsing -Uri ("https://itunes.apple.com/search?media=music&entity=song&limit=10" + $c + "&term=" + $enc) -TimeoutSec 10).Content | ConvertFrom-Json
            foreach ($x in $r.results) {
                if ($x.previewUrl) { [void]$out.Add([pscustomobject]@{ title = $x.trackName; artist = $x.artistName; kind = 'url'; src = $x.previewUrl }) }
            }
        } catch {}
    }
    $out
}

$FetchJob = {
    param($item, $yt, $tmp)
    $ErrorActionPreference = 'SilentlyContinue'
    [Console]::OutputEncoding = [Text.Encoding]::UTF8
    if ($item.kind -eq 'yt') {
        $f = & $yt -f "bestaudio[ext=m4a]" --no-playlist --no-warnings -o ($tmp + "\yt_%(id)s.%(ext)s") --print "after_move:filepath" --no-simulate ("https://www.youtube.com/watch?v=" + $item.src) 2>$null
        $p = $f | Select-Object -Last 1
        if ($p -and (Test-Path "$p")) { return "$p" }
        return $null
    }
    return $item.src
}

# ------------------------------------------------------------ player logic
function Fail {
    $S.fails++
    if ($S.fails -lt $S.queue.Count) { Play-Index ($S.idx + 1) } else { Notify 'Could not play that one.' }
}

function Start-Source($src) {
    $P.Open([uri]$src)
    $P.Volume = $S.vol
    $P.Play()
    $S.playing = $true; $S.paused = $false; $S.t0 = Get-Date
    $it = $S.queue[$S.idx]
    Notify ("Now playing: " + $it.title + " - " + $it.artist)
}

function Play-Index($i) {
    $n = $S.queue.Count
    if ($n -eq 0) { return }
    $i = (($i % $n) + $n) % $n
    $S.idx = $i; $S.playing = $false; $S.paused = $false
    $P.Stop()
    if ($S.fj) { Stop-Job $S.fj; Remove-Job $S.fj -Force; $S.fj = $null }
    $it = $S.queue[$i]
    Notify ("Loading: " + $it.title)
    if ($it.kind -eq 'yt' -and -not (Test-Path $Yt)) { Fail; return }
    $S.fj = Start-Job -ScriptBlock $FetchJob -ArgumentList $it, $Yt, $Tmp
}

function Search($q) {
    if ($S.sj) { Stop-Job $S.sj; Remove-Job $S.sj -Force; $S.sj = $null }
    $S.fails = 0
    $dirs = @((Join-Path $env:CMDM_DIR 'music'), (Join-Path $env:USERPROFILE 'Music'))
    Notify ("Searching: " + $q)
    $S.sj = Start-Job -ScriptBlock $SearchJob -ArgumentList $q, $Yt, $dirs
}

function Tick {
    if ($S.sj -and $S.sj.State -ne 'Running') {
        $res = @(Receive-Job $S.sj)
        Remove-Job $S.sj -Force; $S.sj = $null
        $S.queue = $res
        if ($res.Count -eq 0) { Notify 'No music found.' } else { Play-Index 0 }
    }
    if ($S.fj -and $S.fj.State -ne 'Running') {
        $path = Receive-Job $S.fj | Select-Object -Last 1
        Remove-Job $S.fj -Force; $S.fj = $null
        if ($path) { Start-Source $path } else { Fail }
    }
    if ($S.playing -and -not $S.paused) {
        if ($P.NaturalDuration.HasTimeSpan) {
            if ($P.Position -ge ($P.NaturalDuration.TimeSpan - [TimeSpan]::FromMilliseconds(400))) {
                $S.playing = $false
                if ($S.queue.Count -gt 1) { Play-Index ($S.idx + 1) }
            }
        } elseif (((Get-Date) - $S.t0).TotalSeconds -gt 10) {
            $S.playing = $false; Fail
        }
    }
}

# ------------------------------------------------------------ console input (non-blocking, so music keeps going)
function Read-Line {
    $global:Buf = ''
    Write-Host -NoNewline $Prompt
    while ($true) {
        if ([Console]::KeyAvailable) {
            $k = [Console]::ReadKey($true)
            if ($k.Key -eq 'Enter') {
                Write-Host ''
                $l = $global:Buf; $global:Buf = ''
                return $l
            } elseif ($k.Key -eq 'Backspace') {
                if ($global:Buf.Length -gt 0) {
                    $global:Buf = $global:Buf.Substring(0, $global:Buf.Length - 1)
                    Write-Host -NoNewline "`b `b"
                }
            } elseif ($k.Key -eq 'C' -and ($k.Modifiers -band [ConsoleModifiers]::Control)) {
                Write-Host '^C'
                $global:Buf = ''
                Write-Host -NoNewline $Prompt
            } elseif ([int]$k.KeyChar -ge 32) {
                $global:Buf += [string]$k.KeyChar
                Write-Host -NoNewline $k.KeyChar
            }
        } else {
            Tick
            Start-Sleep -Milliseconds 60
        }
    }
}

# ------------------------------------------------------------ commands
$HelpText = @"
Music commands (anything else you type is searched as a song):
  play <song>     force a search
  pause           pause / resume
  next, prev      skip
  vol <0-100>     volume
  np              what is playing now
  stealth on|off  fake 'not recognized' message after you type a song
  cls             clear screen
  exit            close
"@

function Handle($line) {
    $l = $line.Trim(); $low = $l.ToLower()
    $sp = $low.IndexOf(' ')
    if ($sp -lt 0) { $cmd = $low; $arg = '' } else { $cmd = $low.Substring(0, $sp); $arg = $low.Substring($sp + 1).Trim() }

    if ($low -eq 'exit' -or $low -eq 'quit') { return $false }
    if ($low -eq 'cls') { Clear-Host; return $true }
    if ($low -eq 'help') { Write-Host $HelpText; Write-Host ''; return $true }
    if ($low -eq 'pause') {
        if ($S.queue.Count -gt 0) {
            if ($S.paused) { $P.Play(); $S.paused = $false; $S.playing = $true }
            elseif ($S.playing) { $P.Pause(); $S.paused = $true; $S.playing = $false }
        }
        Write-Host ''; return $true
    }
    if ($low -eq 'next') { if ($S.queue.Count -gt 0) { Play-Index ($S.idx + 1) }; Write-Host ''; return $true }
    if ($low -eq 'prev') { if ($S.queue.Count -gt 0) { Play-Index ($S.idx - 1) }; Write-Host ''; return $true }
    if ($cmd -eq 'vol' -and $arg -match '^\d+$') {
        $S.vol = [Math]::Min(100, [int]$arg) / 100.0
        $P.Volume = $S.vol
        Write-Host ''; return $true
    }
    if ($low -eq 'np') {
        if ($S.queue.Count -gt 0) {
            $it = $S.queue[$S.idx]
            $extra = ''; if ($S.paused) { $extra = '  [paused]' }
            Write-Host ($it.title + ' - ' + $it.artist + $extra)
        } else { Write-Host 'Nothing playing.' }
        Write-Host ''; return $true
    }
    if ($cmd -eq 'stealth' -and ($arg -eq 'on' -or $arg -eq 'off')) {
        $S.stealth = ($arg -eq 'on')
        Write-Host ('Stealth ' + $arg); Write-Host ''; return $true
    }

    $query = $l
    if ($cmd -eq 'play' -and $arg) { $query = $l.Substring(5).Trim() }
    Search $query
    if ($S.stealth) {
        $word = $query.Split(' ')[0]
        Write-Host ("'" + $word + "' is not recognized as an internal or external command,")
        Write-Host 'operable program or batch file.'
    }
    Write-Host ''
    return $true
}

# ------------------------------------------------------------ main
[Console]::TreatControlCAsInput = $true
Clear-Host
$v = [Environment]::OSVersion.Version
Write-Host ("Microsoft Windows [Version " + $v.Major + "." + $v.Minor + "." + $v.Build + "]")
Write-Host "(c) Microsoft Corporation. All rights reserved."
Write-Host ''
while ($true) {
    $line = Read-Line
    if ($line.Trim() -eq '') { continue }
    if (-not (Handle $line)) { break }
}
$P.Close()
Get-Job | Remove-Job -Force
