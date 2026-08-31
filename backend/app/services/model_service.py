import torch
import torch.nn as nn

from pathlib import Path

from torchvision.models import (
    efficientnet_b0,
    EfficientNet_B0_Weights
)


# -------------------------
# Model configuration
# -------------------------

NUM_CLASSES = 7

CLASS_NAMES = [
    "akiec",
    "bcc",
    "bkl",
    "df",
    "mel",
    "nv",
    "vasc"
]


# -------------------------
# Select device
# -------------------------

device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)


# -------------------------
# Create architecture
# -------------------------

model = efficientnet_b0(
    weights=None
)

model.classifier[1] = nn.Linear(
    model.classifier[1].in_features,
    NUM_CLASSES
)


# -------------------------
# Locate trained weights
# -------------------------

MODEL_PATH = (
    Path(__file__).resolve().parent.parent
    / "models"
    / "DermaAI_EfficientNetB0_best.pth"
)


# -------------------------
# Load trained weights
# -------------------------

state_dict = torch.load(
    MODEL_PATH,
    map_location=device
)

model.load_state_dict(state_dict)

model = model.to(device)

model.eval()


# -------------------------
# Prediction function
# -------------------------

def predict_image(input_tensor):

    input_tensor = input_tensor.to(device)

    with torch.no_grad():

        outputs = model(input_tensor)

        probabilities = torch.softmax(
            outputs,
            dim=1
        )

        confidence, predicted_index = torch.max(
            probabilities,
            dim=1
        )

    predicted_class = CLASS_NAMES[
        predicted_index.item()
    ]

    confidence_score = confidence.item()

    return {
        "predicted_class": predicted_class,
        "confidence": confidence_score
    }