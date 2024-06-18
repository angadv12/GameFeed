import { useContext } from "react";
import { AuthContext } from "../features/auth/AuthContext";
import { FaUser } from "react-icons/fa";
import placeholder from "../assets/pfpPlaceholder.png"

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-white font-bold text-3xl flex flex-row items-center justify-center mb-6">
          <FaUser className="mr-3" /> Profile
        </h1>
        {user ? (
          <section>
            <div className="flex flex-col items-center">
              <img
                className="w-32 h-32 rounded-full mb-4"
                src={user.profilePicture || placeholder }
                alt="Profile"
              />
              <div className="text-white text-center font-semibold text-xl mb-3">
                Name: {user.name}
              </div>
              <div className="text-white text-center font-semibold text-xl mb-3">
                Email: {user.email}
              </div>
            </div>
          </section>
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
