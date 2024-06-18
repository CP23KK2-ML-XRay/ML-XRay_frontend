import { Link } from "react-router-dom";
import { useState, FormEvent  } from "react";
import Swal from "sweetalert2";
import MachineService from "@/service/ManchineService";

export const CreateModel = () => {
    const [formData, setFormData] = useState({
        model_name: "",
        model_category: "",
        class0: "",
        class1: "",
        class2: "",
        admin_id: "",
        model_path: "",
        train: null,
        test: null,
        val: null
    });

    const [formErrors, setFormErrors] = useState({
        model_name: "",
        model_category: "",
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

    const handleChange = (event: React.ChangeEvent<HTMLFormElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const errors = validateForm(formData)
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return;
        }

        console.log("SUBMIT", formData);

        try {
            const machineService = new MachineService();
            const response = await machineService.createModel(formData)
            console.log(response)

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
                admin_id: "",
                model_path: "/folder/a",
                train: null,
                test: null,
                val: null
            });
            setTimeout(() => {
                location.reload();
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

    // Validate Function only fontend --------------------------------------------------------------------------------------
    // | | | | | | | | | | | | | | | | --------------------------------------------------------------------------------------
    // V V V V V V V V V V V V V V V V 
    const validateForm = (data: typeof formData) => {
        const errors: any = {};
        if (!data.model_name) errors.model_name = "Required model name";
        if (!data.model_category) errors.model_category = "Required model category";
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
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
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
        <>
            <div className="items-center justify-center h-screen content-center">
                <div className="bg-white">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-3xl text-blue-600 lg:text-6xl">
                            Create Model
                        </h1>

                        <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                            <span className="text-gray-500">Enter your model name</span>
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

                                <select
                                    className="bg-transparent border-l-2 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    value={formData.model_category}
                                    onChange={handleChange}
                                    name="model_category"
                                >
                                    <option value="" disabled>
                                        Select model category
                                    </option>
                                    <option value="numberic">Numeric</option>
                                    <option value="images">Images</option>
                                </select>
                            </div>
                            <span className="text-red-500 text-sm mb-2 flex w-full">
                                {formErrors.model_name && (
                                    <p className="absolute"> {formErrors.model_name}    </p>
                                )}
                                {formErrors.model_category && (

                                    <p className="absolute left-1/2">{formErrors.model_category}</p>

                                )}
                            </span>

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

                            <h6 className="pt-4 font-medium">UPLOAD TRAIN COMPRESS FOLDER:</h6>                            
                            <input className="block mt-2 w-full text-sm  border-gray-300 rounded-sm cursor-pointer"
                                id="train"
                                type="file"
                                name="train"
                                onChange={handleFileChange}
                                accept=".zip,.rar,.7zip"
                            />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Upload compress file only.</p>
                            <h6 className="pt-4 font-medium">UPLOAD TEST COMPRESS FOLDER:</h6>
                            <input className="block mt-2 w-full text-sm  border-gray-300 rounded-sm cursor-pointer"
                                id="test"
                                type="file"
                                name="test"
                                onChange={handleFileChange}
                                accept=".zip,.rar,.7zip"
                            />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Upload compress file only.</p>

                            <h6 className="pt-4 font-medium">UPLOAD VALIDATION COMPRESS FOLDER:</h6>
                            <input className="block mt-2 w-full text-sm  border-gray-300 rounded-sm cursor-pointer"
                                id="val"
                                type="file"
                                name="val"
                                onChange={handleFileChange}
                                accept=".zip,.rar,.7zip"
                            />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Upload compress file only.</p>

                            <div className="py-4 flex">
                                <button
                                    className="bg-blue-600 text-white py-2 px-6 rounded-md mr-4 hover:bg-blue-500 hover:border-gray-400"
                                    type="submit"
                                >
                                    Submit
                                </button>
                                <Link
                                    to="/"
                                    className="px-6 py-2 rounded-md text-black-100 bg-white-400 border-black-100 border-2 border-black-200 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-700"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};