const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const validateOrder = require('../middlewares/validateOrder');

// rota para listar as ordens 
router.get('/', async (req, res) => {
    try {
        const orders = await orderController.listAllOrders();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Erro embuscar ordens' });
    }
});

// rota para listar ordem por id
router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const order = await orderController.getOrderById(id);
        res.status(200).json(order[0]);
    } catch (err) {
        res.status(404).json({ message: 'ordem não encontrada'})
    }
});

// rota para criar nova ordem
router.post('/', validateOrder, async (req, res) => {
    try{
        const { customer, description } = req.body;
        const newOrder = await orderController.registerOrder(customer, description);
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar ordem' });
    }
});

// rota para atualizar o status
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 
        const updatedOrder = await orderController.updateOrderStatus(id, status);
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar ordem' });
    }
});

// 4. Rota para deletar (O nosso 'Delete')
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await orderController.deleteOrders(id);
        res.status(200).json({ message: 'Ordem deletada', data: deletedOrder });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar ordem' });
    }
});

module.exports = router;