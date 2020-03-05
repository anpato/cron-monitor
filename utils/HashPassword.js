const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../env')
module.exports = async (password, res) => {
  try {
    return await bcrypt.hash(password, SALT_ROUNDS)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
