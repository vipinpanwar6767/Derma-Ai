const API_URL = import.meta.env.VITE_API_URL;

export async function predictSkinImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${API_URL}/predict`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.detail || "Prediction failed."
    );
  }

  return await response.json();
}