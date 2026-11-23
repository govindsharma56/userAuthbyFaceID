const toB64 = (buf) =>
  btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

const fromB64 = (str) =>
  Uint8Array.from(
    atob(str.replace(/-/g, "+").replace(/_/g, "/")),
    (c) => c.charCodeAt(0)
  );

export async function isFaceIdAvailable() {
  return (
    !!window.PublicKeyCredential &&
    (await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable())
  );
}
export async function registerFaceId(username) {
  const cred = await navigator.credentials.create({
    publicKey: {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      rp: { name: "My App" },
      user: {
        id: crypto.getRandomValues(new Uint8Array(16)),
        name: username,
        displayName: username,
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },
        { type: "public-key", alg: -257 },
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required",
      },
      timeout: 60000,
    },
  });
  localStorage.setItem(`faceid:${username}`, JSON.stringify({ id: toB64(cred.rawId) }));
}

export async function verifyFaceId(username) {
  const saved = JSON.parse(localStorage.getItem(`faceid:${username}`));
  if (!saved) throw new Error("No account found. Sign up first.");

  await navigator.credentials.get({
    publicKey: {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      allowCredentials: [{ type: "public-key", id: fromB64(saved.id) }],
      userVerification: "required",
      timeout: 60000,
    },
  });
}