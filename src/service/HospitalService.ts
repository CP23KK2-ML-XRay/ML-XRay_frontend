// const API_URL = "http://localhost:8080/api";
const API_URL = "https://ml-xray.org/api";
export default class HospitalService {
  retrieveListPatients() {
    return fetch(`${API_URL}/hos/patients/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ("Bearer " +
          localStorage.getItem("accessToken")) as string,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to retrieveListPatients");
      }
      return response.json(); // return response data
    });
  }

  retrievePatient(id: string) {
    return fetch(`${API_URL}/hos/patients/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ("Bearer " +
          localStorage.getItem("accessToken")) as string,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to retrieveListPatients");
      }
      return response.json(); // return response data
    });
  }

  createPatient(data: any) {
    return fetch(`${API_URL}/hos/patients/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ("Bearer " +
          localStorage.getItem("accessToken")) as string,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to retrieveListPatients");
      }
      return response.json(); // return response data
    });
  }
  updatePatient(id: string, data: any) {
    return fetch(`${API_URL}/hos/patients/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: ("Bearer " +
          localStorage.getItem("accessToken")) as string,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to retrieveListPatients");
      }
      return response.json(); // return response data
    });
  }
  deletePatient(id: string) {
    return fetch(`${API_URL}/hos/patients/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: ("Bearer " +
          localStorage.getItem("accessToken")) as string,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to retrieveListPatients");
      }
      return response.json(); // return response data
    });
  }
  searchPatient(name: string) {
    return fetch(`${API_URL}/hos/patients/search?name=${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ("Bearer " +
          localStorage.getItem("accessToken")) as string,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to retrieve list of patients");
      }
      return response.json(); // return response data
    });
  }
}
