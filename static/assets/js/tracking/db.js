const API_URL = "/api/shipments";

export const TrackingDB = {
  async init() {
    return true;
  },

  async getAll() {
    try {
      const res = await fetch(API_URL);
      return await res.json();
    } catch (err) {
      console.error("getAll failed", err);
      return {};
    }
  },

  async getByCode(code) {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      return data[code.toUpperCase()] || null;
    } catch (err) {
      console.error("getByCode failed", err);
      return null;
    }
  },

  async save(packageData) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(packageData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Save failed");
      }

      return data;
    } catch (err) {
      console.error("Save failed:", err);
      throw err;
    }
  },

  async delete(code) {
    try {
      const res = await fetch(`${API_URL}?code=${code}`, {
        method: "DELETE",
      });

      return await res.json();
    } catch (err) {
      console.error("Delete failed:", err);
      throw err;
    }
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
