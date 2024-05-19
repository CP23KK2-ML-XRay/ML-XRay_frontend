import axios from "axios";

export default class AuthenticationService {
  signIn(data: any) {
    return fetch("http://localhost:8080/api/auth/signin", {
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
    return axios
      .get("http://localhost:8080/api/auth/refreshToken")
  }
}
