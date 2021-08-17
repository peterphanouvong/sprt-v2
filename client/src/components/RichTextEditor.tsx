import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

interface Props {
  placeholder: string;
  content: string;
  setContent: (string) => void;
}

const RichTextEditor: React.FC<Props> = ({
  placeholder,
  content,
  setContent,
}) => {
  const editor = useRef(null);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    width: "100%",
    enableDragAndDropFileToEditor: true,
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "fontsize",
      "paragraph",
      "|",
      "image",
      "table",
      "link",
      "|",
      "left",
      "center",
      "right",
      "justify",
      "|",
      "undo",
      "redo",
    ],
    uploader: { insertImageAsBase64URI: true },
    // removeButtons: ["brush", "file", "paint", "resize"],
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: true,
    toolbarSticky: true,
    height: "200px",
    placeholder: placeholder,
  };
  return (
    <JoditEditor
      ref={editor}
      value={content}
      theme="dark"
      //@ts-ignore
      config={config}
      // tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {
        console.log(newContent);
      }}
    />
  );
};

export default RichTextEditor;
