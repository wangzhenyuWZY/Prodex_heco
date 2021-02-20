
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name)
    return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content); //从一个对象解析出字符串
  }
  window
    .localStorage
    .setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name)
    return;
  return window
    .localStorage
    .getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name)
    return;
  window
    .localStorage
    .removeItem(name);
};

/**
 * 判断值是否是空 是空返回true，不是空返回false；
 * @param data
 */
export const objIsNull = data => {
  var flag = true;
  if (data != null && data != undefined && data != "" && data != "null" && data != "nil" && data != "undefined") {
    flag = false;
  }
  return flag;
}


/**
 * 时间戳转换
 * 传入时间戳
 * 返回 yyyy-mm-dd HH-mm-ss
 */
export const formartTimeStamp = (timestamp) => {
  let date = new Date(timestamp * 1000); //如果date为13位不需要乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
};

export const plusXing = (str,frontLen,endLen) => { 
  var len = str.length-frontLen-endLen;
  var xing = '';
  for (var i=0;i<len;i++) {
    xing ='*******';
  }
  return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
}
