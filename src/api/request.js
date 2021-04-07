import axios from 'axios'
const qs = require('qs')
// 根据环境不同引入不同api地址
import { baseApi } from '@/config'
const service = (url,method,data) =>{
  const jsonUrl = (json) => {
    let arr = []
    let str = ''
    for (let i in json) {
      str = i + '=' + json[i]
      arr.push(str)
    }
    arr.push('v='+Math.random())
    return arr.join('&')
  }
  let realUrl = baseApi+url
  let type = method.toLowerCase()
  let res = {}
  let headers = {
    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
    // 'lang':getStore('lang'),
    // 'token':getStore('token')
  }
  if(type === 'get' || type==='restful'){
    console.log(realUrl)
    res = axios.get(realUrl + '?' + jsonUrl(data),{headers:headers})
    .catch(function (error) {
      alert(error)
    });
  } else if(type === 'post'){
    if(url=='/picture/img'){
      headers = {
        'Content-Type':'multipart/form-data'
      }
      res = axios.post(realUrl,data,{headers:headers})
      .catch(function (error) {
        alert(error)
      })
    }else{
      res = axios.post(realUrl,qs.stringify(data),{headers:headers})
      .catch(function (error) {
        alert(error)
      })
    }
    
  } else if(type === 'put') {
    res = axios.put(realUrl,qs.stringify(data))
    .catch(function (error) {

    })
  }
  return res
}
export default service
