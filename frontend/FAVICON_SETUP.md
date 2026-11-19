# Favicon Setup Instructions

## Quick Setup

1. **Save your logo image** to the `frontend` folder as `logo.png` or `logo.svg`

2. **Convert to favicon formats** using one of these methods:

### Option 1: Online Tool (Easiest)
- Go to https://realfavicongenerator.net/
- Upload your `logo.png` or `logo.svg` file
- Download the generated favicon package
- Extract and place all files in the `frontend` folder

### Option 2: Using ImageMagick (Command Line)
If you have ImageMagick installed:
```bash
cd frontend

# Convert to different sizes
convert logo.png -resize 16x16 favicon-16x16.png
convert logo.png -resize 32x32 favicon-32x32.png
convert logo.png -resize 180x180 apple-touch-icon.png

# Create .ico file
convert logo.png -resize 16x16 -resize 32x32 -resize 48x48 favicon.ico
```

### Option 3: Using Python (if you have PIL/Pillow)
```python
from PIL import Image

img = Image.open('logo.png')

# Create different sizes
sizes = [(16, 16), (32, 32), (180, 180)]
for size in sizes:
    resized = img.resize(size, Image.Resampling.LANCZOS)
    if size == (180, 180):
        resized.save('apple-touch-icon.png')
    elif size == (32, 32):
        resized.save('favicon-32x32.png')
    elif size == (16, 16):
        resized.save('favicon-16x16.png')

# Create .ico
img.save('favicon.ico', format='ICO', sizes=[(16,16), (32,32), (48,48)])
```

## Files Needed

After conversion, you should have these files in the `frontend` folder:
- `favicon.ico` (main favicon)
- `favicon-16x16.png` (16x16 pixels)
- `favicon-32x32.png` (32x32 pixels)
- `apple-touch-icon.png` (180x180 pixels for iOS)
- `logo.svg` (optional, for modern browsers)

## Testing

After adding the files:
1. Refresh your browser (hard refresh: Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
2. Check the browser tab - you should see your logo
3. If it doesn't appear, clear browser cache and try again

