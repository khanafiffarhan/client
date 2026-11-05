const BASE = process.env.NEXT_PUBLIC_API_URL;
export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const r = await fetch("/api/token");
    if (!r.ok) throw new Error("Please login first");
    headers.Authorization = "Bearer " + (await r.json()).token;
  }
  const res = await fetch(BASE + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}
export async function uploadImage(file) {
  const fd = new FormData(); fd.append("image", file);
  const r = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, { method: "POST", body: fd });
  const j = await r.json();
  if (!j.success) throw new Error("Image upload failed");
  return j.data.url;
}
