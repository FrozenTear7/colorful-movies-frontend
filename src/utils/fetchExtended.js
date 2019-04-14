import config from '../config.json'

export const fetchWithApiKey = (params) => {
  let requestURL = new URL('https://www.omdbapi.com')

  params = {...params, apikey: config.omdb_api_key}

  requestURL.search = new URLSearchParams(params)

  return fetch(requestURL, {
    method: 'GET',
  })
}

export const fetchWithToken = (url, options) => {
  let requestURL = new URL('http://localhost:3001' + url)

  return fetch(requestURL, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'userid': localStorage.getItem('userId'),
    },
  })
}