export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Only GET requests allowed' });
    }

    const { fid } = req.query;
    if (!fid) {
        return res.status(400).json({ error: 'FID is required' });
    }

    try {
        const url = `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`;
        const apiRes = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.NEYNAR_API_KEY, // stored securely
                "x-neynar-experimental": "false"
            }
        });

        const data = await apiRes.json();
        res.status(apiRes.status).json(data);
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
