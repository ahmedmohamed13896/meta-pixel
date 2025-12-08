# Video Double Load Fix

## Problem Identified

The video was loading **twice** in the network tab because:

1. **Source element was added immediately** when `createVideoSrc()` was called
2. **IntersectionObserver triggered immediately** (with 100px margin, video was already "in viewport")
3. **Browser started loading** when source was appended
4. **Then `loadVideo()` was called again** by the observer

## Root Causes

1. **Source appended too early**: Adding `<source>` element to video triggers browser to start fetching
2. **IntersectionObserver too aggressive**: 100px margin meant it triggered immediately
3. **No proper loading flag**: `readyState === 0` check wasn't sufficient
4. **Race condition**: Multiple triggers could cause double load

## Solution Applied

### Changes Made:

1. **Lazy source addition**: Source element is only added when we actually want to load
2. **Loading flag**: `videoLoaded` flag prevents double loading
3. **Reduced rootMargin**: Changed from 100px to 50px to avoid premature loading
4. **Better checks**: Check `videoLoaded` flag before loading

### Code Changes:

**Before:**
```javascript
VIDEO_SRC.src = project.video;
VIDEO_SRC.setAttribute("src", project.video);
VIDEO.appendChild(VIDEO_SRC); // This triggers browser to start loading

const loadVideo = () => {
    if (VIDEO.readyState === 0) {
        VIDEO.load(); // Might load again
    }
};
```

**After:**
```javascript
let videoLoaded = false;
let videoSourceAdded = false;

const loadVideo = () => {
    if (videoLoaded) return; // Prevent double loading
    
    if (!videoSourceAdded) {
        // Only add source when we want to load
        const VIDEO_SRC = document.createElement("source");
        VIDEO_SRC.setAttribute("src", project.video);
        VIDEO_SRC.setAttribute("type", "video/mp4");
        VIDEO.appendChild(VIDEO_SRC);
        videoSourceAdded = true;
    }
    
    VIDEO.load();
    videoLoaded = true;
};
```

## Performance Impact

### Before:
- Video loaded **twice** (2x bandwidth usage)
- 16 MB video = **32 MB downloaded**
- Slower page load
- Wasted bandwidth

### After:
- Video loads **once** (normal)
- 16 MB video = **16 MB downloaded**
- Faster page load
- Efficient bandwidth usage

## Testing

To verify the fix:

1. Open browser DevTools → Network tab
2. Navigate to: `project.html?id=1`
3. Filter by "Media" or search for "Kendy.mp4"
4. **Should see only ONE request** for the video

## Additional Optimizations

The fix also includes:
- ✅ Reduced `rootMargin` from 100px to 50px (less aggressive preloading)
- ✅ Better loading state management
- ✅ Prevents race conditions

---

*Fix applied: December 9, 2024*



