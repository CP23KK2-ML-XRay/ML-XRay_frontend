import HospitalService from '@/service/HospitalService'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export const ListPatient = () => {
  const [usersData, setUsersData] = useState<any[]>([])
  const [filteredUsers, setFilteredUsers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Fetch data when the component mounts
    try {
      const hospitalService = new HospitalService()
      hospitalService.retrieveListPatients().then((data) => {
        setUsersData(data)
        setFilteredUsers(data) // Initialize filteredUsers with the full list
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }, [])

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    dateOfBirth: '',
    phone_number: '',
    gender: 'M', // Default value
    weight: '',
    height: '',
    blood_type: 'A+',
    medic_person: 1,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    if (query === '') {
      setFilteredUsers(usersData)
    } else {
      const filtered = usersData.filter((user) =>
        `${user.firstname} ${user.lastname}`.toLowerCase().includes(query)
      )
      setFilteredUsers(filtered)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const hospitalService = new HospitalService()
      const response = await hospitalService.createPatient(formData)
      if (response) {
        Swal.fire({
          title: 'Added!',
          text: 'You can see your patient in patients record.',
          icon: 'success',
        })

        setIsHidden(true)
        setFormData({
          firstname: '',
          lastname: '',
          dateOfBirth: '',
          phone_number: '',
          gender: 'Male', // Default value
          weight: '',
          height: '',
          blood_type: 'A+',
          medic_person: 1, // Default value
        })
        setTimeout(() => {
          location.reload()
        }, 2000)
      }
    } catch (error) {
      Swal.fire({
        title: 'error!',
        text: "Can't add patient. Please try again.",
        icon: 'error',
      })
    }
  }

  const [isHidden, setIsHidden] = useState(true)

  const handleDelete = async (id: any) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const hospitalService = new HospitalService()
          const response = await hospitalService.deletePatient(id)
          if (response) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            })
            window.location.reload()
          }
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className="w-full pt-4">
      <div className="flex w-full justify-center">
        <div className="w-full overflow-x-auto shadow-2xl rounded-lg">
          <table className="w-full text-sm text-center text-gray-500">
            <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white ">
              Patients Record
            </caption>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              onChange={handleSearch}
              value={searchQuery}
            />
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
                      {user.firstname + '  ' + user.lastname}
                    </td>
                    <td className="px-6 py-4">{user.gender}</td>
                    <td className="px-6 py-4">{user.dateOfBirth}</td>
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
                      setIsHidden(false)
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
                    setIsHidden(false)
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
                      setIsHidden(true)
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
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  {/* Form fields */}
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      First Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="John"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Last Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-last-name"
                      type="text"
                      placeholder="Doe"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-dateOfBirth"
                    >
                      Date of Birth
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-dateOfBirth"
                      type="date"
                      placeholder="yyyy-mm-dd"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-phone_number"
                    >
                      Phone Number
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-phone_number"
                      type="text"
                      placeholder="Enter Phone Number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-gender"
                    >
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M7 10l5 5 5-5H7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-weight"
                    >
                      Weight
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-weight"
                      type="number"
                      placeholder="Enter Weight in Kg"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-height"
                    >
                      Height
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-height"
                      type="number"
                      placeholder="Enter Height in cm"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-blood_type"
                    >
                      Blood Type
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-blood_type"
                        name="blood_type"
                        value={formData.blood_type}
                        onChange={handleChange}
                        required
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M7 10l5 5 5-5H7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-medic_person"
                    >
                      Medic Person
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-medic_person"
                      type="number"
                      placeholder="Enter Medic Person ID"
                      name="medic_person"
                      value={formData.medic_person}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Add Patient
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
