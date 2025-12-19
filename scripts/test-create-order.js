const { RegisterOrder } = require('../src/controllers/OrderController');

async function runtTest() {
    try {
        console.log('🚀 Tentando criar uma ordem de teste...');
        const newOrder = await registerOrder('Felipe cappuccino', 'troca de teclado mecânico');
        console.log('📋 Dados retornados pelo Banco:')
        console.table(newOrder);

        process.exit(0)
    } catch (err) {
        console.error('💀 O teste falhou:', err.message);
        process.exit(1);
    }    
}
runtTest();