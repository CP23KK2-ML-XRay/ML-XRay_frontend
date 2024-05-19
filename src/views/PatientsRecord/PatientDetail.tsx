

const PatientDetail = () => {
  const handlePredictXray = () => {
    // Logic to handle X-ray prediction
    console.log('Predict X-ray clicked')
  }

  const handleAddNote = () => {
    // Logic to handle adding a note
    console.log('Add note clicked')
  }

  return (
    <div
      id="readProductModal"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden"
    >
      <div className="relative w-full max-w-xl p-4 h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between mb-4 rounded-t sm:mb-5">
            <div className="text-lg text-gray-900 md:text-xl dark:text-white text-center w-full pt-4">
              <h2 className="font-semibold">Dominic Toretto</h2>
              <p className="text-lg">Male</p>
            </div>
            <div>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="readProductModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          </div>
          <hr />
          <div className="container mx-auto px-4 py-0.5">
            <h2 className="text-xl text-gray-700 dark:text-white font-bold mt-6 mb-4">
              Information
            </h2>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2">
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 flex">
                  Weight: <p className="ml-1">98</p>
                </dd>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 flex">
                  Height: <p className="ml-1">195</p>
                </dd>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 flex">
                  Date of Birth: <p className="ml-1">1995-09-18</p>
                </dd>
              </div>
              <div className="w-full md:w-1/2">
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 flex">
                  Blood Type: <p className="ml-1">B</p>
                </dd>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 flex">
                  Blood Pressure: <p className="ml-1">129/72</p>
                </dd>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 flex">
                  Phone Number: <p className="ml-1">0877778977</p>
                </dd>
              </div>
            </div>
            <hr />
          </div>
          <div className="container mx-auto p-4">
            <h2 className="text-xl text-gray-700 dark:text-white font-bold mb-4">
              Prediction History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Prediction
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-3">2023-05-01</td>
                    <td className="px-4 py-3">Normal</td>
                    <td className="px-4 py-3">No issues detected</td>
                  </tr>
                  {/* Additional prediction rows */}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                type="button"
                className="text-white inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handlePredictXray}
              >
                <svg
                  aria-hidden="true"
                  className="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Predict X-ray
              </button>
              <button
                type="button"
                className="text-white inline-flex items-center bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={handleAddNote}
              >
                <svg
                  aria-hidden="true"
                  className="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add Note
              </button>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                type="button"
                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  aria-hidden="true"
                  className="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  ></path>
                </svg>
                Edit
              </button>
            </div>
            <button
              type="button"
              className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 mr-1.5 -ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                ></path>
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDetail
