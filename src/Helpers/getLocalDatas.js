export const useGetName = () => {
  return window.localStorage.getItem("name");
};

export const useGetDesignation = () => {
  return window.localStorage.getItem("designation");
};
export const useGetID = () => {
  return window.localStorage.getItem("ID");
};
export const useGetBatch = () => {
  return window.localStorage.getItem("batch");
};
export const useGetUserName = () => {
  return window.localStorage.getItem("username");
};
export const useGetEmail = () => {
  return window.localStorage.getItem("email");
};
export const useGetDepartment = () => {
  return window.localStorage.getItem("department");
};
export const useGetDP = () => {
  return window.localStorage.getItem("dp");
};

export const token = "access_token";
