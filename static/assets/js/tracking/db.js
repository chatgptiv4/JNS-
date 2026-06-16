/**
 * JNS Express Delivery - GitHub-backed Tracking System
 * Firebase removed completely
 */

const API_BASE = "/api/shipments";

export const TrackingDB = {
  async init() {
    return true;
  },

  async getAll() {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      return Object.values(data || {});
    } catch (err) {
      console.error("getAll failed:", err);
      return [];
    }
  },

  async getByCode(code) {
    try {
      const res = await fetch(`${API_BASE}/${code.toUpperCase()}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.error("getByCode failed:", err);
      return null;
    }
  },

  async save(packageData) {
    const data = {
      ...packageData,
      code: packageData.code.toUpperCase(),
      currency: (packageData.currency || "USD").toUpperCase(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      return res.ok;
    } catch (err) {
      console.error("Save failed:", err);
      return false;
    }
  },

  async delete(code) {
    // optional future implementation
    return true;
  },

  generateCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "JNS";
    for (let i = 0; i < 9; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  },
};