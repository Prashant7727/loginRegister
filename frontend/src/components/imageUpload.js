import React, { useEffect, useState } from "react";
import axios from "axios";

// function ImageUpload() {
//   const [image, setImage] = useState("");
//   const [allImage, setAllImage] = useState([]);

//   function covertToBase64(e) {
//     console.log(e);
//     var reader = new FileReader();
//     reader.readAsDataURL(e.target.files[0]);
//     reader.onload = () => {
//       console.log(reader.result);
//       setImage(reader.result);
//     };
//     reader.onerror = (error) => {
//       console.log("Error: ", error);
//     };
//   }
//   useEffect(() => {
//     getImage();
//   }, []);

//   function uploadImage() {
//     fetch("http://localhost:5000/upload-image", {
//       method: "POST",
//       crossDomain: true,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify({
//         base64: image,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => console.log(data));
//   }
//   function getImage() {
//     fetch("http://localhost:5000/get-image", {
//       method: "GET",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setAllImage(data.data);
//       });
//   }
//   return (
//     <div className="auth-wrapper">
//       <div className="auth-inner" style={{ width: "auto" }}>
//         Let's Upload a file
//         <br />
//         <input /*accept="image/*"*/ type="file" onChange={covertToBase64} />
//         {image == "" || image == null ? (
//           ""
//         ) : (
//           <img width={100} height={100} src={image} />
//         )}
//         <button onClick={uploadImage}>Upload</button>
//         <br />
//         {allImage.map((data) => {
//           return <img width={100} height={100} src={data.image} />;
//         })}
//       </div>
//     </div>
//   );
// }

const ImageUpload = () => {
  // const [file, setfile] = useState();

  const onFormSubmit = (e) => {
    e.preventDefault();

    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    uploadFiles(formData);
    function uploadFiles(formData) {
      axios
        .post("http://localhost:5000/upload-image", formData)
        .then((response) => alert("The file is successfully uploaded"))
        .catch((error) => console.error(error));
    }
    // const formData = new FormData();
    // formData.append("myfile", file[0]);

    // axios
    //   .post("http://localhost:5000/upload-image", formData)
    //   .then((response) => {
    //     alert("The file is successfully uploaded");
    //   })
    //   .catch((error) => {});
  };
  // const onChange = (e) => {

  // setfile(e.target.files);
  // };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        <form
        // onSubmit={(e) => onFormSubmit(e)}
        >
          <h1>File Upload</h1>
          <input
            type="file"
            multiple
            className="file-input"
            name="files"
            // onChange={(e) => onChange(e)}
            onChange={onFormSubmit}
          />
          {/* <button className="upload-button" type="submit">
            Upload
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default ImageUpload;
