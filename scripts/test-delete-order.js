const { deleteOrders } = require('../src/controllers/OrderController');

async function runTest() {
    try {
        console.log('🔄 Deletando ordem de serviço...');
        const deleteOrder = await deleteOrders(2);
        console.table(deleteOrder);

        process.exit(0);
    } catch (err) {
        console.error('💀 O teste falhou:', err.message);
        process.exit(1);
    }
}

runTest();