// const API_URL = "http://localhost:8080/api";
const API_URL = "https://ml-xray.org/api";
export default class MachineService {
  retrieveListModel() {
    return fetch(`${API_URL}/ml/getmodel/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ("Bearer " +
          localStorage.getItem("accessToken")) as string,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to retrieveListModel");
      }
      return response.json(); // return response data
    });
  }

  getResultPrediction(data: any) {
    return fetch(`${API_URL}/ml/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ("Bearer " +
          localStorage.getItem("accessToken")) as string,
      },
      body: data,
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to getResultPrediction");
      }
      return response.json(); // return response data
    });;
  }

  createModel(data: any) {
    return fetch(`${API_URL}/ml/uploadmodel/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ("Bearer " +
          localStorage.getItem("accessToken")) as string,
      },
      body: data,
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to createModel");
      }
      return response.json(); // return response data
    });;
  }
}
