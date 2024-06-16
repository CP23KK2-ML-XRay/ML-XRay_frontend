const UserInfo = () => {

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="w-screen px-4">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex flex-col items-center">
              <img
                src="https://randomuser.me/api/portraits/men/94.jpg"
                className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
              ></img>
              <h1 className="text-xl text-gray-700 font-bold">Jack Dawson</h1>
              <p className="text-gray-700">Doctor</p>
              <p className="text-gray-400">dawson@mail.com</p>
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <a
                  href="#"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Patients Record
                </a>
                <a
                  href="#"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                >
                  Edit
                </a>
              </div>
            </div>

            <h2 className="text-xl text-gray-700 font-bold mt-6 mb-4">
              Information
            </h2>
            <div className="mb-6">
              <div className="flex justify-between flex-wrap gap-2 w-full">
                <span className="text-gray-700 font-bold">Web Developer</span>
              </div>
              <p className="mt-2 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                finibus est vitae tortor ullamcorper, ut vestibulum velit
                convallis. Aenean posuere risus non velit egestas suscipit.
              </p>
            </div>
            <div className="mb-6 ">
              <div className="flex justify-between flex-wrap gap-2 w-full">
                <span className="text-gray-700 font-bold">Web Developer</span>
              </div>
              <p className="mt-2 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                finibus est vitae tortor ullamcorper, ut vestibulum velit
                convallis. Aenean posuere risus non velit egestas suscipit.
              </p>
            </div>
            <div className="mb-6">
              <div className="flex justify-between flex-wrap gap-2 w-full">
                <span className="text-gray-700 font-bold">Web Developer</span>
              </div>
              <p className="mt-2 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                finibus est vitae tortor ullamcorper, ut vestibulum velit
                convallis. Aenean posuere risus non velit egestas suscipit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
