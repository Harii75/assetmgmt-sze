require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use("/uploads", express.static("uploads"));

/* ==========================
    HIBABEJELENTES API 
 *  ==========================  */


app.post("/api/hibabejelentes", upload.array("screenshots", 5), async (req, res) => {
  try {
    const { title, description, workload = "low" } = req.body;
    const screenshotUrls = req.files.map(file => `/uploads/${file.filename}`);

    const result = await pool.query(
      `INSERT INTO hibabejelentesek (title, description, screenshots, status, workload, created_at, updated_at) 
       VALUES ($1, $2, $3, 'new', $4, NOW(), NOW()) RETURNING *`,
      [title, description, screenshotUrls, workload]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error in /api/hibabejelentes:", error);
    res.status(500).json({ error: "Hiba történt az adat rögzítésekor!" });
  }
});

app.get("/api/hibabejelentesek", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM hibabejelentesek ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching hibabejelentesek:", error);
    res.status(500).json({ error: "Hiba történt az adatok lekérésekor!" });
  }
});


app.put("/api/hibabejelentesek/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      "UPDATE hibabejelentesek SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Hiba nem található!" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(`Error updating status for issue ID ${id}:`, error);
    res.status(500).json({ error: "Hiba történt az állapot frissítésekor!" });
  }
});

/* ==========================
   IGÉNYFELVÉTEL API 
 *  ==========================  */


app.post("/api/igenyfelvetel", async (req, res) => {
  try {
    const {
      full_name,
      email,
      department,
      subject,
      description,
      discussed_internally,
      funding_available,
      related_to_previous,
      previous_development,
      known_software,
      workload = "low",
    } = req.body;

    const result = await pool.query(
      `INSERT INTO igenyfelvetel 
      (full_name, email, department, subject, description, discussed_internally, 
      funding_available, related_to_previous, previous_development, known_software, status, workload, created_at, updated_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'new', $11, NOW(), NOW()) 
      RETURNING *`,
      [
        full_name,
        email,
        department,
        subject,
        description,
        discussed_internally,
        funding_available,
        related_to_previous,
        previous_development,
        known_software,
        workload,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error in /api/igenyfelvetel:", error);
    res.status(500).json({ error: "Hiba történt az igény rögzítésekor!" });
  }
});

app.get("/api/igenyfelvetel", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM igenyfelvetel ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error in /api/igenyfelvetel:", error);
    res.status(500).json({ error: "Hiba történt az igények lekérésekor!" });
  }
});

app.put("/api/igenyfelvetel/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      "UPDATE igenyfelvetel SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [status, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(`Error updating status for request ID ${id}:`, error);
    res.status(500).json({ error: "Hiba történt az állapot frissítésekor!" });
  }
});

app.put("/api/igenyfelvetel/:id/workload", async (req, res) => {
  try {
    const { workload } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      "UPDATE igenyfelvetel SET workload = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [workload, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(`Error updating workload for request ID ${id}:`, error);
    res.status(500).json({ error: "Hiba történt a munkaterhelés frissítésekor!" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on http://0.0.0.0:${PORT}`);
});

