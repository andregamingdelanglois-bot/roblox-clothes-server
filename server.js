const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/getpasses/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const response = await fetch(`https://games.roblox.com/v1/users/${userId}/games?limit=50`);
        const gamesData = await response.json();
        
        const passes = [];
        
        for (const game of gamesData.data || []) {
            const passResponse = await fetch(`https://games.roblox.com/v1/games/${game.id}/game-passes?limit=100`);
            const passData = await passResponse.json();
            
            for (const pass of passData.data || []) {
                if (pass.price !== null) {
                    passes.push({
                        id: pass.id,
                        name: pass.name,
                        price: pass.price
                    });
                }
            }
        }
        
        res.json({ success: true, passes: passes });
    } catch (e) {
        res.json({ success: false, passes: [], error: e.message });
    }
});

app.listen(port, () => console.log(`Serveur lancé sur le port ${port}`));
