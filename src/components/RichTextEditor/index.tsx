import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.scss";

/*
Reference: https://adarshaacharya.com.np/blog/integrate-react-quill-with-antd-forms
*/

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "code"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "code",
];

interface OnChangeHandler {
  (e: any): void;
}

type Props = {
  value: string;
  placeholder: string;
  onChange: OnChangeHandler;
};

const RichTextEditor: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <>
      <ReactQuill
        theme='snow'
        value={value || ""}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
        className='quill-editor'
      />
    </>
  );
};

export default RichTextEditor;
