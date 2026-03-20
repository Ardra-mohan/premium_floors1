import fitz # PyMuPDF
import io
from PIL import Image
import os

pdf_file = r"c:\Users\ADMIN\OneDrive\Desktop\premium floors\src\assets\Brochure.pdf"
output_dir = r"c:\Users\ADMIN\OneDrive\Desktop\premium floors\src\assets\extracted"
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_file)
count = 0

for page_index in range(len(doc)):
    page = doc.load_page(page_index)
    image_list = page.get_images(full=True)
    
    for img_index, img in enumerate(image_list):
        try:
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            # Load it to PIL to check size/quality if needed
            image = Image.open(io.BytesIO(image_bytes))
            
            # Convert CMYK or other formats to RGB for web compatibility
            if image.mode not in ('RGB', 'RGBA'):
                image = image.convert('RGB')
            
            # Only save decent sized images (e.g. > 150x150)
            if image.width >= 150 and image.height >= 150:
                count += 1
                image_path = os.path.join(output_dir, f"brochure_img_{count}.jpg")
                image.save(open(image_path, "wb"), format="JPEG", quality=85)
                print(f"Saved {image_path} ({image.width}x{image.height})")
        except Exception as e:
            print(f"Error extracting image {img_index} on page {page_index}: {e}")

print(f"Extracted {count} images.")
