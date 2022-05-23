import axios from "axios";

const EditUser = (obj) => {
  console.log(obj);
  return axios.put("users/edit", obj, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { EditUser };
