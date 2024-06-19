import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "./types";
import Swal from "sweetalert2";
import HospitalService from "@/service/HospitalService";
import MachineService from "@/service/MachineService";
import { Backdrop, CircularProgress } from "@mui/material";

export const DetailPatient = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  const patientId = id ? id : "0";

  const [userData, setUserData] = useState<Patient>();
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    phone_number: "",
    gender: "M",
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

  const [modelList, setModelList] = useState([]);
  const [selectedModel, setSelectedModel] = useState(0);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        setOpen(true);
        const hospitalService = new HospitalService();
        const data = await hospitalService.retrievePatient(patientId);
        if (data) {
          setOpen(false);
          setUserData(data);
          // console.log(data);
        } else {
          // Navigate("/404");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchDataModel = async () => {
      try {
        setOpen(true);
        const machineservice = new MachineService();
        await machineservice.retrieveListModel().then((data) => {
          if (data) {
            setOpen(false);
            setModelList(data);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    fetchDataModel();
  }, [patientId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Function to check if the value contains operators
    const containsOperator = (inputValue: string): boolean => {
      return /[+\-*\/]/.test(inputValue);
    };

    // Update form data state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate specific fields
    if (name === "dateOfBirth") {
      const selectedDate = new Date(value);
      const today = new Date();

      if (selectedDate > today) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Date of birth cannot be a future date",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    } else if (name === "phone_number") {
      if (value.length > 10) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Phone number cannot exceed 10 characters",
        }));
      } else if (containsOperator(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Phone number cannot contain operators (+, -, *, /)",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    } else if (name === "height" || name === "weight") {
      if (containsOperator(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } cannot contain operators (+, -, *, /)`,
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    } else {
      // For other fields, trim whitespace from value before updating state
      const trimmedValue = value.trim();
      setFormData((prevData) => ({
        ...prevData,
        [name]: trimmedValue,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const hospitalService = new HospitalService();
      await hospitalService.updatePatient(patientId, formData).then((data) => {
        if (data) {
          Swal.fire({
            title: "Updated!",
            text: "You patient has been updated.",
            icon: "success",
          }).then(() => {
            setFormData({
              firstname: "",
              lastname: "",
              dateOfBirth: "",
              phone_number: "",
              gender: "Male", // Default value
              weight: "",
              height: "",
              bloodType: "A+",
              medic_person: "", // Default value
            });
            setIsEdit(false);
            location.reload();
          });
        } else {
          Swal.fire({
            title: "error!",
            text: "Can't edit patient. Please try again.",
            icon: "error",
          });
        }
      });
    } catch (error) {
      Swal.fire({
        title: "error!",
        text: "Can't edit patient. Please try again.",
        icon: "error",
      });
    }
  };

  const resetFormat = () => {
    setIsEdit(false);
    setFormData({
      firstname: "",
      lastname: "",
      dateOfBirth: "",
      phone_number: "",
      gender: "Male",
      weight: "",
      height: "",
      bloodType: "",
      medic_person: "",
    });
    setFormErrors({
      firstname: "",
      lastname: "",
      dateOfBirth: "",
      phone_number: "",
      weight: "",
      height: "",
    });
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log();
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg"];

      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        console.log(file);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid file type. Please select jpeg or jpg file.",
        });
        console.error("Invalid file type. Please select a valid image file.");
      }
    }
  };

  const handleFileUpload = async () => {
    try {
      if (!selectedFile) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No file selected. Please input file.",
        });
        // console.error('No file selected');
        return;
      } else if (selectedModel == 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No model selected. Please input model.",
        });
        return;
      }
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("model_id", selectedModel.toString());
      formData.append("patient_id", patientId);

      // Use an API endpoint to handle file upload on the server
      const machineservice = new MachineService();
      await machineservice.getResultPrediction(formData).then((data) => {
        if (data) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: `${data.m_pred}`,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Can't upload file",
          });
        }
      });
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  // ------------------------Validate Form in Edit popup
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

  const handleChangeSelect = (event: any) => {
    setSelectedModel(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="w-full h-full">
      <div className="m-6">
        <div className="flex justify-center rounded-lg shadow-2x bg-white mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
            alt=""
            className="h-40 w-40 mt-5 mr-10"
          />
          <div className="information">
            <div className="pa_name m-4 text-lg flex justify-between">
              <div>
                Name: {userData?.firstname} {userData?.lastname}
              </div>
              <button
                className="font-medium text-blue-600 hover:underline"
                onClick={() => setIsEdit(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
                </svg>
              </button>
            </div>
            <div className="pa_normal flex">
              <p className="m-4">Gender: {userData?.gender}</p>
              <p className="m-4">Date of Birth: {userData?.dateOfBirth}</p>
            </div>
            <div className="pa_medic flex">
              <div className="p-4 border-dashed border-2 border-gray-500 m-4 rounded-lg flex flex-col">
                <div>{userData?.weight}</div>
                <div>Weight</div>
              </div>
              <div className="p-4 border-dashed border-2 border-gray-500 m-4 rounded-lg flex flex-col">
                <div>{userData?.height}</div>
                <div>Height</div>
              </div>
              <div className="p-4 border-dashed border-2 border-gray-500 m-4 rounded-lg flex flex-col">
                <div>{userData?.bloodType}</div>
                <div>Blood Type</div>
              </div>
            </div>
          </div>
        </div>

        {isEdit && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 relative w-1/3">
              <div className="flex justify-end mb-4">
                <div className="cursor-pointer" onClick={() => resetFormat()}>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* | | | | | | | | | | | | | | | | | | | |  This is pop-up edit page
                  V V V V V V V V V V V V V V V V V V V V  */}

              <form
                className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {formErrors.firstname && (
                      <div className="text-red-500 text-sm mt-2">
                        {formErrors.firstname}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {formErrors.lastname && (
                      <div className="text-red-500 text-sm mt-2">
                        {formErrors.lastname}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {formErrors.dateOfBirth && (
                      <div className="text-red-500 text-sm mt-2">
                        {formErrors.dateOfBirth}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {formErrors.phone_number && (
                      <div className="text-red-500 text-sm mt-2">
                        {formErrors.phone_number}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-2900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Weight
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {formErrors.weight && (
                      <div className="text-red-500 text-sm mt-2">
                        {formErrors.weight}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Height
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {formErrors.height && (
                      <div className="text-red-500 text-sm mt-2">
                        {formErrors.height}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Blood Type
                    </label>
                    <select
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-2900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      id="bloodType"
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                    >
                      <option hidden>Select patient blood type</option>
                      <option value="A+">A positive (A+)</option>
                      <option value="A-">A negative (A-)</option>
                      <option value="B+">B positive (B+)</option>
                      <option value="B-">B negative (B-)</option>
                      <option value="AB+">AB positive (AB+)</option>
                      <option value="O+">O positive (O+)</option>
                      <option value="O-">O negative (O-)</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="w-full p-4 rounded-md shadow-2xl  bg-white">
          <div className="text-3xl text-center p-4">Diagnose</div>
          <div className="mb-3 flex justify-center items-center gap-3">
            {modelList.length > 0 && (
              <div className="flex justify-center items-center gap-3">
                <select
                  name="model_id"
                  className="w-2/3 p-2 rounded-md border border-gray-300"
                  onChange={handleChangeSelect}
                  value={selectedModel}
                >
                  <option value="">Select Model</option>
                  {modelList.map((model: any) => (
                    <option key={model.model_id} value={model.model_id}>
                      {model.model_name}
                    </option>
                  ))}
                </select>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600  dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  id="formFile"
                  onChange={handleFileChange}
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-sm"
                  onClick={handleFileUpload}
                >
                  Upload
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
};
