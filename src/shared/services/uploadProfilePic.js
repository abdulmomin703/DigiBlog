import axios from "axios";

const EditUser = (obj) => {
  console.log(obj);
  return axios.put("users/edit", obj, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const EditBlog = (obj) => {
  console.log("good1", obj.get("current_image"));
  console.log("good2", obj.get("image"));

  return axios.put("users/editBlog", obj, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const DeleteBlog = (obj) => {
  console.log("delete", obj);
  return axios.post("users/deleteBlog", obj);
};
export { EditUser, EditBlog, DeleteBlog };
