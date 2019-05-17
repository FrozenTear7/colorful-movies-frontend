export const fetchWithToken = (url, options) => {
    // let requestURL = new URL('https://afterimage-backend.herokuapp.com' + url)
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