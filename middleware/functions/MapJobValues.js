module.exports = (data, UpperCaser) => {
  let tableData = {
    headers: [],
    data: []
  }
  data.forEach(({ dataValues }) => {
    const excludedKeys = [
      'timezone',
      'wants_notifications',
      'notification_time'
    ]
    Object.keys(dataValues).forEach(key => {
      if (
        !tableData.headers.includes(UpperCaser(key)) &&
        !excludedKeys.includes(key)
      ) {
        tableData.headers.push(UpperCaser(key))
      }
    })
    const obj = {
      id: dataValues.id,
      name: dataValues.name,
      status: dataValues.status,
      expression: dataValues.expression,
      runTime: dataValues.next_run_time.toLocaleString(),
      wantsNotifications: dataValues.wants_notifications,
      notificationTime: dataValues.notification_time
    }
    tableData.data.push(obj)
  })
  return tableData
}
