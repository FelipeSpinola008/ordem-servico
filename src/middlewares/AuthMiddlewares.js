const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if(!token) {
            return res.status(401).json({ error: 'acesso negado. Token não fornecido.'})
        }
        try {
            const decoted = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoted;
            next();
        } catch (error) {
            res.status(400).json({ error: 'Token inválido.' });
        }
};

const authorize = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        if (req.user.role !== role) {
            return res.status(403).json({ error: `Acesso negado. Requer cargo de ${role}.` });
        }

        next();
    };
};

module.exports = { 
    authMiddleWare,
    authorize };