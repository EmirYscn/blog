import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

// const API_BASE_URL = import.meta.env.VITE_API_URL;

type RichTextEditorProps = {
  content: string;
  setContent: (value: string) => void;
};

function TextEditor({ content, setContent }: RichTextEditorProps) {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey="n0qe6k9qd68mxz9ezarh6o3zio22wm6mdkiycpxenwdo7dpk"
      onInit={(_evt, editor) => (editorRef.current = editor)}
      value={content}
      onEditorChange={(newContent) => setContent(newContent)}
      init={{
        height: 600,
        menubar: true,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "media image link |" +
          "fullscreen preview | removeformat help |",

        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}",
        // ✅ Enable local image upload
        // images_upload_url: `${API_BASE_URL}/upload-image`,
        // automatic_uploads: true,

        // file_picker_types: "image",
        // file_picker_callback: (callback, value, meta) => {
        //   const input = document.createElement("input");
        //   input.setAttribute("type", "file");
        //   input.setAttribute("accept", "image/*");
        //   input.onchange = function () {
        //     const file = this.files[0];
        //     const reader = new FileReader();
        //     reader.onload = function () {
        //       const id = "blobid" + new Date().getTime();
        //       const blobCache = editorRef?.current?.editorUpload.blobCache;
        //       const base64 = reader.result.split(",")[1];
        //       const blobInfo = blobCache.create(id, file, base64);
        //       blobCache.add(blobInfo);
        //       callback(blobInfo.blobUri(), { title: file.name });
        //     };
        //     reader.readAsDataURL(file);
        //   };
        //   input.click();
        // },
      }}
    />
  );
}

export default TextEditor;
