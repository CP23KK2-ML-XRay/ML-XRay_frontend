import AuthenticationService from "@/service/AuthenticationService";

export const isAuthentication = () => {
  const accessToken = localStorage.getItem("accessToken");
  const accessTokenExp = localStorage.getItem("accessTokenExp");
  const refreshToken = localStorage.getItem("refreshToken");
  const refreshTokenExp = localStorage.getItem("refreshTokenExp");

  if (accessToken && accessTokenExp && refreshToken && refreshTokenExp) {
    const currentTime = new Date().getTime();
    const accessTokenExpTime = new Date(accessTokenExp).getTime();

    if (accessTokenExpTime > currentTime) {
      return true;
    } else {
      const refreshTokenExpTime = new Date(refreshTokenExp).getTime();
      if (refreshTokenExpTime > currentTime) {
        const authService = new AuthenticationService();
        return authService
          .retrieveRefreshtoken()
          .then((response) => {
            // console.log(response);
            if (response.status === 200) {
              return response.json().then((data: any) => {
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("accessTokenExp", data.accessTokenExp);
                localStorage.setItem("refreshToken", data.refreshToken);
                localStorage.setItem("refreshTokenExp", data.refreshTokenExp);
                return true; // Return true after updating localStorage
              });
            } else {
              return false;
            }
          })
          .catch((error) => {
            console.error("Error refreshing token:", error);
            return false;
          });
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
};

// export const isAuthentication = () => {
//   const accessToken = localStorage.getItem("accessToken");
//   const accessTokenExp = localStorage.getItem("accessTokenExp");
//   const refreshToken = localStorage.getItem("refreshToken");
//   const refreshTokenExp = localStorage.getItem("refreshTokenExp");

//   console.log(accessToken);
//   console.log(accessTokenExp);
//   console.log(refreshToken);
//   console.log(refreshTokenExp);
//   if (accessToken) {
//     return true;
//   } else {
//     false;
//   }
// };
