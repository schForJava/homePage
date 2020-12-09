// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function checkCardNo(rule, value, callback) {
  // 检测证件号输入是否正确
  const card = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/
  if (!value) {
    callback()
  } else {
      if (card.test(value)) {
          callback()
      } else {
          if (value.length != 18) {
              callback(new Error('证件号码长度必须为18位'))
          } else {
              callback(new Error('证件号码格式不正确'))
          }
      }
  }
}

/*
  2019-10-10 10:10:10
*/
export function transformDate(now) {
  const year = now.slice(0, 4)
  const month = now.slice(4, 6)
  const date = now.slice(6, 8)
  const hour = now.slice(8, 10)
  const minute = now.slice(10, 12)
  const second = now.slice(12)
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}

export function checkTelePhone(rule, value, callback) {
    // 检测手机号输入是否正确
    const phone = /^1[3|4|5|7|8][0-9]{9}$/

    if (value) {
        if (phone.test(value)) {
            callback()
        } else {
            callback(new Error('手机号码格式不正确'))
        }
    } else {
        callback()
    }
}

export function checkEmail(rule, value, callback) {
  // 检测邮箱号输入是否正确
  const email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

  if (value) {
    if (email.test(value)) {
        callback()
    } else {
        callback(new Error('邮箱格式不正确'))
    }
  } else {
    callback()
  }
}

export function checkNum(rule, value, callback) {
  // 检测是否为数字
  if (!value) {
    callback()
  } else {
      if (Number(value)) {
          callback()
      } else {
          callback(new Error('请输入数字'))
      }
  }
}

export function checkPostalcode(rule, value, callback) {
  // 检测邮编是否输入正确
  var re = /^[1-9][0-9]{5}$/
  if (value) {
      if (re.test(value)) {
          callback()
      } else {
          callback(new Error('邮编格式不正确'))
      }
  } else {
      callback()
  }
}

