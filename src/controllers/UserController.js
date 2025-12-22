const pool = require('../config/db');
const bcrypt = require('bcrypt');

const userController = {
    register: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

            const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            if (userExist.rows.length > 0) {
                return res.status(400).json({ error: 'Este e-mail já está cadastrado.'})
            }

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            const newUser = await pool.query('INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
                [name, email, passwordHash, role || 'user']);

            res.status(201).json({
                message: 'usuário criado com sucesso',
                user: newUser.rows[0]
            })

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
        }
    }
}

module.exports =  userController;