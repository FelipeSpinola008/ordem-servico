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

// Lista ordens de serviços no banco de dados
const listAllOrders = async() => {
    try {
        const res = await pool.query(`SELECT * FROM service_orders WHERE status != 'CANCELADO' ORDER BY id ASC;`);
        
        console.log('✅ Ordem listada com sucesso!')
        return res.rows;
    } catch (err) {
        console.error('❌ Erro ao listar as ordens', err.message);
        throw err;
    }
}
/**
 * Filtra a ordem pelo ID
 * @param {number} id - numero do serviço
 */
const getOrderById = async(id) => {
    const query = 'SELECT * FROM service_orders WHERE id = $1';
    const list = [id];

    try {
        const res = pool.query(query, list);
        console.log(`🔍 buscando ordem pelo id: ${id}`);
        return (await res).rows;
    } catch (err) {
        console.error('❌ Erro ao listar a ordem pelo id', err.message);
        throw err;
    }
}

/**
 * atualiza o status da ordem de serviço
 * @param {number} id - numero do serviço
 * @param {string} newStatus - novo status do serviço
 */
const updateOrderStatus = async(id, newStatus) => {
    const query = 'UPDATE service_orders SET status = $2 WHERE id = $1 RETURNING *';
    const update = [id, newStatus];
    
    try {
        const res = await pool.query(query, update);
        console.log('😁✅ Ordem atualizada com sucesso!')
        return res.rows[0];
    } catch (err) {
        console.error('❌ Erro ao atualizar status:', err.message);
        throw err;
    }
}
/**
 * deleta ordem de serviço do banco de dados
 * @param {number} id - numero do serviço
 */

const deleteOrders = async(id) => {
    const query = 'DELETE FROM service_orders WHERE id = $1 RETURNING *';
    const del = [id];

    try {
        const res = await pool.query(query, del);
        console.log('👍Ordem deletada com sucesso!')
        return res.rows[0];
    } catch (err) {
        console.error('😞 não foi possível deletar o serviço:', err.message);
        throw err;
    }
}

const softDeleteOrder = async (id) => {
    const query = "UPDATE service_orders SET status = 'CANCELADO' WHERE id = $1 RETURNING *;";
    console.log(`❌ Ordem: ${id} cancelada!`)
    const res = await pool.query(query, [id]);
    return res.rows[0];
}

module.exports = { 
    registerOrder,
    listAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrders,
    softDeleteOrder };

