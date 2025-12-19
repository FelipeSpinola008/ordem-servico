const pool = require('../config/db');

/**
 * Registra uma nova Ordem de Serviço no banco de dados.
 * @param {string} customer - Nome do cliente.
 * @param {string} description - Detalhes do serviço.
 */

const registerOrder = async (customer, description) => {
    const query = `INSERT INTO service_orders (customer_name, description)
    VALUES ($1, $2)
    RETURNING *;
    `;
    const values = [customer, description];

    try {
        const res = await pool.query(query, values);
    
        console.log('✅ Ordem salva no banco com sucesso!')
        return res.rows[0];
    } catch (err) {
        console.error('❌ Erro no Controller ao salvar:', err.message);
        throw err;
    }
};


const listAllOrders = async() => {
    try {
        const res = await pool.query('SELECT * FROM service_orders');
        
        console.log('✅ Ordem listada com sucesso!')
        return res.rows;
    } catch (err) {
        console.error('❌ Erro ao listar as ordens', err.message);
        throw err;
    }
}

module.exports = { 
    registerOrder,
    listAllOrders };

