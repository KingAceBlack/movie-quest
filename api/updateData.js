// api/updateData.js

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { id, tag } = req.body;
    console.log(id, tag)

    if (!id || !tag) {
      return res.status(400).json({ error: "Missing id or tag" });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: "Missing Supabase env vars" });
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/moviequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({ id, tag }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Supabase error:", data);
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("❌ API crashed:", err);
    return res.status(500).json({ error: err.message });
  }
}
