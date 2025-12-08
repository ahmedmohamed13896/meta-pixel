# HandBrake: Better Settings for Smaller Files

## Why Your Video Got Larger

**Common reasons:**
1. Original video was already compressed
2. RF 28 might be too high quality for your needs
3. Need to adjust other settings (resolution, frame rate)
4. Audio settings might be adding size

---

## ✅ Better HandBrake Settings (For Smaller Files)

### Method 1: Use Bitrate Instead of RF (More Control)

1. **Open HandBrake** → Load your video
2. **Video Tab**:
   - Video Codec: **H.264 (x264)**
   - Framerate: **30 fps** (or "Same as source")
   - **Switch to "Bitrate" mode** (not RF)
   - **Video Bitrate**: **2000 kbps** (2 Mbps)
     - For home video: 1500-2000 kbps
     - For project videos: 2000-3000 kbps
3. **Audio Tab**:
   - Codec: **AAC**
   - Bitrate: **96 kbps** (or 128 kbps)
4. **Dimensions Tab**:
   - If video is larger than 1920x1080, **scale it down**
   - Width: **1920** (or keep original if smaller)
   - Height: **1080** (or keep original if smaller)
5. **Click "Start Encode"**

**Expected**: 20 MB → **8-12 MB** ✅

---

### Method 2: Higher RF Value (Lower Quality = Smaller File)

1. **Open HandBrake** → Load your video
2. **Video Tab**:
   - Video Codec: **H.264 (x264)**
   - Framerate: **30 fps**
   - **Quality: RF 30-32** (higher = smaller file, lower quality)
     - RF 30: Good balance
     - RF 32: Smaller file, acceptable quality
3. **Audio Tab**:
   - Codec: **AAC**
   - Bitrate: **96 kbps**
4. **Dimensions Tab**:
   - Scale to **1920x1080** if larger
5. **Click "Start Encode"**

**Expected**: 20 MB → **6-10 MB** ✅

---

### Method 3: Two-Pass Encoding (Best Compression)

1. **Video Tab**:
   - Video Codec: **H.264 (x264)**
   - **Enable "2-Pass Encoding"**
   - **Video Bitrate**: **1500 kbps** (for home) or **2000 kbps** (for projects)
2. **Audio Tab**:
   - Codec: **AAC**
   - Bitrate: **96 kbps**
3. **Dimensions Tab**:
   - Scale to **1920x1080**
4. **Click "Start Encode"** (will take longer, but better compression)

**Expected**: 20 MB → **5-8 MB** ✅

---

## 🎯 Recommended Settings by Video Type

### For home.mp4 (Background Video)

**Settings:**
- Preset: **Fast 1080p30**
- Video Codec: **H.264**
- **Bitrate Mode**: **1500 kbps**
- Audio: **AAC, 96 kbps**
- Resolution: **1920x1080** (or keep if smaller)
- Framerate: **30 fps**

**Target**: 21 MB → **5-7 MB**

---

### For Project Videos (Kendy, Rally, etc.)

**Settings:**
- Preset: **Fast 1080p30**
- Video Codec: **H.264**
- **Bitrate Mode**: **2000-2500 kbps**
- Audio: **AAC, 128 kbps**
- Resolution: **1920x1080**
- Framerate: **30 fps**

**Target**: 15-30 MB → **8-12 MB**

---

### For Large Videos (Zaabal 74 MB, Emara 56 MB)

**Settings:**
- Preset: **Fast 1080p30**
- Video Codec: **H.264**
- **Bitrate Mode**: **3000-4000 kbps**
- Audio: **AAC, 128 kbps**
- Resolution: **1920x1080** (scale down if larger)
- Framerate: **30 fps**

**Target**: 50-74 MB → **15-20 MB**

---

## 🔧 Quick Fix: Try These Settings Now

### For Your 20 MB Video:

1. **Open HandBrake** → Load the video
2. **Video Tab**:
   - Codec: **H.264**
   - **Switch to "Bitrate"** (click the dropdown)
   - **Set to: 2000 kbps**
   - Framerate: **30 fps**
3. **Audio Tab**:
   - Codec: **AAC**
   - Bitrate: **96 kbps** (lower = smaller)
4. **Dimensions Tab**:
   - Check if resolution is larger than 1920x1080
   - If yes, set to **1920x1080**
5. **Encode**

**Should get**: 20 MB → **8-10 MB** ✅

---

## 📊 Quality vs Size Guide

| Bitrate | Quality | File Size (1 min) | Use For |
|---------|---------|-------------------|---------|
| 1000 kbps | Low | ~7.5 MB | Background videos |
| 1500 kbps | Medium | ~11 MB | Home page videos |
| 2000 kbps | Good | ~15 MB | Project videos |
| 3000 kbps | High | ~22 MB | Large project videos |
| 5000 kbps | Very High | ~37 MB | Not recommended for web |

**For web**: 1500-2500 kbps is usually best!

---

## 💡 Pro Tips

1. **Use Bitrate mode** instead of RF for more control
2. **Lower audio bitrate**: 96 kbps is usually enough
3. **Scale down resolution** if larger than 1920x1080
4. **Reduce frame rate** if 60fps → 30fps saves ~50%
5. **Two-pass encoding** gives best compression (slower)

---

## 🚨 If Still Too Large

### Option 1: Lower Bitrate More
- Try **1500 kbps** instead of 2000
- Or even **1000 kbps** for background videos

### Option 2: Reduce Resolution
- If 1920x1080, try **1280x720**
- Saves significant space

### Option 3: Reduce Frame Rate
- If 60fps, reduce to **30fps**
- Saves ~50% file size

### Option 4: Use Online Tool
- Try **CloudConvert** with "High Compression"
- Sometimes online tools compress better

---

## ✅ Step-by-Step: Compress 20 MB Video to 8 MB

1. **Open HandBrake**
2. **Load your 20 MB video**
3. **Video Tab**:
   - Codec: **H.264**
   - **Bitrate**: **1500 kbps** (not RF!)
   - Framerate: **30 fps**
4. **Audio Tab**:
   - Codec: **AAC**
   - Bitrate: **96 kbps**
5. **Dimensions Tab**:
   - If > 1920x1080, scale to **1920x1080**
6. **Click "Start Encode"**
7. **Check file size** - should be ~8-10 MB ✅

---

## 🎯 Quick Reference

**For smaller files:**
- ✅ Use **Bitrate mode** (not RF)
- ✅ **1500-2000 kbps** for most videos
- ✅ **96 kbps audio** (not 128+)
- ✅ **1920x1080 max** resolution
- ✅ **30 fps** (not 60)

**Avoid:**
- ❌ RF mode (less control)
- ❌ High bitrates (>3000 kbps)
- ❌ High audio bitrates (>128 kbps)
- ❌ Large resolutions (>1920x1080)
- ❌ High frame rates (60fps)

---

*Try the Bitrate method - it should work much better!*



