from fastapi import APIRouter, UploadFile, File, HTTPException
from io import BytesIO
from PIL import Image, UnidentifiedImageError

from app.services.image_service import prepare_image
from app.services.model_service import predict_image


router = APIRouter()


# Allowed image MIME types
ALLOWED_IMAGE_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
}

# Maximum file size = 5 MB
MAX_FILE_SIZE = 5 * 1024 * 1024


@router.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    # -------------------------
    # 1. Validate file type
    # -------------------------

    if file.content_type not in ALLOWED_IMAGE_TYPES:

        raise HTTPException(
            status_code=415,
            detail="Unsupported image type. Please upload JPG, PNG, or WebP."
        )


    # -------------------------
    # 2. Read uploaded file
    # -------------------------

    file_bytes = await file.read()


    # -------------------------
    # 3. Validate empty file
    # -------------------------

    if not file_bytes:

        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty."
        )


    # -------------------------
    # 4. Validate file size
    # -------------------------

    if len(file_bytes) > MAX_FILE_SIZE:

        raise HTTPException(
            status_code=413,
            detail="Image size must be less than or equal to 5 MB."
        )


    # -------------------------
    # 5. Verify actual image
    # -------------------------

    try:

        image = Image.open(
            BytesIO(file_bytes)
        )

        image.verify()

    except (UnidentifiedImageError, OSError):

        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid image."
        )


    # -------------------------
    # 6. Prepare image tensor
    # -------------------------

    try:

        input_tensor = prepare_image(
            file_bytes
        )

    except Exception:

        raise HTTPException(
            status_code=400,
            detail="Unable to process the uploaded image."
        )


    # -------------------------
    # 7. Run trained model
    # -------------------------

    try:

        prediction = predict_image(
            input_tensor
        )

    except Exception as error:

        print(
            "Model prediction error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to generate prediction."
        )


    # -------------------------
    # 8. Return prediction
    # -------------------------

    return {
        "filename": file.filename,

        "predicted_class":
            prediction["predicted_class"],

        "confidence":
            prediction["confidence"]
    }