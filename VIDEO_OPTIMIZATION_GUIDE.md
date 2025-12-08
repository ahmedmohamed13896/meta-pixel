# Video Optimization Guide

## Current Video Situation

**Total Video Size**: ~441 MB  
**Largest Video**: Zaabal.mp4 (74 MB)  
**Home Video**: home.mp4 (21 MB)

### Video Sizes:
- Zaabal.mp4: **74 MB** 🔴
- Emara.mp4: **56 MB** 🔴
- Sor.mp4: **42 MB** 🔴
- Zeein.mp4: **41 MB** 🔴
- Tadawl.mp4: **33 MB** 🟡
- Asr-herfa.mp4: **28 MB** 🟡
- Qshla.mp4: **27 MB** 🟡
- Camel.mp4: **26 MB** 🟡
- home.mp4: **21 MB** 🟡
- Rally.mp4: **22 MB** 🟡
- Kendy.mp4: **16 MB** 🟢
- Aqwan.mp4: **15 MB** 🟢
- meta-demo_desktop-commpressed.mp4: **7.9 MB** ✅ (already optimized!)

---

## 🎯 Optimization Strategies

### Strategy 1: Compress Videos (Recommended)

**Target Sizes:**
- Home video: <5 MB
- Project videos: <10-15 MB each
- Large videos (Zaabal, Emara): <20 MB

**Tools:**
1. **FFmpeg** (Command line - best quality/size ratio)
2. **HandBrake** (GUI - easier to use)
3. **Online tools** (CloudConvert, FreeConvert)

### Strategy 2: Lazy Load Videos

- Don't load videos until user scrolls near them
- Use `preload="none"` for project videos
- Only load video when user clicks play

### Strategy 3: Use Video CDN

- Upload videos to YouTube/Vimeo (unlisted)
- Use iframe embedding
- Or use Cloudflare Stream, AWS CloudFront

### Strategy 4: Multiple Quality Options

- Provide different quality versions
- Let browser choose based on connection

---

## 🚀 Quick Fixes (Immediate)

### 1. Use Compressed Home Video (5 minutes)

You already have `meta-demo_desktop-commpressed.mp4` (7.9 MB)!

**Update `index.html` line 123:**
```html
<!-- Change from: -->
<source src="./assets/videos/home.mp4" type="video/mp4" />

<!-- To: -->
<source src="./assets/videos/meta-demo_desktop-commpressed.mp4" type="video/mp4" />
```

**Saves: 13 MB on initial load!**

### 2. Add Lazy Loading to Project Videos

**Update `project.html` line 67:**
```html
<!-- Change from: -->
<video controls id="video">

<!-- To: -->
<video controls id="video" preload="none" poster="./assets/images/poster.webp">
```

**Update `assets/js/project-details.js`:**
Add lazy loading - only load video when in viewport or user clicks.

### 3. Add Preload None to All Videos

Videos should not preload until needed.

---

## 📦 Compression Methods

### Method 1: Using FFmpeg (Best Quality)

**Install FFmpeg:**
- Windows: Download from https://ffmpeg.org/download.html
- Mac: `brew install ffmpeg`
- Linux: `sudo apt-get install ffmpeg`

**Compress a video:**
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart output.mp4
```

**Parameters:**
- `-crf 28`: Quality (18-28 is good, 28 = smaller file)
- `-preset slow`: Better compression (slower encoding)
- `-b:a 128k`: Audio bitrate
- `-movflags +faststart`: Enables streaming

### Method 2: Using HandBrake (GUI)

1. Download HandBrake: https://handbrake.fr/
2. Open video file
3. Preset: "Fast 1080p30" or "Web/General"
4. Adjust quality slider (lower = smaller file)
5. Start encoding

### Method 3: Online Tools

1. **CloudConvert**: https://cloudconvert.com/
2. **FreeConvert**: https://www.freeconvert.com/
3. Upload video → Choose compression → Download

**Note**: Online tools have file size limits for free accounts.

---

## 🔧 Implementation Steps

### Step 1: Compress Videos

**Option A: Use the provided script**
```bash
node compress-videos.js
```

**Option B: Manual compression**
Use FFmpeg or HandBrake to compress each video.

**Target sizes:**
- home.mp4: 21 MB → **5 MB**
- Zaabal.mp4: 74 MB → **20 MB**
- Emara.mp4: 56 MB → **15 MB**
- Others: Reduce by 50-70%

### Step 2: Update HTML Files

1. **index.html**: Use compressed home video
2. **project.html**: Add `preload="none"` to video tag
3. Update video paths in `assets/js/variables.js`

### Step 3: Implement Lazy Loading

Only load videos when:
- User scrolls near the video
- User clicks play button
- Video enters viewport

### Step 4: Test

1. Test compressed videos for quality
2. Check file sizes
3. Verify website performance

---

## 📊 Expected Results

### Before Optimization:
- Total videos: 441 MB
- Home page load: Slow (21 MB video)
- Project pages: Very slow (15-74 MB videos)

### After Optimization:
- Total videos: ~150-200 MB (60-70% reduction)
- Home page load: Fast (5-8 MB video)
- Project pages: Fast (8-20 MB videos)

### Performance Improvement:
- **Initial page load**: 50-70% faster
- **Project page load**: 60-80% faster
- **Bandwidth usage**: 60-70% reduction

---

## 🎬 Video Compression Settings

### For Background Videos (Home):
- Resolution: 1920x1080 or lower
- Bitrate: 2-3 Mbps
- CRF: 28-30
- Target: <5 MB

### For Project Videos:
- Resolution: 1920x1080 or lower
- Bitrate: 3-5 Mbps
- CRF: 26-28
- Target: <15 MB

### For Large Videos (Zaabal, Emara):
- Resolution: Consider 1280x720
- Bitrate: 4-6 Mbps
- CRF: 26
- Target: <20 MB

---

## ⚠️ Important Notes

1. **Quality vs Size**: Lower file size = lower quality. Test to find balance.

2. **Original Files**: Keep original videos as backup before compressing.

3. **Testing**: Always test compressed videos before deploying.

4. **Browser Support**: MP4 (H.264) is supported by all browsers.

5. **Mobile**: Consider even smaller versions for mobile devices.

---

## 🚀 Quick Start

### Immediate Action (5 minutes):
1. Update `index.html` to use `meta-demo_desktop-commpressed.mp4`
2. Add `preload="none"` to project videos
3. **Saves ~13 MB immediately!**

### Full Optimization (1-2 hours):
1. Install FFmpeg
2. Run compression script or compress manually
3. Update all video references
4. Test and deploy

---

## 📝 Checklist

- [ ] Use compressed home video (7.9 MB version)
- [ ] Add `preload="none"` to project videos
- [ ] Compress all project videos
- [ ] Update video paths in JavaScript
- [ ] Test video quality
- [ ] Test website performance
- [ ] Upload compressed videos to server

---

*Last Updated: December 9, 2024*



