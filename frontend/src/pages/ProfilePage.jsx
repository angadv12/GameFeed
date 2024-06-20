import { useContext, useState } from "react";
import { AuthContext } from "../features/auth/AuthContext";
import { FaUser } from "react-icons/fa6";

const ProfilePage = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updates = {
      name,
      email,
      password,
      profilePicture,
    }

    try {
      await updateProfile(updates)
      alert('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-bgNavbar rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-white font-bold text-3xl flex flex-row items-center justify-center mb-6">
          <FaUser className="mr-3" /> Profile
        </h1>
        {user ? (
          <form onSubmit={handleUpdate}>
            <div className="flex flex-col items-center">
              <img
                className="w-32 h-32 rounded-full object-cover mb-4"
                src={user.profilePicture}
                alt="Profile"
              />
              <label className="text-white text-center font-semibold text-xl mb-3">
                <p className="mb-2">Change Profile Picture:</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="block w-full text-sm cursor-pointer file:cursor-pointer text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-green-600 hover:file:bg-violet-100"
                />
              </label>
              <label className="text-white text-center font-semibold text-xl mb-3">
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="block w-full text-gray-900 p-2 rounded"
                />
              </label>
              <label className="text-white text-center font-semibold text-xl mb-3">
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="block w-full text-gray-900 p-2 rounded"
                />
              </label>
              <label className="text-white text-center font-semibold text-xl mb-3">
                Password:
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
                className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              >
                Update Profile
              </button>
            </div>
          </form>
        ) : (
          <div className="text-white text-center font-bold text-3xl mt-10">
            Please login to view your profile
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
