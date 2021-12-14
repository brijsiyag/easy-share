import React, { useEffect, useState } from "react";
import Axios from "axios";
import path from "path";
import "./ShowFiles.css";
const ShowFiles = () => {
  const [filesData, setFilesData] = useState([]);
  const [dir, setDir] = useState("");
  useEffect(() => {
    console.log(dir);
    Axios.get(
      `http://${process.env.REACT_APP_ipv4}:${process.env.REACT_APP_PORT}/api/dirdata/${dir}`
    ).then((res) => {
      res.data.sort((a, b) => {
        return b.stats.atimeMs - a.stats.atimeMs;
      });
      setFilesData(res.data);
    });
  }, [dir]);
  const getDirData = (gdir) => {
    setDir(gdir);
  };
  const BackBtnClickHandler = () => {
    // setDir(path.dirname(dir));
    setDir("");
  };
  return (
    <div className="showfiles-main-container">
      <div className="list-group custom-list-group">
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <button
            className="btn btn-secondary back-btn"
            onClick={BackBtnClickHandler}
          >
            <i class="fas fa-chevron-circle-left"></i>
          </button>
          <h2>
            <span
              className="dir-link"
              onClick={() => {
                setDir("");
              }}
            >
              .../uploads
            </span>
            {dir !== "" && <span className="dir-link">/{dir}</span>}
          </h2>
        </div>
        {filesData.length === 0 && (
          <div
            onClick={BackBtnClickHandler}
            className="ist-group-item custom-list-group-item"
          >
            Empty Directory....
          </div>
        )}
        {filesData.map((element) => {
          if (element.isDir) {
            return (
              <div
                onClick={() => getDirData(element.value)}
                className="list-group-item list-group-item-action custom-list-group-item"
              >
                <i class="fas fa-folder-open"></i> {element.value}
              </div>
            );
          }
          return (
            <a
              target="_blank"
              rel="noreferrer"
              href={`http://${process.env.REACT_APP_ipv4}:${process.env.REACT_APP_PORT}/uploads/${element.dir}/${element.value}`}
              className="list-group-item list-group-item-action custom-list-group-item"
            >
              <i class="fas fa-file"></i> {element.value}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ShowFiles;
