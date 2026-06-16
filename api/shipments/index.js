import fs from "fs";
import path from "path";

const filePath = path.resolve("./data/shipments.json");

function readDB() {
  try {
    if (!fs.existsSync(filePath)) return {};
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    return {};
  }
}

function writeDB(data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  const db = readDB();

  // GET all shipments
  if (req.method === "GET") {
    return res.status(200).json(db);
  }

  // CREATE / UPDATE shipment
  if (req.method === "POST") {
    try {
      let body = req.body;

      // Fix string body issue
      if (typeof body === "string") {
        body = JSON.parse(body);
      }

      if (!body?.code) {
        return res.status(400).json({ error: "Missing tracking code" });
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
        message: "Shipment saved",
        code,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Server error",
        details: err.message,
      });
    }
  }

  // DELETE shipment
  if (req.method === "DELETE") {
    try {
      const { code } = req.query;
      if (!code || !db[code.toUpperCase()]) {
        return res.status(404).json({ error: "Not found" });
      }

      delete db[code.toUpperCase()];
      writeDB(db);

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
