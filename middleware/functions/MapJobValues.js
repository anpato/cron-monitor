module.exports = (data, UpperCaser) => {
  let tableData = {
    headers: [],
    data: []
  }
  data.forEach(({ dataValues }) => {
    const excludedKeys = ['timezone', 'notification_time']
    Object.keys(dataValues).forEach(key => {
      if (
        !tableData.headers.includes(UpperCaser(key)) &&
        !excludedKeys.includes(key) &&
        !tableData.headers.includes('Notifications')
      ) {
        if (key === 'wants_notifications') {
          tableData.headers.push('Notifications')
        } else {
          tableData.headers.push(UpperCaser(key))
        }
      }
    })
    const obj = {
      id: dataValues.id,
      name: dataValues.name,
      status: dataValues.status,
      expression: dataValues.expression,
      runTime: dataValues.next_run_time.toLocaleString(),
      wantsNotifications: dataValues.wants_notifications,
      notificationTime: dataValues.notification_time,
      timezone: dataValues.timezone
    }
    tableData.data.push(obj)
  })
  return tableData
}
