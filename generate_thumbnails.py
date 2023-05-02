import glob
from PIL import Image
import shutil

W = int(960)
H = int(540)

def create_thumbnail(source_path, dest_path):
    with Image.open(source_path) as img:
        if img.mode != "RGB":
            img = img.convert("RGB")

        img.thumbnail((W, H))
        if '.jpg' in dest_path:
            img.save(dest_path, "JPEG", optimize=True, quality=60)
        if '.png' in dest_path:
            img.save(dest_path, "PNG", optimize=True, quality=60)
        if '.gif' in dest_path:
            shutil.copy(source_path, dest_path)


image_queries = [
    'media/*.png',
    'media/*.jpg',
    'media/*.gif',
    'media/dev/*.png',
    'media/dev/*.jpg',
    'media/dev/*.gif',
    'media/workshops/*.png',
    'media/workshops/*.jpg',
    'media/workshops/*.gif',
]

for query in image_queries:
    paths = glob.glob(query)
    for path in paths:
        p = path.split('/')
        p[0] = 'thumbnails'
        new_path = '/'.join(p)
        print('converting', path)
        create_thumbnail(path, new_path)
