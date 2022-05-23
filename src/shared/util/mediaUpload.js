const ImageUpload = (e, callback) => {
  // console.log(e?.target?.files[0].type.substr(0, 5));
  var Type = e?.target?.files[0]?.type.substr(0, 5);
  if (e?.target?.files[0] === undefined) {
    callback(false);
  } else if (Type === "image") {
    callback(e.target.files[0]);
  } else if (Type === "video") {
    callback(e.target.files[0]);
  } else {
    callback(false);
  }
};
export { ImageUpload };
