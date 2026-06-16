import fs from "fs";
import path from "path";

const filePath = path.resolve("./data/shipments.json");

function readDB() {
  try {
    if (!fs.existsSync(filePath)) return {};
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    return {};
  }
}

// GET /api/shipments/JNS123
export default function handler(req, res) {
  const db = readDB();

  const code = req.query.code?.toUpperCase();

  if (!code) {
    return res.status(400).json({ error: "Missing tracking code" });
  }

  const shipment = db[code];

  if (!shipment) {
    return res.status(404).json({
      error: "Tracking code not found",
    });
  }

  return res.status(200).json(shipment);
}
