import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../features/auth/AuthContext"
import { FaPencil, FaArrowLeft } from "react-icons/fa6";
import showConfirmationAlert from "../components/ConfirmationAlert"
import { Link, useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const { user, updateProfile, deleteAccount } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profilePicture, setProfilePicture] = useState(null)
  const [preview, setPreview] = useState('')

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0]
    setProfilePicture(file)
    setPreview(URL.createObjectURL(file))
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setUsername(user.username)
      setEmail(user.email)
      setPreview(user.profilePicture)
    }
  }, [user])

  const handleDeleteAccount = () => {
    showConfirmationAlert('deleteAccount', deleteAccount)
  }

  const navigate = useNavigate()

  const handleUpdate = async (e) => {
    e.preventDefault()

    const updates = {
      name,
      username,
      email,
      password,
      profilePicture,
    }

    try {
      await updateProfile(updates)
      navigate('/profile')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-bgNavbar rounded-xl shadow-lg p-8 my-6 w-full max-w-2xl">
        <h1 className="text-white font-bold text-4xl flex items-center relative mb-6">
          <Link to="/profile">
            <p className="text-xl flex items-center font-semibold"> <FaArrowLeft className="mr-2"/> Back </p>
          </Link>
          <p className="flex items-center absolute left-1/2 -translate-x-1/2"> <FaPencil className="mr-4" /> Edit Profile </p>
        </h1>
        {user ? (
          <>
          <form onSubmit={handleUpdate}>
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <img
                  className="w-52 h-52 mr-8 rounded-full object-cover mb-4"
                  src={preview || user.profilePicture}
                  alt="Profile"
                />
                <label className="text-white font-semibold max-w-64 text-lg mb-3 bg-zinc-800 rounded-xl px-4 py-4">
                  <p className="mb-2">Change Profile Picture:</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="w-full text-xs cursor-pointer file:cursor-pointer text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-green-600 hover:file:bg-green-50"
                  />
                </label>
              </div>
              <div className="flex items-center w-full">
                <label className="text-white font-semibold text-xl w-1/2 mr-4 mb-3">
                  <p>Name:</p>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="block text-gray-900 p-2 rounded w-full"
                  />
                </label>
                <label className="text-white font-semibold w-1/2 text-xl mb-3">
                  <p>Username:</p>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="block text-gray-900 p-2 rounded w-full"
                  />
                </label>
              </div>
              <label className="text-white font-semibold text-xl mb-3 w-full">
                <p>Email:</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="block w-full text-gray-900 p-2 rounded"
                />
              </label>
              <label className="text-white font-semibold text-xl mb-3 w-full">
                <p>New Password:</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="block w-full text-gray-900 p-2 rounded"
                />
              </label>
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-full"
              >
                Update Profile
              </button>
            </div>
          </form>
          <button
            onClick={handleDeleteAccount}
            className="m-auto block mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 w-full "
          >
            Delete Account
          </button>
          </>
        ) : (
          <div className="text-white text-center font-bold text-3xl mt-10">
            Please login to edit your profile
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;
