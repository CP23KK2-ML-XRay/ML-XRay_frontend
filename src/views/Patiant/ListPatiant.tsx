import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const ListPatient = () => {
  const [usersData, setUsersData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ml-xray.org/api/hos/patients/",
          {
            headers: {
              Authorization: ("Bearer " +
                localStorage.getItem("token")) as string,
              "Content-Type": "application/json", // Optional: Content-Type header
              email: localStorage.getItem("email") as string,
            },
          }
        );
        if (response.status === 200) {
          setUsersData(response.data);
        }
        console.log(usersData);
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error here
          console.error("Patients not found:", error);
        } else {
          // Handle other errors
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    phone_number: "",
    gender: "M", // Default value
    weight: "",
    height: "",
    blood_type: "A+",
    medic_person: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "phone_number" && value.length > 10) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Phone number cannot exceed 10 characters",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
    
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    console.log("Data submitted successfully:", formData);
    try {
      await axios.post("https://ml-xray.org/api/hos/patients/", formData, {
        headers: {
          "Content-Type": "application/json", // Optional: Content-Type header
          email: localStorage.getItem("email") as string,
        },
      });
      Swal.fire({
        title: "Added!",
        text: "You can see your patient in patients record.",
        icon: "success",
      });

      setIsHidden(true);
      // console.log('Data submitted successfully:', response.data);
      // Optionally, you can reset the form data after successful submission
      setFormData({
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        phone_number: "",
        gender: "Male", // Default value
        weight: "",
        height: "",
        blood_type: "A+",
        medic_person: 1, // Default value
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
      // window.location.reload();
    } catch (error) {
      Swal.fire({
        title: "error!",
        text: "Can't add patient. Please try again.",
        icon: "error",
      });
      //   console.error("Error submitting data:", error);
    }
  };

  const validateForm = (data: typeof formData) => {
    const errors: any = {};
    if (!data.firstname) errors.firstname = "First name is required";
    if (!data.lastname) errors.lastname = "Last name is required";
    if (!data.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    if (!data.phone_number) {
      errors.phone_number = "Phone number is required";
    } else if (data.phone_number.length > 10) {
      errors.phone_number = "Phone number cannot exceed 10 characters";
    }
    return errors;
  };

  const [isHidden, setIsHidden] = useState(true);

  // const toggleVisibility = () => {
  //     setIsHidden(!isHidden);
  // };

  const handleDelete = async (id: any) => {
    console.log(id);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`http://localhost:8082/api/hos/patients/${id}`, {
            headers: {
              "Content-Type": "application/json", // Optional: Content-Type header
              email: localStorage.getItem("email") as string,
            },
          });
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="w-full pt-4">
      <div className="flex w-full justify-center">
        <div className="w-full overflow-x-auto shadow-2xl rounded-lg">
          <table className="w-full text-sm text-center text-gray-500">
            <caption className="p-5 text-lg font-semibold text-left  text-gray-900 bg-white ">
              Patients Record
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Patients
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Date of Birth
                </th>
                {/* <th scope="col" className="px-6 py-3">
                                    Status
                                </th> */}
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData.length > 0 ? (
                usersData.map((user, index) => (
                  <tr className="bg-white border-b" key={index}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">
                      {user.firstname + "  " + user.lastname}
                    </td>
                    <td className="px-6 py-4">{user.gender}</td>
                    <td className="px-6 py-4">{user.dateOfBirth}</td>
                    {/* <td className="px-6 py-4"></td> */}
                    <td className="px-6 py-4 text-center hover:cursor-pointer">
                      <button
                        className="font-medium text-blue-600 hover:underline mr-1"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                      <Link
                        to={`/detail/${user.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b mt-2 hover:cursor-pointer">
                  <td
                    colSpan={6}
                    className="px-6 py-2 text-2xl"
                    onClick={() => {
                      setIsHidden(false);
                    }}
                  >
                    ไม่มีคนไข้
                  </td>
                </tr>
              )}
              <tr className="bg-white border-b mt-2 hover:cursor-pointer">
                <td
                  colSpan={6}
                  className="px-6 py-2 text-2xl"
                  onClick={() => {
                    setIsHidden(false);
                  }}
                >
                  +
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {isHidden ? null : (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen bg-gray-100/40">
            {/* Modal Container */}
            <div className="bg-white p-6 rounded-lg w-2/3 ">
              <div className="flex justify-between items-center text-center text-blue-600 text-2xl font-bold py-6 px-6">
                <div>Add new patients</div>
                <div className="hover:cursor-pointer">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    onClick={() => {
                      setIsHidden(true);
                    }}
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              {/* Form Content */}

              <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex flex-wrap mx-3 mb-6">
                  <button
                    type="button"
                    className="right-0 top-0 absolute rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                      onClick={() => {
                        console.log("modal closed ");
                      }}
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase justify-center tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="firstname"
                    >
                      First Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="firstname"
                      type="text"
                      placeholder="Johhny"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="lastname"
                    >
                      Last Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="lastname"
                      type="text"
                      placeholder="Sins"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mx-3 mb-6">
                  <div className="w-1/3 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="dateofbirth"
                    >
                      Date of birth
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="date"
                      placeholder="Please select a date"
                      id="dateofbirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="phone"
                    >
                      Phone number
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="phone"
                      type="text"
                      placeholder="(+66)"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="gender"
                    >
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="M" selected>
                          Male
                        </option>
                        <option value="F">Female</option>
                      </select>
                      <div className="absolute inset-y-0 right-1 pointer-events-none flex items-center text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap mx-3 mb-8">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="weight"
                    >
                      Weight
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="weight"
                      type="text"
                      placeholder="kg."
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="height"
                    >
                      Height
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="height"
                      type="text"
                      placeholder="cm."
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="blood-type"
                    >
                      Blood type
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="blood-type"
                        name="blood_type"
                        value={formData.blood_type}
                        onChange={handleChange}
                      >
                        <option>A positive (A+)</option>
                        <option>A negative (A-)</option>
                        <option>B positive (B+)</option>
                        <option>B negative (B-)</option>
                        <option>AB positive (AB+)</option>
                        <option>AB positive (AB+)</option>
                        <option>O positive (O+)</option>
                        <option>O negative (O-)</option>
                      </select>
                      <div className="absolute inset-y-0 right-1 pointer-events-none flex items-center text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              {/* Action Buttons */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
