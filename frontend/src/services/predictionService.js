export async function predictSkinImage(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    "http://127.0.0.1:8000/predict",
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