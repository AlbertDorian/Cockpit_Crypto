const bcrypt = require('bcrypt');
const mariadb = require('mariadb');

const port = 3001;

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'dev',
    password: 'dev',
    database: 'cockpitCrypto',
    port: 3307,
});


export const login = async (user, password) => {

    try {
        const conn = await pool.getConnection();
        //Search User by Mail
        const result = await conn.query('SELECT * FROM User WHERE mail = ?', [user]);
        console.log(result);
        //Check if User as found
            if (result.length === 0) {
                conn.end();
                return res.status(404).send({ message: 'User not found.' });
            }
        const user = result[0];
        //compare password
        const match = await bcrypt.compare(password, user.password);
            if (match) {
                const { password, ...userWithoutPassword } = user;
                res.send({ message: 'Connexion réussie', user: userWithoutPassword });
            } else {
                res.status(401).send({ message: 'Mot de passe incorrect.' });
            }

        conn.end();
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).send({ message: 'Erreur lors de la tentative de connexion.' });
    }
}



