"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import Alert from "editorjs-alert";
import SimpleImage from "@editorjs/simple-image";
import List from "@editorjs/list";
import Checklist from '@editorjs/checklist'
import Paragraph from "@editorjs/paragraph";
import editorjsNestedChecklist from "@calumk/editorjs-nested-checklist";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import CodeTool from "@rxpm/editor-js-code";
import TextVariantTune from "@editorjs/text-variant-tune";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/clerk-react";
import GenerateFromAI from "./GenerateFromAI";

function RichDocumentEditor({ params }) {
  const ref = useRef();
  const { user } = useUser();
  let editor;
  let isFetched = false;
  useEffect(() => {
    user && InitEditor();
  }, [user]);

  const SaveDocument = () => {
    ref.current.save().then(async (outputData) => {
      const docRef = doc(db, "documentOutput", params?.documentid);
      await updateDoc(docRef, {
        output: JSON.stringify(outputData),
        editedBy: user?.primaryEmailAddress?.emailAddress,
      });
    });
  };
  // Get Document Data

  const GetDocumentOutput = () => {
    const unsubscribe = onSnapshot(
      doc(db, "documentOutput", params?.documentid),
      (doc) => {
        if (
          doc.data()?.editedBy != user?.primaryEmailAddress?.emailAddress ||
          isFetched == false
        )
          doc.data().editedBy && editor?.render(JSON.parse(doc.data()?.output));
        isFetched = true;
      }
    );
  };
  const InitEditor = () => {
    if (!editor?.current) {
      editor = new EditorJS({
        onChange: (api, event) => {
          SaveDocument();
        },
        onReady: () => {
          GetDocumentOutput();
        },
        holder: "editorjs",
        tools: {
          header: Header,
          delimiter: Delimiter,
          image: SimpleImage,
          alert: {
            class: Alert,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+A",
            config: {
              alertTypes: [
                "primary",
                "secondary",
                "info",
                "success",
                "warning",
                "danger",
                "light",
                "dark",
              ],
              defaultType: "primary",
              messagePlaceholder: "Enter something",
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+L",
            config: {
              defaultStyle: "unordered",
            },
          },
          checklist: {
            class: Checklist,
            shortcut: 'CMD+SHIFT+C',
            inlineToolbar: true,
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          code: {
            class: CodeTool,
            config: {
              modes: {
                js: "JavaScript",
                ts: "TypeScript",
                py: "Python",
                java: "Java",
                go: "Go",
                cpp: "C++",
                cs: "C#",
                c: "C",
                php: "PHP",
                rb: "Ruby",
                kt: "Kotlin",
                swift: "Swift",
                rs: "Rust",
                scala: "Scala",
                dart: "Dart",
                sh: "Shell",
                html: "HTML",
                css: "CSS",
                scss: "SCSS",
                xml: "XML",
                json: "JSON",
                yaml: "YAML",
                md: "Markdown",
                sql: "SQL",
                r: "R",
                pl: "Perl",
                lua: "Lua",
                hs: "Haskell",
                mat: "MATLAB",
              },
              defaultMode: "C",
            },
          },

          nestedchecklist: editorjsNestedChecklist,
          embed: Embed,
          table: Table,

          // textVariant: TextVariantTune,
        },
      });
      ref.current = editor;
    }
  };
  return (
    <div className="">
      <div id="editorjs" className="w-[70%]"></div>
      <div className="fixed bottom-10 md:ml-80 left-0 z-10">
        <GenerateFromAI
          setGenerateAIOutput={(output) => editor?.render(output)}
        />
      </div>
    </div>
  );
}

export default RichDocumentEditor;
