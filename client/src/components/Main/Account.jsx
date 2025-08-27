import React, { useEffect, useRef, useState } from "react";
import { UserRound, Pencil } from "lucide-react";
import { getCurrentUser, uploadAvatar } from "../../utils/authServices";
import { Loading, Button } from "../index";
import toast from "react-hot-toast";
import { changeAvatar } from "../../store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Account = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const avatar = useSelector((state) => state.auth.avatar);
  const dispatch = useDispatch();

  console.log("Redux avatar url:::" , avatar)

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();
      const fetchedUser = res.data.data;
      setUser(fetchedUser);
      dispatch(changeAvatar(fetchedUser.avatar)); // keep redux avatar in sync
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleIconClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
    setFile(selectedFile);
  };

  const handleConfirm = async () => {
    if (!file) return;
    const toastId = toast.loading("Uploading avatar...");
    try {
      await uploadAvatar(file);
      const res = await getCurrentUser();
      const updatedUser = res.data.data;

      setUser(updatedUser);
      console.log("Updated avatar URL ::" , updatedUser.avatar)
      dispatch(changeAvatar(`${updatedUser.avatar}?t=${Date.now()}`)); // update redux avatar

      toast.success("Avatar updated!", { id: toastId });
      setPreview(null);
      setFile(null);
    } catch (err) {
      console.error("Avatar upload error", err);
      toast.error("Failed to upload avatar", { id: toastId });
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setFile(null);
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="md:w-2xl rounded-xl bg-amber-100 flex flex-col items-center shadow-2xl p-8 mx-auto">
        <div className="shadow-xs relative rounded-full w-40 h-40 flex justify-center items-center z-10">
          {avatar ? (
            <img
              src={`${avatar}?t=${Date.now()}`} 
              alt="avatar"
              className="w-full h-full z-0 rounded-full object-cover shadow-2xl"
            />
          ) : (
            <UserRound />
          )}
          <div
            className="absolute bottom-2 right-2 z-10 bg-amber-300 rounded-full p-2 cursor-pointer hover:shadow-2xl"
            onClick={handleIconClick}
          >
            <Pencil size={"20px"} />
          </div>
        </div>

        <div className="flex items-center justify-center w-full mt-7">
          <input
            type="text"
            value={user.username}
            className="w-full text-xl"
            disabled
          />
          <div className="z-10 bg-amber-300 rounded-full p-1 cursor-pointer hover:shadow-2xl">
            <Pencil size={"20px"} />
          </div>
        </div>

        <div className="flex items-center justify-center w-full mt-3">
          <input type="text" value={user.email} className="w-full" disabled />
          <div className="z-10 bg-amber-300 rounded-full p-1 cursor-pointer hover:shadow-2xl">
            <Pencil size={"20px"} />
          </div>
        </div>

        {/* File Input */}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
        />

        {/* Preview Popup */}
        {preview && (
          <div className="bg-amber-100 shadow-xl rounded-2xl w-[40%] absolute top-[50%] left-[50%] translate-x-[-50%] ml-32 translate-y-[-50%] flex justify-end items-center gap-10 flex-col p-8 z-10">
            <div className="w-40 bg-cover h-40 shadow-2xs flex justify-center items-center">
              <img
                src={preview}
                alt="Avatar Preview"
                className="w-full rounded-full object-cover h-full"
              />
            </div>
            <div className="flex gap-10">
              <Button
                className="bg-green-500 border-none text-gray-100"
                onClick={handleConfirm}
              >
                Upload
              </Button>
              <Button
                className="bg-red-500 border-none text-gray-100"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
