// const API_URL = "http://localhost:8080/api";
const API_URL = "https://ml-xray.org/api";
export default class AuthenticationService {
  signIn(data: any): Promise<any> {
    return fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to sign in.");
      }
      return response.json(); // return response data
    });
  }

  signUp(data: any): Promise<void> {
    return fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to sign up.");
      }
    });
  }

  retrieveRefreshtoken(): Promise<any> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return Promise.reject("No refresh token found.");
    }

    return fetch(`${API_URL}/auth/refreshToken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to refresh token.");
      }
      return response.json(); // return response data
    });
  }

  retrieveUser(email: string) {
    return fetch(`${API_URL}/auth/info/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ("Bearer " +
          localStorage.getItem("accessToken")) as string,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to retrieveUserInfo");
      }
      return response.json(); // return response data
    });
  }

  updatePassword(resetPassword: any): Promise<void> {
    return fetch(`${API_URL}/auth/updatePassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: ("Bearer " +
          localStorage.getItem("accessToken")) as string,
      },
      body: JSON.stringify(resetPassword),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update password.");
      }
    });
  }
}
