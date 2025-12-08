# Complete Guide: Optimizing Large Videos for Static Websites

## 🎯 Goal
Reduce video file sizes by 60-80% while maintaining acceptable quality for web use.

---

## 📊 Current Situation

**Your Videos:**
- home.mp4: **21 MB**
- Zaabal.mp4: **74 MB** (largest!)
- Emara.mp4: **56 MB**
- Others: 15-42 MB each
- **Total: ~441 MB**

**Target After Optimization:**
- home.mp4: **5-8 MB**
- Large videos: **15-20 MB**
- Medium videos: **8-12 MB**
- Small videos: **5-8 MB**
- **Total: ~150-200 MB** (60-70% reduction)

---

## 🛠️ Method 1: FFmpeg (Best Quality & Control)

### Step 1: Install FFmpeg

**Windows:**
```bash
# Option 1: Using Chocolatey (recommended)
choco install ffmpeg

# Option 2: Manual download
# Visit: https://ffmpeg.org/download.html
# Download Windows build, extract, add to PATH
```

**Mac:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install ffmpeg
```

### Step 2: Basic Compression Command

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart output.mp4
```

**Parameters Explained:**
- `-c:v libx264`: Use H.264 codec (best browser support)
- `-crf 28`: Quality (18-28 is good, 28 = smaller file)
- `-preset slow`: Better compression (slower encoding)
- `-c:a aac`: Audio codec
- `-b:a 128k`: Audio bitrate (128k is good for web)
- `-movflags +faststart`: Enables streaming (important!)

### Step 3: Compress Specific Videos

**For home.mp4 (21 MB → 5-8 MB):**
```bash
ffmpeg -i assets/videos/home.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart assets/videos/home-optimized.mp4
```

**For large videos (Zaabal 74 MB → 20 MB):**
```bash
ffmpeg -i assets/videos/Zaabal.mp4 -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 128k -movflags +faststart -vf "scale=1920:1080" assets/videos/Zaabal-optimized.mp4
```

**For medium videos (15-30 MB → 8-12 MB):**
```bash
ffmpeg -i assets/videos/Kendy.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart assets/videos/Kendy-optimized.mp4
```

### Step 4: Quality Settings Guide

| Use Case | CRF | Resolution | Target Size |
|----------|-----|------------|-------------|
| Background video (home) | 28-30 | 1920x1080 | <8 MB |
| Large project videos | 26-28 | 1920x1080 | <20 MB |
| Medium project videos | 28 | 1920x1080 | <12 MB |
| Small project videos | 28-30 | 1920x1080 | <8 MB |

**CRF Values:**
- 18-22: High quality (larger files)
- 23-27: Good quality (balanced)
- 28-30: Acceptable quality (smaller files) ✅ **Recommended for web**
- 31+: Lower quality (very small files)

---

## 🖥️ Method 2: HandBrake (GUI - Easier to Use)

### Step 1: Download HandBrake
- Visit: https://handbrake.fr/
- Download and install

### Step 2: Compression Settings

1. **Open HandBrake** → Click "Open Source" → Select your video

2. **Preset**: Choose "Fast 1080p30" or "Web/General"

3. **Video Tab:**
   - Video Codec: H.264 (x264)
   - Framerate: Same as source (or 30 fps)
   - Quality: RF 28 (slider)

4. **Audio Tab:**
   - Codec: AAC
   - Bitrate: 128 kbps

5. **Dimensions Tab:**
   - Keep original resolution (or scale down if needed)

6. **Click "Start Encode"**

### Step 3: Check File Size
- Compare original vs compressed
- If too large, increase RF value (28 → 30)
- If quality too low, decrease RF value (28 → 26)

---

## 🌐 Method 3: Online Tools (No Installation)

### Option A: CloudConvert
1. Visit: https://cloudconvert.com/
2. Upload video
3. Format: MP4
4. Video Codec: H.264
5. Quality: Medium/High
6. Convert and download

**Limitations:** Free accounts have file size limits

### Option B: FreeConvert
1. Visit: https://www.freeconvert.com/
2. Upload video
3. Choose compression level
4. Convert and download

---

## 🚀 Automated Script (Batch Compression)

I've created a script for you! Use it:

```bash
node compress-videos.js
```

**Before running:**
1. Install FFmpeg (see Method 1)
2. Make sure Node.js is installed
3. Run the script

The script will:
- Compress all videos automatically
- Show progress and file sizes
- Create optimized versions

---

## 📐 Advanced Optimization Techniques

### 1. Resolution Scaling

If video is larger than 1920x1080, scale it down:

```bash
ffmpeg -i input.mp4 -vf "scale=1920:1080" -c:v libx264 -crf 28 output.mp4
```

### 2. Frame Rate Reduction

If video is 60fps, reduce to 30fps (saves ~50%):

```bash
ffmpeg -i input.mp4 -r 30 -c:v libx264 -crf 28 output.mp4
```

### 3. Two-Pass Encoding (Best Quality)

For maximum compression:

```bash
# Pass 1
ffmpeg -i input.mp4 -c:v libx264 -b:v 2M -pass 1 -f null /dev/null

# Pass 2
ffmpeg -i input.mp4 -c:v libx264 -b:v 2M -pass 2 -c:a aac -b:a 128k output.mp4
```

### 4. WebM Format (Better Compression)

WebM is 20-30% smaller than MP4:

```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k output.webm
```

**Note:** Use both MP4 and WebM for best browser support:
```html
<video>
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
</video>
```

---

## 🎬 Recommended Settings by Video Type

### Background Video (home.mp4)
```bash
ffmpeg -i home.mp4 \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -vf "scale=1920:1080" \
  -r 30 \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  home-optimized.mp4
```
**Target:** 5-8 MB

### Large Project Videos (Zaabal, Emara)
```bash
ffmpeg -i Zaabal.mp4 \
  -c:v libx264 \
  -crf 26 \
  -preset slow \
  -vf "scale=1920:1080" \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  Zaabal-optimized.mp4
```
**Target:** 15-20 MB

### Regular Project Videos
```bash
ffmpeg -i Kendy.mp4 \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  Kendy-optimized.mp4
```
**Target:** 8-12 MB

---

## ✅ Step-by-Step Workflow

### 1. Backup Original Videos
```bash
# Create backup folder
mkdir assets/videos/originals
cp assets/videos/*.mp4 assets/videos/originals/
```

### 2. Compress Videos

**Option A: Use the script**
```bash
node compress-videos.js
```

**Option B: Manual compression**
Compress each video using FFmpeg commands above.

### 3. Test Quality
- Watch compressed videos
- Compare with originals
- Adjust CRF if needed (lower = better quality, larger file)

### 4. Update References

**Update `assets/js/variables.js`:**
```javascript
// Change from:
video: `${BASE_PRO_VIDEO_URL}Kendy.mp4`,

// To:
video: `${BASE_PRO_VIDEO_URL}Kendy-optimized.mp4`,
```

**Or rename files:**
```bash
# Remove -optimized suffix after testing
mv Kendy-optimized.mp4 Kendy.mp4
```

### 5. Upload to Server
- Upload optimized videos
- Keep originals as backup
- Test website performance

---

## 📊 Expected Results

| Video | Original | Optimized | Reduction |
|-------|----------|-----------|-----------|
| home.mp4 | 21 MB | 5-8 MB | 60-70% |
| Zaabal.mp4 | 74 MB | 15-20 MB | 73-80% |
| Emara.mp4 | 56 MB | 12-15 MB | 73-80% |
| Others | 15-42 MB | 5-12 MB | 50-70% |
| **Total** | **441 MB** | **~150 MB** | **66%** |

---

## 🎯 Quick Start (5 Minutes)

### For home.mp4:

```bash
ffmpeg -i assets/videos/home.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart assets/videos/home-optimized.mp4
```

Then update `index.html`:
```html
<source src="./assets/videos/home-optimized.mp4" type="video/mp4" />
```

**Saves ~13-16 MB immediately!**

---

## 🔍 Quality Testing

### How to Test:

1. **Watch the video** - Does it look acceptable?
2. **Check file size** - Is it small enough?
3. **Test on website** - Does it load fast?

### If Quality Too Low:
- Decrease CRF: 28 → 26 (better quality, larger file)
- Use slower preset: `slow` → `veryslow` (better compression)

### If File Too Large:
- Increase CRF: 28 → 30 (lower quality, smaller file)
- Reduce resolution: 1920x1080 → 1280x720
- Reduce frame rate: 60fps → 30fps

---

## 💡 Pro Tips

1. **Always keep originals** as backup
2. **Test on actual website** before deploying
3. **Use `-movflags +faststart`** for web streaming
4. **Consider WebM format** for even better compression
5. **Compress in batches** - don't do all at once
6. **Monitor file sizes** - aim for 60-70% reduction

---

## 🚨 Common Issues

### Issue: "FFmpeg not found"
**Solution:** Install FFmpeg and add to PATH

### Issue: "File still too large"
**Solution:** Increase CRF value or reduce resolution

### Issue: "Quality too low"
**Solution:** Decrease CRF value or use slower preset

### Issue: "Video won't play"
**Solution:** Ensure `-movflags +faststart` is included

---

## 📝 Checklist

- [ ] Install FFmpeg or HandBrake
- [ ] Backup original videos
- [ ] Compress home.mp4 first (test)
- [ ] Compress all project videos
- [ ] Test video quality
- [ ] Update video references in code
- [ ] Test website performance
- [ ] Upload optimized videos to server

---

## 🎬 Final Recommendations

**For Your Website:**

1. **Home video**: CRF 28, 1920x1080 → **5-8 MB**
2. **Large videos**: CRF 26, 1920x1080 → **15-20 MB**
3. **Regular videos**: CRF 28, 1920x1080 → **8-12 MB**
4. **Use `preload="none"`** for project videos (already done ✅)
5. **Lazy load videos** (already implemented ✅)

**Expected Performance:**
- Initial page load: **50-70% faster**
- Project pages: **60-80% faster**
- Bandwidth usage: **60-70% reduction**

---

*Last Updated: December 9, 2024*



