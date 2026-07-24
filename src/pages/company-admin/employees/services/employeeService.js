import axiosInstance from "../../../../api/axios";

export const createEmployee = async (employeeData) => {
  const response = await axiosInstance.post("/employees/create/", employeeData);
  return response.data;
};

export const verifyActivationToken = async (token) => {
  const response = await axiosInstance.post("/employees/verify/", { token });
  return response.data;
};

export const activateAccount = async (token, password, confirmPassword) => {
  const response = await axiosInstance.post("/employees/activate/", {
    token,
    password,
    confirm_password: confirmPassword,
  });
  return response.data;
};
