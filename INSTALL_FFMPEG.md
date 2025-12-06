# How to Install FFmpeg on Windows

## Method 1: Direct Download (Recommended - Easiest)

### Step 1: Download FFmpeg
1. Visit: https://www.gyan.dev/ffmpeg/builds/
2. Click **"Download Build"** (ffmpeg-release-essentials.zip)
3. Or direct link: https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip

### Step 2: Extract and Install
1. Extract the ZIP file to a location (e.g., `C:\ffmpeg`)
2. Copy the path to the `bin` folder (e.g., `C:\ffmpeg\bin`)

### Step 3: Add to PATH
1. Press `Win + X` → Select **"System"**
2. Click **"Advanced system settings"**
3. Click **"Environment Variables"**
4. Under "System variables", find **"Path"** → Click **"Edit"**
5. Click **"New"** → Paste the path (e.g., `C:\ffmpeg\bin`)
6. Click **"OK"** on all windows

### Step 4: Verify Installation
Open a **new** Command Prompt or PowerShell and run:
```bash
ffmpeg -version
```

If you see version information, FFmpeg is installed! ✅

---

## Method 2: Using Chocolatey (If Installed)

If you have Chocolatey installed:

```bash
# Open PowerShell as Administrator
choco install ffmpeg -y
```

**To install Chocolatey first:**
1. Open PowerShell as Administrator
2. Run:
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

---

## Method 3: Using winget (Windows Package Manager)

If you have Windows 10/11 with winget:

```bash
winget install ffmpeg
```

---

## Method 4: Using Scoop

If you have Scoop installed:

```bash
scoop install ffmpeg
```

---

## Quick Test After Installation

Once FFmpeg is installed, test it:

```bash
ffmpeg -version
```

You should see something like:
```
ffmpeg version 6.x.x Copyright (c) 2000-2024...
```

---

## Next Steps After Installation

Once FFmpeg is installed, you can:

1. **Compress your videos** using the provided scripts
2. **Run the compression script:**
   ```bash
   node compress-videos.js
   ```
3. **Or compress manually:**
   ```bash
   ffmpeg -i assets/videos/home.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart assets/videos/home-optimized.mp4
   ```

---

## Troubleshooting

### "ffmpeg is not recognized"
- Make sure you added FFmpeg to PATH
- **Restart** your terminal/command prompt
- Try opening a **new** terminal window

### "Permission denied"
- Make sure you're running as Administrator (for Chocolatey)
- Or use Method 1 (direct download) which doesn't need admin

### Still having issues?
Use Method 1 (direct download) - it's the most reliable!

---

*Last Updated: December 9, 2024*

