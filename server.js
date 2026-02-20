const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/getpasses/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const response = await fetch(`https://catalog.roblox.com/v1/search/items/details?AssetTypes=34&CreatorTargetId=${userId}&CreatorType=1&Limit=30`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        
        const passes = [];
        for (const item of data.data || []) {
            if (item.price !== undefined) {
                passes.push({
                    id: item.id,
                    name: item.name,
                    price: item.price || 0
                });
            }
        }
        
        res.json({ success: true, passes: passes });
    } catch (e) {
        res.json({ success: false, passes: [], error: e.message });
    }
});

app.listen(port, () => console.log(`Serveur lancé sur le port ${port}`));
