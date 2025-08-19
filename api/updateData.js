// api/updateData.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/updateData", async (req, res) => {
  const { fid, damage } = req.body;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/moviequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Prefer": "return=representation"
      },
      body: JSON.stringify({ id, tag })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
