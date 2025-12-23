const express = require('express');
const cors = require('cors')
require('dotenv').config();
const orderRoutes = require('./routes/OrderRoutes');
const authRoutes = require('./routes/AuthRoutes');

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando tranquilamente na porta ${PORT}`);
    console.log(`🔗 Teste a listagem em: http://localhost:${PORT}/api/orders`);
});

module.exports = app;