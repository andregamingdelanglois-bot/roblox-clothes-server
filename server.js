const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/getpasses/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const response = await fetch(`https://www.roblox.com/users/inventory/list-json?userId=${userId}&assetTypeId=34&pageNumber=1&itemsPerPage=100`);
        const data = await response.json();
        
        const passes = [];
        for (const item of data.Data?.Items || []) {
            if (item.Item?.PriceInRobux !== null) {
                passes.push({
                    id: item.Item.AssetId,
                    name: item.Item.Name,
                    price: item.Item.PriceInRobux || 0
                });
            }
        }
        
        res.json({ success: true, passes: passes });
    } catch (e) {
        res.json({ success: false, passes: [], error: e.message });
    }
});

app.listen(port, () => console.log(`Serveur lancé sur le port ${port}`));
