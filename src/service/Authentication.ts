import axios from "axios";

// const API_URL = "http://localhost:8080/api";
const API_URL = "https://ml-xray.org/api";
export default class AuthenticationService {
  signIn(data: any) {
    return fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }

  signUp(data: any) {
    return axios
      .post(`${API_URL}/auth/signup`, data)
      .then((response) => {
        console.log(response);
      });
  }

  retrieveRefreshtoken() {
    return fetch(`${API_URL}/auth/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ("Bearer " + localStorage.getItem("refreshToken")) as string,

      },
    })
    
  }
}
