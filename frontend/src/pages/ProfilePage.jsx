import { useContext, useState, useEffect} from "react";
import { AuthContext } from "../features/auth/AuthContext"
import { FaUser, FaPencil } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import FollowersModal from "../components/FollowersModal";
import FollowingModal from "../components/FollowingModal";

const ProfilePage = () => {
  const { user: loggedInUser, follow, unfollow } = useContext(AuthContext)
  const { username } = useParams()
  const [profileUser, setProfileUser] = useState(null)
  const [showFollowersModal, setShowFollowersModal] = useState(false)
  const [showFollowingModal, setShowFollowingModal] = useState(false)
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  const fetchProfileData = async (username) => {
    try {
      const response = await fetch(`/api/user/username/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json()
        setProfileUser(data)
      } else {
        console.error("Error fetching user data:", response.statusText)
        setProfileUser(null)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      setProfileUser(null)
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (username) {
        if(loggedInUser && loggedInUser.username === username) {
          setProfileUser(loggedInUser)
        } else {
          await fetchProfileData(username)
        }
      } else {
        if (loggedInUser) {
          setProfileUser(loggedInUser)
        } else {
          setProfileUser(null)
        }
      }
    };

    fetchUser();
  }, [username, loggedInUser])

  const handleFollow = async () => {
    try {
      await follow(profileUser._id)
      await fetchProfileData(profileUser.username)
    } catch (error) {
      console.error('Error following user:', error)
    }
  }

  const handleUnfollow = async () => {
    try {
      await unfollow(profileUser._id)
      await fetchProfileData(profileUser.username)
    } catch (error) {
      console.error('Error unfollowing user:', error)
    }
  }

  const handleShowFollowers = async () => {
    try {
      const response = await fetch(`/api/user/${profileUser._id}/followers`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const followersData = await response.json();
        setFollowers(followersData);
        setShowFollowersModal(true);
      } else {
        console.error("Error fetching followers:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  }

  const handleShowFollowing = async () => {
    try {
      const response = await fetch(`/api/user/${profileUser._id}/following`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const followingData = await response.json();
        setFollowing(followingData);
        setShowFollowingModal(true);
      } else {
        console.error("Error fetching following:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching following:", error);
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="bg-bgNavbar absolute top-4 rounded-xl shadow-lg px-8 py-6 my-6 w-full max-w-2xl">
        <h1 className="text-white font-bold text-4xl flex items-center relative ml-6 mt-6 mb-8">
          <p className="flex items-center absolute left-1/2 -translate-x-1/2">
            <FaUser className="mr-4" /> Profile
          </p>
          {loggedInUser && profileUser && loggedInUser.username === profileUser.username && (
            <Link to="/edit-profile" className="flex items-center text-xl mr-6 bg-zinc-700 px-4 py-1 rounded-lg absolute -right-8">
              <FaPencil className="mr-4" /> Edit
            </Link>
          )}
        </h1>
        {profileUser ? (
          <div className="flex flex-col">
            {/* User info section */}
            <div className="bg-zinc-800 rounded-xl py-4 px-4">
              <img
                className="w-52 h-52 mr-8 rounded-full float-left object-cover mb-4"
                src={profileUser.profilePicture}
                alt="Profile"
              />
              <h1 className="text-white font-extrabold text-3xl mt-12 mb-2">User Info:</h1>
              <div className="text-white font-bold text-xl">
                <p className="mb-2"> Name: <span className="ml-2">{profileUser.name}</span> </p>
                <p className="mb-2"> @{profileUser.username} </p>
              </div>
            </div>
            {/* Followers and Following section */}
            <div className="bg-zinc-800 rounded-xl py-4 px-4 mt-4 flex items-center justify-evenly">
              <div className="flex flex-col items-center">
                <p className="text-white font-bold text-3xl mb-2">Followers: <span className="ml-2">{profileUser.followers.length}</span></p>
                {loggedInUser ? (
                  loggedInUser.username !== profileUser.username ? (
                    loggedInUser.following.includes(profileUser._id) ? (
                      <div>
                        <button className="text-white font-semibold text-xl bg-blue-500 px-4 py-2 rounded-lg mr-2" onClick={handleUnfollow}>
                          Unfollow
                        </button>
                        <button className="text-white font-semibold text-xl bg-blue-500 px-4 py-2 rounded-lg" onClick={handleShowFollowers}>
                          See Followers
                        </button>
                      </div>
                    ) : (
                      <button className="text-white font-semibold text-xl bg-blue-500 px-4 py-2 rounded-lg" onClick={handleFollow}>
                        Follow
                      </button>
                    )
                  ) : (
                    <button className="text-white font-semibold text-xl bg-blue-500 px-4 py-2 rounded-lg" onClick={handleShowFollowers}>
                      See Followers
                    </button>
                  )
                ) : (
                  <button className="text-white font-semibold text-xl bg-blue-500 px-4 py-2 rounded-lg" disabled>
                    Login to interact
                  </button>
                )}
              </div>
              <div className="flex flex-col items-center">
                <p className="text-white font-bold text-3xl mb-2">Following: <span className="ml-2">{profileUser.following.length}</span></p>
                <button className="text-white font-semibold text-xl bg-blue-500 px-4 py-2 rounded-lg" onClick={handleShowFollowing}>
                  See Following
                </button>
              </div>
            </div>
          </div>
        ) : loggedInUser ? (
          <div className="text-white text-center font-bold text-3xl mt-10">
            User not found
          </div>
        ) : (
          <div className="text-white text-center font-bold text-3xl mt-10">
            Please login to view profile
          </div>
        )}
      </div>
      {showFollowersModal && (
        <FollowersModal 
          followers={followers}
          onClose={() => setShowFollowersModal(false)}
        />
      )}
      {showFollowingModal && (
        <FollowingModal 
          following={following}
          onClose={() => setShowFollowingModal(false)}
        />
      )}
    </div>
  )
}

export default ProfilePage;
