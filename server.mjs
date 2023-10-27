import express from 'express';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const hostname = '127.0.0.1';
const port = process.env.PORT || 9091;

// Read the data from the JSON file
const gamesData = JSON.parse(await readFileSync(join(__dirname, 'SteamGames.json')));

// class Game {
//     constructor(name, year, steamUrl) {
//         this.name = name;
//         this.year = year;
//         this.steamUrl = steamUrl;
//     }
// }

app.get('/game', (req, res) => {
    res.status(200).json(gamesData);
});

app.get('/game/select/:year', (req, res) => {
    const yearParam = parseInt(req.params.year);
    const filteredGames = gamesData.filter(game => game.Year >= yearParam);
    res.status(200).json(filteredGames);
})
app.get('/game/:name', (req, res) => {
    const gameName = req.params.name;
    console.log('Searching for game:', gameName); 
    const game = gamesData.find(game => game.Game === gameName); 

    if (game) {
        res.status(200).json({ steamUrl: game.GameLink }); 
    } else {
        res.status(404).json({ message: 'Game not found' });
    }
});

app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
