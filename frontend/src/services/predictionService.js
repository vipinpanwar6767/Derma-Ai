export async function predictSkinImage(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    "https://derma-ai-backend-mj99.onrender.com/predict",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.detail ||
      "Prediction failed."
    );
  }

  return await response.json();
}