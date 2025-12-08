# Vimeo Embed Guide - How to Add More Videos

## ✅ Zaabal Video Updated

The Zaabal project now uses Vimeo embed instead of local video file.

---

## 🎯 How to Add Vimeo Embeds to Other Projects

### Step 1: Get Vimeo Embed Code

When you get a Vimeo embed code like this:
```html
<div style="padding:40.1% 0 0 0;position:relative;">
  <iframe src="https://player.vimeo.com/video/1144187416?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;muted=1&amp;loop=1" 
    frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    style="position:absolute;top:0;left:0;width:100%;height:100%;" 
    title="Zaabal">
  </iframe>
</div>
```

**Extract these values:**
- **Video ID**: `1144187416` (from the URL)
- **Padding**: `40.1%` (from the style attribute)

### Step 2: Update `assets/js/variables.js`

Find the project object and add two fields:

```javascript
{
  id: 3,  // or whatever project ID
  name: "zaabal",
  images: PROJECT_ZAABAL_IMGS,
  video: `${BASE_PRO_VIDEO_URL}Zaabal.mp4`,  // Keep as fallback
  vimeoId: "1144187416",        // ← Add this (Vimeo video ID)
  vimeoPadding: "40.1%",        // ← Add this (aspect ratio padding)
  category: "content-creation",
  title: "Zaabal",
  description: "...",
}
```

**That's it!** The JavaScript will automatically:
- Detect if `vimeoId` exists
- Create Vimeo embed instead of local video
- Use the correct padding for aspect ratio
- Apply all the styling automatically

---

## 📝 Example: Adding Vimeo to Another Project

### Example: Adding to Kendy Project

1. **Get Vimeo embed code** (from Vimeo)
2. **Extract values**:
   - Video ID: `1234567890`
   - Padding: `56.15%`

3. **Update `assets/js/variables.js`**:
```javascript
{
  id: 1,
  name: "kendy",
  images: PROJECT_KENDY_IMGS,
  video: `${BASE_PRO_VIDEO_URL}Kendy.mp4`,  // Keep as fallback
  vimeoId: "1234567890",        // ← Add Vimeo ID
  vimeoPadding: "56.15%",       // ← Add padding
  category: "prjection-mapping",
  title: "Kendy",
  description: "...",
}
```

**Done!** The video will automatically use Vimeo embed.

---

## 🔍 How It Works

The JavaScript (`project-details.js`) checks:
1. If `project.vimeoId` exists → Creates Vimeo embed
2. If no `vimeoId` → Falls back to local video file

**No HTML changes needed!** Just update the JavaScript object.

---

## 📊 Vimeo Embed Parameters

The embed automatically includes:
- ✅ `autoplay=1` - Auto-plays
- ✅ `muted=1` - Starts muted
- ✅ `loop=1` - Loops continuously
- ✅ `controls=0` - No controls (clean look)
- ✅ `title=0` - No title overlay
- ✅ `byline=0` - No creator byline
- ✅ `portrait=0` - No creator portrait

---

## 🎨 Styling

All styles are in `assets/css/styles.css`:
- `.vimeo-wrapper` - Container with responsive padding
- `.vimeo-iframe` - Iframe styling

**No inline styles needed!** Everything is in CSS.

---

## ✅ Current Status

- ✅ **Zaabal**: Using Vimeo embed (ID: 1144187416, Padding: 40.1%)
- ⏳ **Other projects**: Still using local video files (can be updated when you provide embeds)

---

## 🚀 Quick Reference

**To add Vimeo to any project:**

1. Get embed code from Vimeo
2. Extract: Video ID and Padding %
3. Add to project object in `variables.js`:
   ```javascript
   vimeoId: "VIDEO_ID_HERE",
   vimeoPadding: "PADDING_HERE%",
   ```

**That's it!** The system handles everything else automatically.

---

*Last Updated: December 9, 2024*



