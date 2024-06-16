import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export const ListPatient = () => {
  const [usersData, setUsersData] = useState<any[]>([])
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
  const [errors, setErrors] = useState<any>({})

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://ml-xray.org/api/hos/patients/',
          {
            headers: {
              Authorization: ('Bearer ' +
                localStorage.getItem('accessToken')) as string,
              'Content-Type': 'application/json',
              email: localStorage.getItem('email') as string,
            },
          }
        )
        if (response.status === 200) {
          setUsersData(response.data)
        }
        console.log(usersData)
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          console.error('Patients not found:', error)
        } else {
          console.error('Error fetching data:', error)
        }
      }
    }

    fetchData()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.firstname) newErrors.firstname = 'First name is required'
    if (!formData.lastname) newErrors.lastname = 'Last name is required'
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = 'Date of birth is required'
    if (!formData.phone_number)
      newErrors.phone_number = 'Phone number is required'
    if (!formData.weight) newErrors.weight = 'Weight is required'
    if (!formData.height) newErrors.height = 'Height is required'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await axios.post('https://ml-xray.org/api/hos/patients/', formData, {
        headers: {
          'Content-Type': 'application/json',
          email: localStorage.getItem('email') as string,
        },
      })
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
        gender: 'M', // Default value
        weight: '',
        height: '',
        blood_type: 'A+',
        medic_person: 1, // Default value
      })
      setTimeout(() => {
        location.reload()
      }, 2000)
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
    console.log(id)
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
          await axios.delete(`http://localhost:8082/api/hos/patients/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              email: localStorage.getItem('email') as string,
            },
          })
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          })
          window.location.reload()
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
                      {user.firstname + ' ' + user.lastname}
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
                    onClick={() => setIsHidden(false)}
                  >
                    ไม่มีคนไข้
                  </td>
                </tr>
              )}
              <tr className="bg-white border-b mt-2 hover:cursor-pointer">
                <td
                  colSpan={6}
                  className="px-6 py-2 text-2xl"
                  onClick={() => setIsHidden(false)}
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
                    onClick={() => setIsHidden(true)}
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>

              <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex flex-wrap mx-3 mb-6">
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
                    {errors.firstname && (
                      <p className="text-red-500 text-xs italic">
                        {errors.firstname}
                      </p>
                    )}
                  </div>

                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase justify-center tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="lastname"
                    >
                      Last Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="lastname"
                      type="text"
                      placeholder="Bone"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                    {errors.lastname && (
                      <p className="text-red-500 text-xs italic">
                        {errors.lastname}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase justify-center tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="dateOfBirth"
                    >
                      Date of Birth
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="dateOfBirth"
                      type="date"
                      placeholder="dd/mm/yyyy"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-xs italic">
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase justify-center tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="phone_number"
                    >
                      Phone number
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="phone_number"
                      type="text"
                      placeholder="0801234567"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                    {errors.phone_number && (
                      <p className="text-red-500 text-xs italic">
                        {errors.phone_number}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-gender"
                    >
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
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

                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="blood_type"
                    >
                      Blood Type
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="blood_type"
                        name="blood_type"
                        value={formData.blood_type}
                        onChange={handleChange}
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
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
                </div>

                <div className="flex flex-wrap mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase justify-center tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="weight"
                    >
                      Weight
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="weight"
                      type="text"
                      placeholder="70"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                    />
                    {errors.weight && (
                      <p className="text-red-500 text-xs italic">
                        {errors.weight}
                      </p>
                    )}
                  </div>

                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase justify-center tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="height"
                    >
                      Height
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="height"
                      type="text"
                      placeholder="175"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                    />
                    {errors.height && (
                      <p className="text-red-500 text-xs italic">
                        {errors.height}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="medic_person"
                    >
                      Medic Person
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="medic_person"
                      type="number"
                      placeholder="1"
                      name="medic_person"
                      value={formData.medic_person}
                      onChange={handleChange}
                    />
                    {errors.medic_person && (
                      <p className="text-red-500 text-xs italic">
                        {errors.medic_person}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <button
                      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Add Patient
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
