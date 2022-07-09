import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUser = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`, {
    id: inputId,
  });
};

const createNewUserService = (newUserData) => {
  console.log("Check data from userService: ", newUserData);
  return axios.post("/api/create-new-user", newUserData);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};

export { handleLoginApi, getAllUser, createNewUserService, deleteUserService };
