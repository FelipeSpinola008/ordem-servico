const pool = require('../src/config/db');
async function testConnection() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('✅ Conexão bem-sucedida!');
        console.log('🕒 Hora no Banco de Dados:', res.rows[0].now);
        process.exit(0); // Fecha o teste com sucesso
    } catch (err) {
        console.error('❌ Erro ao conectar no banco:', err.message);
        process.exit(1); 
    }
}

testConnection();