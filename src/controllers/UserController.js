const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const userController = {
    register: async (req, res) => {
        try {
            let { name, email, password, role } = req.body;
            email = email.toLowerCase().trim();
            console.log('Registrando novo usuário..')
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
    },
    login: async (req, res) => {
        try {
            let { email, password } = req.body;
            email = email.toLowerCase().trim();
            const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            if (user.rows.length === 0) {
                return res.status(401).json({ error: 'credenciais inválidas.'})
            }

        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
            if (!validPassword) {
                return res.status(401).json({ error: 'Credenciais inválidas.' });
            }

        const token = jwt.sign(
            { role: user.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.json( {message: 'login realizado com sucesso', token})
        } catch (error) {   
            res.status(500).json({ error: 'Erro no login.' });
        }
    }
}

module.exports =  userController;