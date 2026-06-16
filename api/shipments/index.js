import fs from "fs";
import path from "path";

const filePath = path.resolve("./data/shipments.json");

function readDB() {
  try {
    if (!fs.existsSync(filePath)) return {};
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error("Read DB error:", err);
    return {};
  }
}

function writeDB(data) {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Write DB error:", err);
  }
}

// GET all shipments
// POST create/update shipment
export default function handler(req, res) {
  const db = readDB();

  if (req.method === "GET") {
    return res.status(200).json(db);
  }

  if (req.method === "POST") {
    try {
      const shipment = req.body;

      if (!shipment?.code) {
        return res.status(400).json({ error: "Tracking code required" });
      }

      const code = shipment.code.toUpperCase();

      db[code] = {
        ...shipment,
        code,
        updatedAt: new Date().toISOString(),
      };

      writeDB(db);

      return res.status(200).json({
        success: true,
        code,
      });
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
