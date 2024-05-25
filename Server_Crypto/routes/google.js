const express = require('express');
const googleTrends = require('google-trends-api');
var router = express.Router();

router.get('/api/trends/:keyword', (req, res) => {
    const keyword = req.params.keyword;
    console.log(`Fetching trends for keyword: ${keyword}`);
    googleTrends.interestOverTime({ keyword, geo: 'FR', timeframe: 'now 1-d' })
        .then((results) => {
            console.log(`Received results: ${results}`);
            res.json(JSON.parse(results));
        })
        .catch((err) => {
            console.error(`Error fetching trends: ${err}`);
            res.status(500).send(err.message);
        });
});

module.exports = router;
