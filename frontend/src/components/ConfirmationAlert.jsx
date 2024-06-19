import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmationAlert = ({ onConfirm, onCancel }) => (
  <div className="text-white p-4">
    <h2 className="text-lg font-bold">Confirm Logout</h2>
    <p className="my-5">Are you sure you want to logout?</p>
    <div className="flex justify-between">
      <button
        onClick={onConfirm}
        className="bg-blue-500 text-white px-4 py-2 rounded-md ml-3"
      >
        Yes, Logout
      </button>
      <button
        onClick={onCancel}
        className="bg-zinc-600 text-white px-4 py-2 mr-4 rounded-md"
      >
        Cancel
      </button>
    </div>
  </div>
);

const showConfirmationAlert = (onConfirm) => {
  const handleConfirm = () => {
    onConfirm();
    toast.dismiss();
  };

  const handleCancel = () => {
    toast.dismiss();
  };

  toast(
    <ConfirmationAlert onConfirm={handleConfirm} onCancel={handleCancel} />,
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      className: "relative",
      closeButton: false,
      toastClassName: "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer",
      bodyClassName: "text-sm font-white font-med block p-3",
      style: {
        background: "rgba(60, 60, 60)",
        boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)"
      }
    }
  );
};

export default showConfirmationAlert;
