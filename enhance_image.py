import os
from PIL import Image, ImageFilter, ImageEnhance

img_path = 'src/assets/main.png'
out_path = 'src/assets/main.webp'

print("Opening image...")
img = Image.open(img_path)

# Convert to RGBA or RGB depending on need, but Pillow handles WebP alpha fine.
if img.mode == 'P':
    img = img.convert('RGBA')

print("Enhancing contrast...")
# Increase contrast slightly
enhancer = ImageEnhance.Contrast(img)
img = enhancer.enhance(1.15)

print("Applying unsharp mask for sharpness and edge enhancement...")
# UnsharpMask: radius controls the size of the edges, percent controls the strength, threshold prevents noise sharpening
img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))

print("Saving optimized WebP...")
# Save optimized for fast loading
img.save(out_path, format='WEBP', quality=85, method=6)

print(f"Done. Image saved to {out_path} with size {os.path.getsize(out_path)} bytes.")
