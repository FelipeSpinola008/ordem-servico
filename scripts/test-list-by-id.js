const { getOrderById } = require("../src/controllers/OrderController");

async function runTest() {
    try {
        console.log('🔍 buscando ordem...');
        const listOrder = await getOrderById(4);
        console.table(listOrder);

        process.exit(0);
    } catch (err) {
        console.error('💀 O teste falhou:', err.message);
        process.exit(1);
    }
}

runTest();