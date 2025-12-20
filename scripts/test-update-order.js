const { updateOrderStatus } = require('../src/controllers/OrderController');

async function runtTest() {
    try {
        console.log('🔄 Atualizando status da odem de serviços...');
        const updateOrder = await updateOrderStatus( '2', 'IN PROGRESS');
        console.log('📋 Dados retornados pelo Banco:');
        console.table(updateOrder);

        process.exit(0);
    } catch (err) {
        console.error('💀 O teste falhou:', err.message);
        process.exit(1);
    }
}

runtTest();