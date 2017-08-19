import {get,post} from './request'

export function getPageData () {
  return get({
    url: '/getPageData'
  })
}

export function getPageInfo (projectKey, pathKey) {
  return post({
    url: '/getPageInfo',
    body: {
      projectKey,
      pathKey
    }
  })
}

export function searchPageList (key, value) {
  return post({
    url: '/searchPageList',
    body: {
      key,
      value
    }
  })
}

export function getOnlineLink() {
  return post({
    url: '/getOnlineLink',
  })
}

export function searchPageOnlineLink(projectKey, pathKey) {
  return post({
    url: '/searchPageOnlineLink',
    body: {
      projectKey,
      pathKey
    }
  })
}



export function getDeployList() {
  return post({
    url: '/webhook/getDeployList',
  })
}

export function startDeploy(name) {
  return post({
    url: '/webhook/deploy/'+name,
  })
}

