const validateOrder = (req, res, next) => {
    const { customer, description } = req.body;

    if (!customer || !description) {
        return res.status(400).json({ error: 'Nome do cliente e descrição são obrigatórios!' });
    }

    
    next();
};

module.exports = validateOrder;