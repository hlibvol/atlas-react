import React, { useCallback } from "react";
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
  autoFocus?: boolean;
  onChange: OnChangeHandler;
  tabIndex?: number;
  readOnly?: boolean;
};

export const useFocusAndSetRef = (ref: any) => {
  ref = useCallback(
    (node: any) => {
      if (node !== null) {
        ref.current = node; // it is not done on it's own
        const len = node.unprivilegedEditor.getLength();
        const selection = { index: len, length: len };
        node.setEditorSelection(node.editor, selection);
      }
    },
    [ref]
  );
  return ref;
};

const RichTextEditor: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  autoFocus,
  tabIndex,
  readOnly = false,
}) => {
  let editorRef;
  // eslint-disable-next-line prefer-const
  editorRef = useFocusAndSetRef(editorRef);
  return (
    <ReactQuill
      theme='snow'
      value={value || ""}
      modules={modules}
      formats={formats}
      onChange={onChange}
      placeholder={placeholder}
      className='quill-editor'
      ref={autoFocus ? editorRef : null}
      tabIndex={tabIndex || -1}
      readOnly={readOnly}
    />
  );
};

export default RichTextEditor;
