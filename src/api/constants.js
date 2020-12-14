import axios from 'axios'
const qs = require('qs')
const server = {
  development: 'http://47.241.79.62:9801/',
  production: 'http://47.241.79.62:9801/'
}

const jsonUrl = (json) => {
  let arr = []
  let str = ''
  for (let i in json) {
    str = i + '=' + json[i]
    arr.push(str)
  }
  return arr.join('&')
}

export const fet = (url,data,method,postHeaders) => {
  let realUrl = server[process.env.NODE_ENV] + url
  let type = method.toLowerCase()
  let res = {}
  if(type === 'get'){
    res = axios.get(realUrl + '?' + jsonUrl(data))
    .catch(function (error) {
      alert(error)
    });
  } else if(type === 'post'){
    res = axios.post(realUrl,qs.stringify(data),postHeaders)
    .catch(function (error) {
      alert(error)
    })
  } else if(type === 'put') {
    res = axios.put(realUrl,qs.stringify(data),postHeaders)
    .catch(function (error) {
     
    })
  }
  return res
}
