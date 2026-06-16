import fs from "fs";
import path from "path";

const filePath = path.resolve("./data/shipments.json");

function readDB() {
  try {
    if (!fs.existsSync(filePath)) return {};
    const raw = fs.readFileSync(filePath, "utf8");
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("READ ERROR:", e);
    return {};
  }
}

function writeDB(data) {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("WRITE ERROR:", e);
  }
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  let db = readDB();

  try {
    // ✅ GET ALL
    if (req.method === "GET") {
      return res.status(200).json(db);
    }

    // ✅ POST (CREATE / UPDATE)
    if (req.method === "POST") {
      let body = "";

      await new Promise((resolve) => {
        req.on("data", (chunk) => (body += chunk));
        req.on("end", resolve);
      });

      body = body ? JSON.parse(body) : {};

      if (!body.code) {
        return res.status(400).json({ error: "Missing code" });
      }

      const code = body.code.toUpperCase();

      db[code] = {
        ...body,
        code,
        updatedAt: new Date().toISOString(),
      };

      writeDB(db);

      return res.status(200).json({
        success: true,
        code,
      });
    }

    // ✅ DELETE
    if (req.method === "DELETE") {
      const { code } = req.query;

      if (!code || !db[code.toUpperCase()]) {
        return res.status(404).json({ error: "Not found" });
      }

      delete db[code.toUpperCase()];
      writeDB(db);

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("API ERROR:", err);

    return res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
}
