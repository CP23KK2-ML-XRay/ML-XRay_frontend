import { useEffect, useState } from "react";
import MachineService from "@/service/MachineService";
import Swal from "sweetalert2";

const ModelList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setFormData({
      model_name: "",
      model_category: "",
      class0: "",
      class1: "",
      class2: "",
      train: null,
      test: null,
      val: null,
    });
    setFormErrors({
      model_name: "",
      class0: "",
      class1: "",
      class2: "",
    });
    setIsModalOpen(false);
  };

  // const [isEditOpen, setIsEditOpen] = useState(false);

  // const openEdit = () => {
  //   setIsEditOpen(true);
  // };

  // const closeEdit = () => {
  //   setIsEditOpen(false);
  // };

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDelete = () => {
    setIsDeleteOpen(true);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };

  const [modelsData, setModelsData] = useState<any[]>([]);

  useEffect(() => {
    try {
      const machineService = new MachineService();
      machineService.retrieveListModel().then((data) => {
        // console.log(data);
        if (data) {
          setModelsData(data);
        }
      });
    } catch (error) {
      // console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }

    // fetchData()
  }, []);

  // | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
  // | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | Create
  // | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | Model
  // | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | Function
  // V V V V V V V V V V V V V V V V V V V V V V V V V V V V V V V V V V V V V

  const [formData, setFormData] = useState({
    model_name: "",
    model_category: "image",
    class0: "",
    class1: "",
    class2: "",
    train: null,
    test: null,
    val: null,
  });

  const [formErrors, setFormErrors] = useState({
    model_name: "",
    class0: "",
    class1: "",
    class2: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleChange = (
  //   event: React.ChangeEvent<HTMLFormElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const fileInputTrain = document.getElementById("train") as HTMLInputElement;
    const fileInputTest = document.getElementById("test") as HTMLInputElement;
    const fileInputVal = document.getElementById("val") as HTMLInputElement;

    if (
      !fileInputTrain ||
      !fileInputTest ||
      !fileInputVal ||
      !fileInputTrain.files ||
      !fileInputTest.files ||
      !fileInputVal.files ||
      !fileInputTrain.files[0] ||
      !fileInputTest.files[0] ||
      !fileInputVal.files[0]
    ) {
      Swal.fire({
        title: "Error!",
        text: "Please upload all files.",
        icon: "error",
      });
      return;
    }

    const formDataBody = new FormData();
    formDataBody.append("modeljson", String(JSON.stringify(formData)));
    formDataBody.append("train", fileInputTrain.files[0]);
    formDataBody.append("test", fileInputTest.files[0]);
    formDataBody.append("val", fileInputVal.files[0]);

    console.log("SUBMIT", formData);

    try {
      const machineService = new MachineService();
      console.log(formDataBody);
      const response = await machineService.createModel(formDataBody);
      console.log(response);

      Swal.fire({
        title: "Success!",
        text: "Your model has been created.",
        icon: "success",
      });

      setFormData({
        model_name: "",
        model_category: "",
        class0: "",
        class1: "",
        class2: "",
        train: null,
        test: null,
        val: null,
      });
      setTimeout(() => {
        // location.reload();
      }, 2000);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error creating your model. Please try again.",
        icon: "error",
      });
      console.error("Error submitting data:", error);
    }
  };

  // Validate Function only create model fontend --------------------------------------------------------------------------------------
  // | | | | | | | | | | | | | | | | --------------------------------------------------------------------------------------
  // V V V V V V V V V V V V V V V V
  const validateForm = (data: typeof formData) => {
    const errors: any = {};
    if (!data.model_name) errors.model_name = "Required model name";
    // if (!data.model_category) errors.model_category = "Required model category";
    if (!data.class0) errors.class0 = "Required class 0 name";
    if (!data.class1) errors.class1 = "Required class 1 name";
    if (!data.class2) errors.class2 = "Required class 2 name";
    return errors;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const validExtensions = ["zip", "rar", "7z"];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (fileExtension && validExtensions.includes(fileExtension)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: file,
        }));
      } else {
        Swal.fire({
          title: "Invalid file type",
          text: "Please upload a ZIP file.",
          icon: "error",
        });
      }
    }
  };

  return (
    <section className="w-full bg-gray-300  p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            {/* <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 "
                    placeholder="Search"
                  />
                </div>
              </form>
            </div> */}
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                type="button"
                className="flex items-center justify-center bg-blue-600 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
                onClick={openModal}
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add model
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 text-center">
                <tr>
                  <th scope="col" className="px-4 py-3 text-gray-500">
                    #ID
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-500">
                    Model Name
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-500">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-500">
                    Class 0
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-500">
                    Class 1
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-500">
                    Class 2
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-500">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-500"></th>
                </tr>
              </thead>
              <tbody>
                {modelsData.length > 0 ? (
                  modelsData.map((model, index) => (
                    <tr className="border-b" key={index}>
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-4 py-3">{model.model_name}</td>
                      <td className="px-4 py-3">{model.model_category}</td>
                      <td className="px-4 py-3">{model.class0}</td>
                      <td className="px-4 py-3">{model.class1}</td>
                      <td className="px-4 py-3">{model.class2}</td>
                      <td className="px-4 py-3">{model.status}</td>
                      <td className="pr-4 py-3 flex items-center justify-center">
                        {/* <button
                          id="apple-imac-27-dropdown-button"
                          data-dropdown-toggle="apple-imac-27-dropdown"
                          className="inline-flex items-center mx-2 p-0.5 text-sm font-medium text-center bg-blue-600 text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none"
                          type="button"
                          onClick={openEdit}
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
                        </button> */}

                        <button
                          id="apple-imac-27-dropdown-button"
                          data-dropdown-toggle="apple-imac-27-dropdown"
                          className="inline-flex items-center mx-2 p-0.5 text-sm font-medium text-center bg-red-600 text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none"
                          type="button"
                          onClick={openDelete}
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
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b mt-2">
                    <td
                      colSpan={7}
                      className="w-full px-6 py-2 text-2xl text-center"
                    >
                      No models available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/*Modal for EDIT MODEL _-----------------------------------------------------------------------------------
      {isEditOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-400 opacity-25"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

              <div className="bg-primary-500 px-4 py-3 sm:px-6">
                <h3 className="text-2xl font-medium leading-6 text-black">
                  Edit Model Name
                </h3>
              </div>

              <form className="space-y-4 md:space-y-6">
                <div className="px-4 py-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-6 w-full">
                    <label
                      htmlFor="modelName"
                      className="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Model Name
                    </label>
                    <input
                      type="text"
                      id="modelName"
                      name="modelName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-400 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeEdit}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )} 
*/}
      {/*Modal for Create new model ------------------------------------------------------------------------------------------------ */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white shadow-md rounded-md p-8 w-full m-32">
            <div className="flex flex-col items-center">
              <h1 className="font-bold text-3xl text-blue-600 lg:text-4xl">
                Create Model
              </h1>

              <h6 className="mb-2 text-xl font-bold text-center text-gray-800 md:text-2xl">
                <span className="text-gray-500">Enter your model details</span>
              </h6>

              <form className="w-full max-w-lg py-8" onSubmit={handleSubmit}>
                <div className="flex items-center border-b border-gray-400 py-2">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    value={formData.model_name}
                    onChange={handleInputChange}
                    type="text"
                    name="model_name"
                    placeholder="Enter your model name"
                  />

                  {/* <select
                    className="bg-transparent border-l-2 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    value={formData.model_category}
                    onChange={handleChange}
                    name="model_category"
                  >
                    <option value="" disabled>
                      Select model category
                    </option>
                    <option value="numberic">Numeric</option>
                    <option value="image">Image</option>
                  </select> */}
                </div>
                {/* <span className="text-red-500 text-sm mb-2 flex w-full">
                  {formErrors.model_name && (
                    <p className="absolute"> {formErrors.model_name} </p>
                  )}
                  {formErrors.model_category && (
                    <p className="absolute left-1/2">
                      {formErrors.model_category}
                    </p>
                  )}
                </span> */}

                <h6 className="pt-4 font-medium">Class 0:</h6>
                {formErrors.class0 && (
                  <div className="text-red-500 text-sm flex absolute left-1/2 pt-8">
                    {formErrors.class0}
                  </div>
                )}
                <input
                  className="appearance-none bg-transparent border-b border-gray-400 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  value={formData.class0}
                  onChange={handleInputChange}
                  name="class0"
                  placeholder="Enter your class 0 name"
                />

                <h6 className="pt-4 font-medium">Class 1:</h6>
                {formErrors.class1 && (
                  <div className="text-red-500 text-sm flex absolute left-1/2 pt-8">
                    {formErrors.class1}
                  </div>
                )}
                <input
                  className="appearance-none bg-transparent border-b border-gray-400 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  value={formData.class1}
                  onChange={handleInputChange}
                  name="class1"
                  placeholder="Enter your class 1 name"
                />

                <h6 className="pt-4 font-medium">Class 2:</h6>
                {formErrors.class2 && (
                  <div className="text-red-500 text-sm flex absolute left-1/2 pt-8">
                    {formErrors.class2}
                  </div>
                )}
                <input
                  className="appearance-none bg-transparent border-b border-gray-400 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  value={formData.class2}
                  onChange={handleInputChange}
                  name="class2"
                  placeholder="Enter your class 2 name"
                />

                <h6 className="pt-4 font-medium">
                  Upload Train Compress Folder:
                </h6>
                <input
                  className="block mt-2 w-full text-sm border-gray-300 rounded-sm cursor-pointer"
                  id="train"
                  type="file"
                  name="train"
                  onChange={handleFileChange}
                  accept=".zip,.rar,.7zip"
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  Upload compress file only.
                </p>

                <h6 className="pt-4 font-medium">
                  Upload Test Compress Folder:
                </h6>
                <input
                  className="block mt-2 w-full text-sm border-gray-300 rounded-sm cursor-pointer"
                  id="test"
                  type="file"
                  name="test"
                  onChange={handleFileChange}
                  accept=".zip,.rar,.7zip"
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  Upload compress file only.
                </p>

                <h6 className="pt-4 font-medium">
                  Upload Validation Compress Folder:
                </h6>
                <input
                  className="block mt-2 w-full text-sm border-gray-300 rounded-sm cursor-pointer"
                  id="val"
                  type="file"
                  name="val"
                  onChange={handleFileChange}
                  accept=".zip,.rar,.7zip"
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  Upload compress file only.
                </p>

                <div className="py-4 flex">
                  <button
                    className="bg-blue-600 text-white py-2 px-6 rounded-md mr-4 hover:bg-blue-500 hover:border-gray-400"
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 rounded-md text-black-100 bg-white-400 border-black-100 border-2 border-black-200 hover:bg-gray-300 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/*Modal for delete-----------------------------------------------------------------------------------------------------------------------*/}
      {isDeleteOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-400 opacity-25"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {/* Header */}
              <div className="bg-primary-500 px-4 py-3 sm:px-6">
                <h3 className="text-2xl font-medium leading-6 text-black">
                  Confirm Deletion
                </h3>
              </div>

              {/* Modal body */}
              <div className="px-4 py-4 sm:p-6">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Are you sure you want to delete this model?
                </p>
              </div>

              {/* Modal footer */}
              <div className="bg-white dark:bg-gray-400 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeDelete}
                >
                  No
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ModelList;
