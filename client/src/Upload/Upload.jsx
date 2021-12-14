import axios from "axios";
import React from "react";
import "./Upload.css";
const Upload = () => {
  const [progress, setProgress] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);
  const [uploaded, setUploaded] = React.useState(false);
  const uploadProgressHandler = (progressEvent) => {
    setProgress((progressEvent.loaded / progressEvent.total) * 100);
  };
  const uploadClickHandler = (e) => {
    e.preventDefault();
    setUploaded(false);
    setUploading(true);
    const form = document.querySelector("form");
    console.log(form);
    const formData = new FormData(form);
    axios({
      method: "POST",
      url: `http://${process.env.REACT_APP_ipv4}:${process.env.REACT_APP_PORT}/api/file-upload`,
      data: formData,
      onUploadProgress: uploadProgressHandler,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      if (res.data) {
        setUploaded(true);
      }
    });
  };
  return (
    <div>
      <form
        className="upload-form"
        class="form d-flex align-items-center flex-wrap flex-column"
      >
        <div class="p-2 input-file mx-auto">
          <input
            multiple
            required
            type="file"
            class="form-control form-control-file"
            name="uploaded_file"
            id="formFileMultiple"
          />
        </div>
        <div class="mx-auto">
          <button
            type="submit"
            class="btn btn-primary"
            onClick={uploadClickHandler}
          >
            Upload
          </button>
        </div>
      </form>
      {uploading && (
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      <div style={{ textAlign: "center" }}>
        {uploading && !uploaded && (
          <h3 className="uploadeding">Uploading.....</h3>
        )}
        {uploaded && (
          <h3 className="uploaded-successfuly">
            Files Uploaded Successfuly....
          </h3>
        )}
      </div>
    </div>
  );
};

export default Upload;
