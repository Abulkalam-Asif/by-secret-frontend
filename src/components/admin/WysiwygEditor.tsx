import { useRef, useState, useEffect } from "react";

type WysiwygEditorProps = {
  content: string;
  onChange: (content: string) => void;
};

type FormatState = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  heading1: boolean;
  heading2: boolean;
  bulletList: boolean;
  numberList: boolean;
};

const WysiwygEditor = ({ content, onChange }: WysiwygEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<FormatState>({
    bold: false,
    italic: false,
    underline: false,
    heading1: false,
    heading2: false,
    bulletList: false,
    numberList: false,
  });

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  // Update format state based on current selection
  const updateActiveFormats = () => {
    if (!document) return;

    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      heading1: document.queryCommandValue("formatBlock") === "h1",
      heading2: document.queryCommandValue("formatBlock") === "h2",
      bulletList: document.queryCommandState("insertUnorderedList"),
      numberList: document.queryCommandState("insertOrderedList"),
    });
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      updateActiveFormats();
    }
  };

  const formatDoc = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      editorRef.current.focus();
      updateActiveFormats();
    }
  };

  // For lists, we need to ensure proper formatting
  const toggleList = (type: "insertUnorderedList" | "insertOrderedList") => {
    document.execCommand(type, false);

    // Fix empty list items issue
    if (editorRef.current) {
      const listItems = editorRef.current.querySelectorAll("li:empty");
      listItems.forEach((item) => {
        item.innerHTML = "<br>";
      });

      onChange(editorRef.current.innerHTML);
      editorRef.current.focus();
      updateActiveFormats();
    }
  };

  return (
    <div className="wysiwyg-editor">
      <div className="toolbar flex flex-wrap gap-1 p-2 bg-gray-100 border-b border-gray-300 rounded-t-lg">
        <button
          type="button"
          onClick={() => formatDoc("bold")}
          className={`p-2 rounded ${
            activeFormats.bold
              ? "bg-theme-blue text-white"
              : "hover:bg-gray-200"
          }`}
          title="Bold">
          <span className="font-bold">B</span>
        </button>
        <button
          type="button"
          onClick={() => formatDoc("italic")}
          className={`p-2 rounded ${
            activeFormats.italic
              ? "bg-theme-blue text-white"
              : "hover:bg-gray-200"
          }`}
          title="Italic">
          <span className="italic">I</span>
        </button>
        <button
          type="button"
          onClick={() => formatDoc("underline")}
          className={`p-2 rounded ${
            activeFormats.underline
              ? "bg-theme-blue text-white"
              : "hover:bg-gray-200"
          }`}
          title="Underline">
          <span className="underline">U</span>
        </button>
        <div className="border-r border-gray-300 mx-2"></div>
        <button
          type="button"
          onClick={() => formatDoc("formatBlock", "h1")}
          className={`p-2 rounded ${
            activeFormats.heading1
              ? "bg-theme-blue text-white"
              : "hover:bg-gray-200"
          }`}
          title="Heading 1">
          H1
        </button>
        <button
          type="button"
          onClick={() => formatDoc("formatBlock", "h2")}
          className={`p-2 rounded ${
            activeFormats.heading2
              ? "bg-theme-blue text-white"
              : "hover:bg-gray-200"
          }`}
          title="Heading 2">
          H2
        </button>
        <div className="border-r border-gray-300 mx-2"></div>
        <button
          type="button"
          onClick={() => toggleList("insertUnorderedList")}
          className={`p-2 rounded ${
            activeFormats.bulletList
              ? "bg-theme-blue text-white"
              : "hover:bg-gray-200"
          }`}
          title="Bullet List">
          • List
        </button>
        <button
          type="button"
          onClick={() => toggleList("insertOrderedList")}
          className={`p-2 rounded ${
            activeFormats.numberList
              ? "bg-theme-blue text-white"
              : "hover:bg-gray-200"
          }`}
          title="Numbered List">
          1. List
        </button>
        <div className="border-r border-gray-300 mx-2"></div>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter link URL", "https://");
            if (url !== null) {
              formatDoc("createLink", url);
            }
          }}
          className="p-2 hover:bg-gray-200 rounded"
          title="Insert Link">
          Link
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="editor-content min-h-[300px] p-4 focus:outline-none overflow-auto"
        onInput={handleInput}
        onMouseUp={updateActiveFormats}
        onKeyUp={updateActiveFormats}></div>
    </div>
  );
};

export default WysiwygEditor;
