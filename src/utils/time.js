export function getTime () {
    var now = new Date()
    var year = now.getFullYear() // 得到年份
    var month = now.getMonth()// 得到月份
    var date = now.getDate()// 得到日期

    var hour = now.getHours()// 得到小时
    var minu = now.getMinutes()// 得到分钟
    var sec = now.getSeconds()// 得到秒

    month = month + 1
    if (month < 10) month = '0' + month
    if (date < 10) date = '0' + date
    if (hour < 10) hour = '0' + hour
    if (minu < 10) minu = '0' + minu
    if (sec < 10) sec = '0' + sec

    var times = year + '-' + month + '-' + date + ' ' + hour + ':' + minu + ':' + sec
    return times
}
