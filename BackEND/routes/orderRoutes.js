import express from 'express'
//it handle api request
const router=express.Router()
import {addOrderItems,getOrderById,updateOrderToPaid} from '../controllers/orderController.js'
import {protect} from '../middleware/authMiddleware.js'
//which allow the function to pause its execution until a Promise is resolved.
// While the Promise is being resolved, the JavaScript engine can continue executing
// other code.

router.route('/').post(protect,addOrderItems)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)

export default router