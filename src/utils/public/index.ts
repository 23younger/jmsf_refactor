/*
 * @Author: xh
 * @Date: 2021-08-23 14:22:27
 * @LastEditTime: 2022-03-09 10:32:50
 * @LastEditors: Please set LastEditors
 * @Description:
 */
/*函数，用来得到精确的除法结果
 * 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 * 调用：accDiv(arg1,arg2)
 * 返回值：arg1除以arg2的精确结果
 */

function accDiv(arg1, arg2) {
  let t1 = 0,
    t2 = 0;
  let r1 = 0,
    r2 = 1;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

/*乘法函数，用来得到精确的乘法结果
 *说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 *调用：accMul(arg1,arg2)
 *返回值：arg1乘以arg2的精确结果
 */
function accMul(arg1, arg2) {
  let m = 0;
  const s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
}

/*加法函数，用来得到精确的加法结果
 *说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 *调用：accAdd(arg1,arg2)
 *返回值：arg1加上arg2的精确结果
 */
function accAdd(arg1, arg2) {
  let r1,
    r2,
    m = 1;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

/*减法函数，用来得到精确的减法结果
 *说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
 *调用：accSubtr(arg1,arg2)
 *返回值：arg1减去arg2的精确结果
 */
function accSubtr(arg1, arg2) {
  let r1,
    r2,
    m = 1,
    n = 0;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/*
 * 四舍五入精确位数
 */
function accRound(num, n) {
  let f = parseFloat(num);
  if (isNaN(f)) {
    return false;
  }
  f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n);
  let s = f.toString();
  let rs = s.indexOf('.');
  if (rs < 0 && n > 0) {
    rs = s.length;
    s += '.';
  }

  while (s.length <= rs + n) {
    s += '0';
  }
  return s;
}

/*
 * 元转分
 */
function yuanToCents(num) {
  return accMul(num, 100);
}

/*
 * 分转元
 */
function centsToYuan(num, n) {
  return accRound(accDiv(num, 100), n);
}

/**
 * @description: 节流
 * @param {any} fn
 * @param {number} delay
 * @return {*}
 */
const throttle = (fn: any, delay: number): any => {
  let late = 0;
  return (...args: any[]) => {
    const now: number = Date.now();
    if (now > late + delay) {
      late = now;
      fn.apply(this, args);
    }
  };
};

// 数字转大写中文
function number_chinese(str) {
  let num = parseFloat(str);
  let strOutput = '',
    strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
  num += '00';
  const intPos = num.indexOf('.');
  if (intPos >= 0) {
    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
  }
  strUnit = strUnit.substr(strUnit.length - num.length);
  for (let i = 0; i < num.length; i++) {
    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
  }
  return strOutput
    .replace(/零角零分$/, '整')
    .replace(/零[仟佰拾]/g, '零')
    .replace(/零{2,}/g, '零')
    .replace(/零([亿|万])/g, '$1')
    .replace(/零+元/, '元')
    .replace(/亿零{0,3}万/, '亿')
    .replace(/^元/, '零元');
}

// 时间戳转换
const dateToTime = () => {
  const date = new Date();
  const dateStr =
    date.getFullYear() +
    '' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '' +
    date.getDate().toString().padStart(2, '0') +
    '' +
    date.getHours().toString().padStart(2, '0') +
    '' +
    date.getMinutes().toString().padStart(2, '0') +
    '' +
    date.getSeconds().toString().padStart(2, '0');
  return dateStr;
};

// 打印数据转换
const printTrans = (fundItemsArr) => {
  const fundItems: any[] = [];
  for (let i = 0; i < fundItemsArr.length; ) {
    const item = {};
    if (fundItemsArr[i]) {
      item['leftFundItemName'] = fundItemsArr[i].fundItemName;
      item['leftAmount'] = fundItemsArr[i].amountText;
    }
    if (fundItemsArr[i + 1]) {
      item['rightFundItemName'] = fundItemsArr[i + 1].fundItemName;
      item['rightAmount'] = fundItemsArr[i + 1].amountText;
    }
    if (fundItemsArr[i]) {
      fundItems.push(item);
    }
    i = i + 2;
  }
  return fundItems;
};

// 金额添加千分位负号
function numThFormat(num) {
  const res = num.replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ',';
    });
  });
  return res;
}

// 千位分隔符, 保留两位小数
function toThousands(num) {
  return (num || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

export default {
  accDiv,
  accMul,
  accAdd,
  accSubtr,
  accRound,
  yuanToCents,
  centsToYuan,
  throttle,
  number_chinese,
  dateToTime,
  printTrans,
  numThFormat,
  toThousands,
};
