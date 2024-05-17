var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var pool = require('../middleware/database').databaseConnection;
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - firstname
 *         - mail
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user's name
 *         firstname:
 *           type: string
 *           description: The user's first name
 *         mail:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         id: 1
 *         name: Doe
 *         firstname: John
 *         mail: johndoe@example.com
 *         password: secret
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mail
 *               - password
 *             properties:
 *               mail:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code
 *                 message:
 *                   type: string
 *                   description: Response message
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
const login = async (req, res) => {
  const { mail, password } = req.body;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query('SELECT * FROM User WHERE mail = ?', [mail]);
    if (result.length === 0) {
      conn.end();
      return res.status(404).json({ status: 404, message: 'Utilisateur non trouvé.' });
    }
    const userRecord = result[0];
    const match = await bcrypt.compare(password, userRecord.password);
    if (match) {
      const { password, ...userWithoutPassword } = userRecord;
      conn.end();
      return res.status(200).json({ status: 200, message: 'Connexion réussie', user: userWithoutPassword });
    } else {
      conn.end();
      return res.status(401).json({ status: 401, message: 'Mot de passe incorrect.' });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return res.status(500).json({ status: 500, message: 'Erreur lors de la tentative de connexion.' });
  }
};

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - firstname
 *               - mail
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               firstname:
 *                 type: string
 *                 description: The user's first name
 *               mail:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Successfully registered
 *       500:
 *         description: Internal server error
 */
const register = async (req, res) => {
  console.log("cc")
  const { name, firstname, mail, password } = req.body;
  console.log(name, firstname, mail, password )
  try {
    const conn = await pool.getConnection();
    const hashPassword = await bcrypt.hash(password, 10);
    await conn.query('INSERT INTO User (name, firstname, mail, password) VALUES (?, ?, ?, ?)', [name, firstname, mail, hashPassword]);
    conn.end();
    return res.status(200).json({ status: 200, message: 'User created successfully.' });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ status: 500, message: 'Error attempting to create user.' });
  }
};

router.post('/login', login);
router.post('/register', register);

module.exports = router;
