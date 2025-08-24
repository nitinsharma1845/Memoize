import { api } from "./api";

const getCurrentUser = async () => {
  return await api.get("/user/me");
};

const loginUser = async (data) => {
  return await api.post("/user/login", data);
};

const registerUser = async (data) => {
  return await api.post("user/signup", data);
};

const logoutUser = async () => {
  return await api.delete("user/logout");
};

const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  return await api.put("/user/upload-avatar" , formData);
};

export { getCurrentUser, loginUser, registerUser, logoutUser, uploadAvatar };
