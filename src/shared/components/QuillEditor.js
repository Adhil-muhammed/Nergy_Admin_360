import React from "react";
// import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const Quillmodules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
export const QuillEditor = ({ value, onChange }) => {
  return <ReactQuill value={value} modules={Quillmodules} onChange={onChange} />;
};
