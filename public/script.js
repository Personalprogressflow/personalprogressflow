async function uploadImage() {
  const file = document.getElementById("imageInput").files[0];
  if (!file) return alert("Please upload a photo.");

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("https://your-backend-url.onrender.com/predict", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  document.getElementById("result").innerText = `Mood: ${data.mood}`;
}
