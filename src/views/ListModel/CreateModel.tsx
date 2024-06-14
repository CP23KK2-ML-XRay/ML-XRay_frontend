import { Form, Link } from "react-router-dom";

export const CreateModel = () => {
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


                        <form className="w-full max-w-lg py-8">
                            <div className="flex items-center border-b border-gray-400 py-2">
                                <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Enter your model name" aria-label="modelname" />
                            
                            <select>
                                <option value="" selected disabled >Select model category</option>
                                <option value="numberic">Numeric</option>
                                <option value="images">Images</option>
                            </select>
                            </div>
                            <h6 className="pt-4 font-medium">Class 0:</h6>
                            <input className="appearance-none bg-transparent border-b border-gray-400 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Enter your class 0 name" id="class0"/>
                            <h6 className="pt-4 font-medium">Class 1:</h6>
                            <input className="appearance-none bg-transparent border-b border-gray-400 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Enter your class 1 name" id="class1"/>
                            <h6 className="pt-4 font-medium">Class 2:</h6>
                            <input className="appearance-none bg-transparent border-b border-gray-400 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Enter your class 2 name" id="class2"/>
                        </form>
                        <div className="">
                        <button className="bg-blue-600 text-white py-2 px-6 rounded-md mr-4 hover:bg-blue-500 hover:border-gray-400" type="button">
                            Submit
                        </button>   
                        <Link
                            to="/"
                            className="px-6 py-2 rounded-md text-black-100 bg-white-400 border-black-100 border-2 border-black-200 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-700"
                        >
                            Cancel
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
