const bcrypt = require('bcrypt')

module.exports = async (passwordDigest, password, res) => {
  try {
    return await bcrypt.compare(password, passwordDigest)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
