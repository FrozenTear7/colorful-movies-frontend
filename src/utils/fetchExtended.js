import config from '../config.json'

export const fetchWithApiKey = (params) => {
  let url = new URL('http://www.omdbapi.com')

  params = {...params, apikey: config.omdb_api_key}

  url.search = new URLSearchParams(params)

  return fetch(url, {
    method: 'GET',
  })
}

export const fetchWithToken = (data) => {
  let url = new URL('http://localhost:3001/movies')

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'userid': '48',
    },
    body: JSON.stringify(data),
  })
}