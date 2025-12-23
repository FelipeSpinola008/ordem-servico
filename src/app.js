require('dotenv').config();
const express = require('express');
const orderRoutes = require('./routes/OrderRoutes');
const authRoutes = require('./routes/AuthRoutes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando tranquilamente na porta ${PORT}`);
    console.log(`🔗 Teste a listagem em: http://localhost:${PORT}/api/orders`);
});
console.log("Variável JWT carregada:", process.env.JWT_SECRET ? "SIM ✅" : "NÃO ❌");

module.exports = app;