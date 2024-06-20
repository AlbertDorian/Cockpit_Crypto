const express = require('express');
const puppeteer = require('puppeteer');
var router = express.Router();

// Route pour récupérer le dernier tweet d'un compte spécifique
router.get('/latest-tweet/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // Lancer Puppeteer et ouvrir une nouvelle page
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Naviguer vers la page Twitter du compte
        await page.goto(`https://twitter.com/${username}`);

        // Attendre que le tweet apparaisse
        await page.waitForSelector('article div[lang]');

        // Extraire le texte du dernier tweet
        const tweetText = await page.evaluate(() => {
            const tweet = document.querySelector('article div[lang]');
            return tweet ? tweet.innerText : null;
        });

        // Fermer le navigateur
        await browser.close();

        if (tweetText) {
            res.json({ username, tweet: tweetText });
        } else {
            res.status(404).json({ error: 'No tweets found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
