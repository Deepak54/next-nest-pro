import { useAuth } from "@/stores/auth.store";

// Se NEXT_PUBLIC_API_URL não estiver definido, usamos rotas relativas
// e o proxy do Next (rewrites) cuida do destino.
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function apiFetch(path: string, init: RequestInit = {}) {
  const { accessToken, setAccessToken, clear } = useAuth.getState();

  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  let res = await fetch(API_BASE + path, { ...init, headers, credentials: "include" });
  if (res.status !== 401) return res;

  // tenta refresh
  const r = await fetch(API_BASE + "/auth/refresh", {
    method: "POST",
    credentials: "include",
  });
  if (r.ok) {
    const { accessToken: newToken } = await r.json();
    setAccessToken(newToken);
    headers.set("Authorization", `Bearer ${newToken}`);
    res = await fetch(API_BASE + path, { ...init, headers, credentials: "include" });
    return res;
  }
  clear();
  return res;
}
