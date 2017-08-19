import qs from 'query-string'
import config from '@/config-web.js'

const apiPrefix = config.apiPrefix || ''
const defaultHttpContentType = 'application/json'

// 请求http的Content-Type格式, 一般为application/json, 某系系统比较老旧, 所以还是兼容form形式
let defaultHeaders = {
  'Accept': 'application/json'
}
let defaultType
if (defaultHttpContentType && defaultHttpContentType !== 'default') {
  defaultHeaders = {
    ...defaultHeaders,
    'Content-Type': defaultHttpContentType
  }
  defaultType = 'json'
} else {
  defaultType = 'form'
}

const defaultOptions = {
  credentials: 'same-origin'
}

// 处理基本的错误, 如500, 404等等
function filterStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    let error = new Error(res.statusText)
    error.res = res
    error.type = 'http'

    
    throw error
  }
}

// 解析为json格式
export function parseJSON (res) {
  return res.json()
      .catch(err => {
        if (err) {
          err.type = 'json'
          err.res = res
        }
        throw err
      })
}

// 处理错误的返回信息(200)
export function filterData (data) {
  if (data.code === 0 || data.code === 100004) {
    return data.data
  }
  let error = new Error(data.msg || data.message)
  error.data = data
  error.type = 'data'

  throw error
}

// 转换成form表单形式
function toForm (body) {
  let form = new FormData()
  Object.keys(body).forEach(key => {
    if (body[key] !== undefined) {
      form.append(key, body[key])
    }
  })
  return form
}

function parseResponse (response, setting = {}) {
  let {statusFilter = true, jsonFilter = true, dataFilter = true, originRes = false} = setting
  let result = response

  if (statusFilter) {
    result = result.then(filterStatus)
  }

  if (originRes) {
    return result
  }

  if (jsonFilter) {
    result = result.then(parseJSON)
  }

  if (dataFilter) {
    result = result.then(filterData)
  }
  return result
}

// 转换成qs
function toQs (body) {
  let qsUrl = {}
  Object.keys(body).forEach(key => {
    if (body[key] !== undefined) {
      qsUrl[key] = body[key]
    }
  })
  return qs.stringify(qsUrl)
}

export function get ({url, params = {}, headers = {}, options = {}, setting = {}}) {
  if (url.indexOf('/') === 0) {
    url = apiPrefix + url
  }
  if (params && toQs(params)) {
    url += '?' + toQs(params)
  }
  let fetchOptions = {
    headers: {
      ...defaultHeaders,
      ...headers
    },
    ...defaultOptions,
    ...options
  }

  return parseResponse(fetch(url, fetchOptions), setting)
}

export function post ({url, body = {}, headers = {}, options = {}, type = defaultType, setting = {}, removeEmpty = false}) {
  if (url.indexOf('/') === 0) {
    url = apiPrefix + url
  }
  if (removeEmpty) {
    body = removeEmptyKey(body)
  }

  switch (type) {
    case 'file':
      body = toForm(body)
      break
    case 'form':
      body = toQs(body)
      break
    default:
      body = JSON.stringify(body)
  }

  let fetchOptions = {
    method: 'POST',
    body,
    headers: {
      ...defaultHeaders,
      ...headers
    },
    ...defaultOptions,
    ...options
  }

  if (defaultType === 'json' && type === 'form') {
    fetchOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  }

  if (type === 'file') {
    delete fetchOptions.headers['Content-Type']
  }

  if (type === 'json') {
    fetchOptions.headers['Content-Type'] = 'application/json'
  }

  return parseResponse(fetch(url, fetchOptions), setting)
}

export function removeEmptyKey (body) {
  let result = {}
  Object.keys(body).forEach(key => {
    if (body[key] !== '') {
      result[key] = body[key]
    }
  })
  return result
}

/*
 * request 文档：
 * 方法： get(options)、post(options)
 * 参数：options: {
 *   url: '请求地址',
 *   body: 'body',
 *   params: 'queryString的object',
 *   setting: {
 *      statusFilter: true,  // 是否开启http status过滤器
 *      jsonFilter: true,    // 是否开启json过滤器，开启后会parseJson
 *      dataFilter: true     // 是否开启data字段过滤，开启后会判断code码，然后返回data值
 *   },
 *   type: '请求类型',  //  file: 文件上传   json: application/json  form: application/x-www-form-urlencoded;charset=utf-8
 *   removeEmpty: false
 * }
 *
 *
 * */

