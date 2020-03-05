const { isValidCron } = require('cron-validator')
const parser = require('cron-parser')

module.exports = (req, res, next) => {
  const { expression, name } = req.body

  if (isValidCron(expression)) {
    res.locals.job = {
      expression,
      name: name || 'My New Cron',
      run_time: parser
        .parseExpression(expression)
        .next()
        .toString()
    }
    return next()
  }
  throw new Error('Invalid Expression')
}
