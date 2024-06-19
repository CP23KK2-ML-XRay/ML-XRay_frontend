// const API_URL = "http://localhost:8080/api";
const API_URL = 'https://ml-xray.org/api'
export default class MachineService {
  retrieveListModel() {
    return fetch(`${API_URL}/ml/listmodel`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ('Bearer ' +
          localStorage.getItem('accessToken')) as string,
      },
    }).then((response) => {
      if (!response.ok) {
        return false
        // throw new Error('Failed to retrieveListModel')
      }
      return response.json() // return response data
    })
  }

  getResultPrediction(data: any) {
    return fetch(`${API_URL}/ml/predict`, {
      method: 'POST',
      headers: {
        Authorization: ('Bearer ' +
          localStorage.getItem('accessToken')) as string,
      },
      body: data,
    }).then((response) => {
      if (!response.ok) {
        return false
        // throw new Error('Failed to getResultPrediction')
      }
      return response.json() // return response data
    })
  }

  createModel(data: any) {
    return fetch(`${API_URL}/ml/uploadmodel`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: ('Bearer ' +
          localStorage.getItem('accessToken')) as string,
      },
      body: data,
    }).then((response) => {
      return response.json().then((data) => {
        return { status: response.ok, data };  // Return success status and response data
      }); // return response data
    })
  }
}
