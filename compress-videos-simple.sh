#!/bin/bash
# Simple video compression script for all videos
# Usage: ./compress-videos-simple.sh

echo "Video Compression Script"
echo "========================"
echo ""

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "Error: FFmpeg is not installed!"
    echo "Install it first:"
    echo "  Windows: choco install ffmpeg"
    echo "  Mac: brew install ffmpeg"
    echo "  Linux: sudo apt-get install ffmpeg"
    exit 1
fi

echo "✓ FFmpeg found"
echo ""

# Array of videos to compress
declare -A videos=(
    ["assets/videos/home.mp4"]="28"
    ["assets/videos/Aqwan.mp4"]="28"
    ["assets/videos/Asr-herfa.mp4"]="28"
    ["assets/videos/Camel.mp4"]="28"
    ["assets/videos/Emara.mp4"]="26"
    ["assets/videos/Kendy.mp4"]="28"
    ["assets/videos/Qshla.mp4"]="28"
    ["assets/videos/Rally.mp4"]="28"
    ["assets/videos/Sor.mp4"]="28"
    ["assets/videos/Tadawl.mp4"]="28"
    ["assets/videos/Zaabal.mp4"]="26"
    ["assets/videos/Zeein.mp4"]="28"
)

# Function to get file size in MB
get_size() {
    if [ -f "$1" ]; then
        du -m "$1" | cut -f1
    else
        echo "0"
    fi
}

# Compress each video
total_original=0
total_new=0

for video in "${!videos[@]}"; do
    crf="${videos[$video]}"
    
    if [ ! -f "$video" ]; then
        echo "⚠ Skipping $video (not found)"
        continue
    fi
    
    output="${video%.mp4}-optimized.mp4"
    original_size=$(get_size "$video")
    
    echo "Compressing: $(basename $video)"
    echo "  Original: ${original_size} MB"
    echo "  CRF: $crf"
    
    # Compress video
    ffmpeg -i "$video" \
        -c:v libx264 \
        -crf "$crf" \
        -preset slow \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -y "$output" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        new_size=$(get_size "$output")
        savings=$(echo "scale=1; (1 - $new_size / $original_size) * 100" | bc)
        
        echo "  ✓ Compressed: ${new_size} MB"
        echo "  Savings: ${savings}%"
        echo ""
        
        total_original=$((total_original + original_size))
        total_new=$((total_new + new_size))
    else
        echo "  ✗ Error compressing"
        echo ""
    fi
done

# Summary
echo "========================"
echo "Summary:"
echo "Total original: ${total_original} MB"
echo "Total compressed: ${total_new} MB"
total_savings=$(echo "scale=1; (1 - $total_new / $total_original) * 100" | bc)
echo "Total savings: ${total_savings}%"
echo "========================"



