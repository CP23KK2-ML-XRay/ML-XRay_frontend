import axios from "axios";

// const API_URL = "https://ml-xray.org";
const API_URL = "https://ml-xray.org/api/";
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
      .post("http://localhost:8080/api/auth/signup", data)
      .then((response) => {
        console.log(response);
      });
  }

  retrieveRefreshtoken() {
    return fetch(`http://localhost:8080/api/auth/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ("Bearer " + localStorage.getItem("refreshToken")) as string,

      },
    })
    
  }
}
