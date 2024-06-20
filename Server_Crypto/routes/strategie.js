var express = require('express');
var router = express.Router();
var pool = require('../middleware/database').databaseConnection;

const addStrategie = async (req, res) => {
    const {cryptoId, ATH, ATL, nb_detention, date_ath, date_atl, idUser, price} = req.body;
    try {
        const conn = await pool.getConnection();
        await conn.query('INSERT INTO Strategie_Sell (symbol, ATH, ATL, nb_detention, date_ath, date_atl, idUser, last_price) VALUES (?, ?, ?, ?, ?, ?, ?,?)', [cryptoId, ATH, ATL, nb_detention, date_ath, date_atl, idUser, price]);
        conn.release();
        return res.status(200).json({ status: 200, message: 'Strategy sell created successfully.' });
    } catch (error) {
        console.error('Error creating strategy:', error);
        return res.status(500).json({ status: 500, message: 'Error attempting to create strategy.' });
    }
};

const getAllStrategyByIdUser = async (req, res) => {
    const idUser = req.params.idUser;
    try {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM Strategie_Sell WHERE idUser = ?', [idUser]);
        conn.release();
        return res.status(200).json({ status: 200, data: result });
    } catch (error) {
        console.error('Error fetching strategies:', error);
        return res.status(500).json({ status: 500, message: 'Error attempting to fetch strategies.' });
    }
};

const updateStrategie = async (req, res) => {
    const {cryptoId, ATH, ATL, nb_detention, date_ath, date_atl, idUser, price} = req.body;
    try {
        const conn = await pool.getConnection();
        await conn.query('UPDATE Strategie_Sell SET ATH = ?, ATL = ?, nb_detention = ?, date_ath = ?, date_atl = ?, last_price = ? WHERE symbol = ? AND idUser = ?', [ATH, ATL, nb_detention, date_ath, date_atl, price, cryptoId, idUser]);
        conn.release();
        return res.status(200).json({ status: 200, message: 'Strategy sell updated successfully.' });
    } catch (error) {
        console.error('Error updating strategy:', error);
        return res.status(500).json({ status: 500, message: 'Error attempting to update strategy.' });
    }
};

router.post('/addStrategie', addStrategie);
router.get('/getAllStrategyByIdUser/:idUser', getAllStrategyByIdUser);
router.put('/updateStrategie', updateStrategie);

module.exports = router;
