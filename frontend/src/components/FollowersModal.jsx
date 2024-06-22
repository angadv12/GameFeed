
const FollowersModal = ({ followers, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-bgNavbar rounded-xl p-6 w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-white text-2xl font-bold mb-4">Followers</h2>
        {followers.length > 0 ? (
          <ul>
            {followers.map((follower) => (
              <li key={follower._id} className="text-white mb-2 p-2 bg-zinc-800 rounded">
                {follower.name} (@{follower.username})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No followers yet.</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FollowersModal;