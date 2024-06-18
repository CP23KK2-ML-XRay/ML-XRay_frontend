import HospitalService from "@/service/HospitalService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const ListPatient = () => {
  const [usersData, setUsersData] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch data when the component mounts

    try {
      const hospitalService = new HospitalService();
      hospitalService.retrieveListPatients().then((data) => {
        console.log(data);
        setUsersData(data);
        setFilteredUsers(data);
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    console.log("i fire once");
    // fetchData();
  }, []);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    phone_number: "",
    gender: "M", // Default value
    weight: "",
    height: "",
    bloodType: "A+",
    medic_person: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    phone_number: "",
    weight: "",
    height: "",
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
      const hospitalService = new HospitalService();
      const response = await hospitalService.createPatient(formData);
      console.log(response);
      if (response) {
      }
      Swal.fire({
        title: "Added!",
        text: "You can see your patient in patients record.",
        icon: "success",
      });

      setIsHidden(true);
      setFormData({
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        phone_number: "",
        gender: "Male", // Default value
        weight: "",
        height: "",
        bloodType: "A+",
        medic_person: "1", // Default value
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (error) {
      Swal.fire({
        title: "error!",
        text: "Can't add patient. Please try again.",
        icon: "error",
      });
    }
  };

  const validateForm = (data: typeof formData) => {
    const errors: any = {};
    if (!data.firstname) errors.firstname = "First name is required";
    if (!data.lastname) errors.lastname = "Last name is required";
    if (!data.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    if (!data.phone_number) {
      errors.phone_number = "Phone number is required";
    } else if (data.phone_number.length != 10) {
      errors.phone_number = "Phone number cannot exceed 10 characters";
    }
    if (!data.weight) errors.weight = "Weight is required";
    if (!data.height) errors.height = "Height is required";
    return errors;
  };

  const [isHidden, setIsHidden] = useState(true);

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
          const hospitalService = new HospitalService();
          const response = await hospitalService.deletePatient(id);
          if (response) {
            console.log(response);
          }
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === "") {
      setFilteredUsers(usersData);
    } else {
      const filtered = usersData.filter((user) =>
        `${user.firstname} ${user.lastname}`.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className="w-full pt-4">
      <div className="flex w-full justify-center">
        <div className="w-full overflow-x-auto shadow-2xl rounded-lg">
          <caption className="w-full p-5 text-lg font-semibold text-left  text-gray-900 bg-white flex items-center justify-between">
            Patients Record
            <input
              type="search"
              id="default-search"
              className="block w-2/5 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Search"
              onChange={handleSearch}
              value={searchQuery}
            />
          </caption>
          <table className="w-full text-sm text-center text-gray-500">
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
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
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
                        <svg
                          className="w-5 h-5 text-gray-800 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                          />
                        </svg>
                      </button>
                      <Link
                        to={`/detail/${user.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        <svg
                          className="w-5 h-5 text-gray-800"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                          />
                        </svg>
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
              {/* Form Content 
              Form down here
              | | | | | | | | |
              V V V V V V V V V
              
              */}

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
                    {formErrors.firstname && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.firstname}
                      </p>
                    )}
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
                    {formErrors.dateOfBirth && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.dateOfBirth}
                      </p>
                    )}
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
                    {formErrors.dateOfBirth && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.dateOfBirth}
                      </p>
                    )}
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
                      type="number"
                      placeholder="(+66)"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                    {formErrors.phone_number && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.phone_number}
                      </p>
                    )}
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
                      type="number"
                      placeholder="kg."
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                    />
                    {formErrors.weight && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.weight}
                      </p>
                    )}
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
                      type="number"
                      placeholder="cm."
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                    />
                    {formErrors.height && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.height}
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="bloodType"
                    >
                      Blood type
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="bloodType"
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                      >
                        <option selected hidden>
                          Select patient blood type
                        </option>
                        <option value="A+">A positive (A+)</option>
                        <option value="A-">A negative (A-)</option>
                        <option value="B+">B positive (B+)</option>
                        <option value="B-">B negative (B-)</option>
                        <option value="AB+">AB positive (AB+)</option>
                        <option value="O+">O positive (O+)</option>
                        <option value="O-">O negative (O-)</option>
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
