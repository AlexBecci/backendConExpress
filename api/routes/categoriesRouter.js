const express = require('express');

const router = express.Router();


router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  })
})

router.get('/', (req, res) => {
  res.json({
    name: 'category 1',
    color: "red"
  })
})
module.exports = router;
