const db = require('../db')

async function getUsers () {
  const pools = await db.pools()
  const users = await pools.request().query('SELECT * from dbo.[User]')
  return users
}

// async function getOrder (orderId) {
//   try {
//     const pool = await sql.connect(config)
//     const product = await pool.request()
//       .input('input_parameter', sql.Int, orderId)
//       .query('SELECT * from Orders where Id = @input_parameter')
//     return product.recordsets
//   } catch (error) {
//     console.log(error)
//   }
// }

// async function addOrder (order) {
//   try {
//     const pool = await sql.connect(config)
//     const insertProduct = await pool.request()
//       .input('Id', sql.Int, order.Id)
//       .input('Title', sql.NVarChar, order.Title)
//       .input('Quantity', sql.Int, order.Quantity)
//       .input('Message', sql.NVarChar, order.Message)
//       .input('City', sql.NVarChar, order.City)
//       .execute('InsertOrders')
//     return insertProduct.recordsets
//   } catch (err) {
//     console.log(err)
//   }
// }

module.exports = {
  getUsers: getUsers
  // ,getOrder: getOrder,
  // addOrder: addOrder
}
