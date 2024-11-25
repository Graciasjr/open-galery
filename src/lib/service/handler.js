const url = import.meta.env.VITE_API_BASE_URL;

/**
 * HTTP REQUEST MANAGER
 * @param {*} method 
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */
export const handler = async (method, params, body = null) => {
  try {                                                                                             
    let response
    if (body === null) {
      response = await fetch(`${url}/${params}`, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`
        },
      })
    } else {
      response = await fetch(`${url}/${params}`, {
        method: method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`
        },
        body: JSON.stringify(body)
      })
    }

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    let data = response.json()
    return data
  } catch (error) {
    console.error(error);
  }
}