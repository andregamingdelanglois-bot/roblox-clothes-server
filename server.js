const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/getclothes/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const response = await fetch(`https://avatar.roblox.com/v1/users/${userId}/avatar`);
        const data = await response.json();
        
        const clothes = [];
        for (const asset of data.assets || []) {
            if (asset.assetType.id === 11 || asset.assetType.id === 12 || asset.assetType.id === 13) {
                clothes.push(asset.id);
            }
        }
        res.json({ success: true, clothes: clothes });
    } catch (e) {
        res.json({ success: false, clothes: [] });
    }
});

app.listen(port, () => console.log(`Serveur lancé sur le port ${port}`));
