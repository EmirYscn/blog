import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

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
      }}
    />
  );
}

export default TextEditor;
