import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import styles from "./EditorBlock.module.css";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import { GoListOrdered } from "react-icons/go";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  title: string;
}

const EditorBlock: React.FC<EditorProps> = ({ value, onChange, title }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList,
      OrderedList,
      ListItem,
      TextStyle,
      Color,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const newValue = editor.getHTML();
      if (newValue !== value) {
        onChange(newValue);
      }
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value || "<p></p>");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className={styles["editor-container"]}>
      <label className="font-bold">{title}</label>
      <div className={styles["editor"]}>
        <div className={styles["editor-toolbar"]}>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            style={{ fontSize: "12px" }}
            className={
              editor.isActive("heading", { level: 3 })
                ? styles["is-active"]
                : ""
            }
          >
            H3
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBold().run();
            }}
            className={editor.isActive("bold") ? styles["is-active"] : ""}
            title="Bold"
          >
            <FiBold />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleItalic().run();
            }}
            className={editor.isActive("italic") ? styles["is-active"] : ""}
            title="Italic"
          >
            <FiItalic />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleStrike().run();
            }}
            className={editor.isActive("strike") ? styles["is-active"] : ""}
            title="Underline"
          >
            <FiUnderline />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBulletList().run();
            }}
            className={editor.isActive("bulletList") ? styles["is-active"] : ""}
            title="Bullet List"
          >
            <FiList />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleOrderedList().run();
            }}
            className={
              editor.isActive("orderedList") ? styles["is-active"] : ""
            }
            title="Ordered List"
          >
            <GoListOrdered />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().undo().run();
            }}
            title="Undo"
          >
            <FiArrowLeft />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().redo().run();
            }}
            title="Redo"
          >
            <FiArrowRight />
          </button>
          <input
            type="color"
            onChange={(e) =>
              editor
                .chain()
                .focus()
                .setMark("textStyle", { color: e.target.value })
                .run()
            }
            title="Text Color"
            style={{
              width: "24px",
              height: "24px",
              border: "none",
              cursor: "pointer",
              marginLeft: "8px",
            }}
          />
        </div>
        <EditorContent editor={editor} className={styles["editor-content"]} />
      </div>
    </div>
  );
};

export default EditorBlock;
