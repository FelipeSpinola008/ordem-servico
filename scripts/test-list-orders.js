const { listAllOrders} = require('../src/controllers/OrderController');

async function runTest() {
    try {
        console.log('🔍 buscando todas as ordens no banco de dados...');
        const orders = await listAllOrders();

        console.log(`📋 total de ordens encontradas: ${orders.length}`);
        console.table(orders);

        process.exit(0);
    } catch (err) {
        console.error('❌ Erro no teste:', err.message);
        process.exit(1);
    }
}

runTest();