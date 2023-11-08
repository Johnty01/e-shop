const express = require("express")
const { getAllProducts,createProduct,updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController")

const router = express.Router()

router.route("/products").get(getAllProducts)
router.route("/product/new").post(createProduct)
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails)//cannot keep products/:id because it will understand both route same
//routers clash in node with same string before /id
//so if first route has /product then it can clash with third route

module.exports = router