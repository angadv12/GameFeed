
const FollowingModal = ({ following, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-bgNavbar rounded-xl p-6 w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-white text-2xl font-bold mb-4">Following</h2>
        {following.length > 0 ? (
          <ul>
            {following.map((person) => (
              <li key={person._id} className="text-white mb-2 p-2 bg-zinc-800 rounded">
                {person.name} (@{person.username})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">Not following anyone.</p>
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

export default FollowingModal;