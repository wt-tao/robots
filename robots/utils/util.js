function js_date_time(unixtime) {
  var date = new Date(parseInt(unixtime) * 1)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: js_date_time
}
// function js_date_time(unixtime) {
//   var dateTime = new Date(parseInt(unixtime) * 1)
//   var year = dateTime.getFullYear();
//   var month = dateTime.getMonth() + 1;
//   var day = dateTime.getDate();
//   var hour = dateTime.getHours();
//   var minute = dateTime.getMinutes();
//   var second = dateTime.getSeconds();
//   var now = new Date();
//   var now_new = Date.parse(now.toDateString());  //typescript转换写法  
//   var milliseconds = now_new - dateTime;
//   var timeSpanStr = hour + ':' + minute + ':' + second;
//   return timeSpanStr;
// }
// module.exports = {
//   js_date_time: js_date_time
// }

// module.exports = {
//   formatTime: formatTime
// }
