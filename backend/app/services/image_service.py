from io import BytesIO
from PIL import Image
from torchvision import transforms


image_transform = transforms.Compose([
    transforms.Resize((224, 224)),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


def prepare_image(file_bytes: bytes):

    image = Image.open(BytesIO(file_bytes))

    image = image.convert("RGB")

    tensor = image_transform(image)

    # [3, 224, 224] → [1, 3, 224, 224]
    tensor = tensor.unsqueeze(0)

    return tensor