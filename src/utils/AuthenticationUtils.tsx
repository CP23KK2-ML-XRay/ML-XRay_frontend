import AuthenticationService from "@/service/Authentication";

export const isAuthentication = () => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const accessTokenExp = JSON.parse(userData).accessTokenExp;
    const currentTime = new Date().getTime();
    if (accessTokenExp > currentTime) {
      return true;
    } else {
      const refreshTokenExp = JSON.parse(userData).refreshTokenExp;
      if (refreshTokenExp > currentTime) {
        const authService = new AuthenticationService();
        authService.retrieveRefreshtoken().then((response) => {
          localStorage.setItem("userData", response.data);
        });
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
};
