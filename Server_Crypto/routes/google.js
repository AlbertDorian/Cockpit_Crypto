const express = require('express');
const googleTrends = require('google-trends-api');
const rateLimit = require('express-rate-limit');
var router = express.Router();

// Define rate limiter to avoid too many requests
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again after a minute'
});

// Apply the rate limiter to the trends route
router.get('/api/trends/:keyword', limiter, (req, res) => {
    const keyword = req.params.keyword;
    console.log(`Fetching trends for keyword: ${keyword}`);
    googleTrends.interestOverTime({ keyword, geo: 'FR', timeframe: 'now 1-d' })
        .then((results) => {
            console.log(`Received results: ${results}`);
            res.json(JSON.parse(results));
        })
        .catch((err) => {
            console.error(`Error fetching trends: ${err}`);
            if (err.message.includes('429')) {
                res.status(429).send('Too many requests. Please try again later.');
            } else {
                res.status(500).send(err.message);
            }
        });
});

module.exports = router;
