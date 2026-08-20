import { rateLimit } from "@/lib/rate-limit";

describe("rateLimit", () => {
  it("autorise les 3 premières requêtes pour une même clé", () => {
    const key = `test-allow-${Date.now()}`;

    expect(rateLimit(key)).toEqual({ ok: true });
    expect(rateLimit(key)).toEqual({ ok: true });
    expect(rateLimit(key)).toEqual({ ok: true });
  });

  it("bloque la 4e requête dans la fenêtre de 15 minutes", () => {
    const key = `test-block-${Date.now()}`;

    rateLimit(key);
    rateLimit(key);
    rateLimit(key);

    const result = rateLimit(key);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.retryAfterSeconds).toBeGreaterThan(0);
    }
  });

  it("isole les clés entre elles", () => {
    const keyA = `test-a-${Date.now()}`;
    const keyB = `test-b-${Date.now()}`;

    rateLimit(keyA);
    rateLimit(keyA);
    rateLimit(keyA);

    expect(rateLimit(keyB)).toEqual({ ok: true });
  });
});
