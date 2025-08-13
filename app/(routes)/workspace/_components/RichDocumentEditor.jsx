'use client'
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import SimpleImage from "@editorjs/simple-image";
import EditorjsList from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import editorjsNestedChecklist from '@calumk/editorjs-nested-checklist';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import CodeTool from '@rxpm/editor-js-code';
import TextVariantTune from '@editorjs/text-variant-tune';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/clerk-react';

function RichDocumentEditor({params}) {
    const ref=useRef();
    const {user}=useUser();
    let editor;
    let isFetched=false;
    useEffect(()=>{
        user && InitEditor()
    },[user])
    // useEffect(()=>{
    //   params && GetDocumentOutput();
    // },[params])
    // Used to save Document
    const SaveDocument=()=>{
      ref.current.save().then(async(outputData)=>{
        const docRef=doc(db,'documentOutput',params?.documentid);
        await updateDoc(docRef,{
          output:outputData,
          editedBy:user?.primaryEmailAddress?.emailAddress
        })
      })
    }
    // Get Document Data 

    const GetDocumentOutput=()=>{
      const unsubscribe=onSnapshot(doc(db,'documentOutput',params?.documentid),
        (doc)=>{
          if(isFetched==false || doc.data()?.editedBy!=user?.primaryEmailAddress?.emailAddress)
          doc.data()?.output && editor.render(doc.data()?.output)
        isFetched=true;
        }
      )
    }
    const InitEditor=()=>{
        if(!editor?.current){
            editor = new EditorJS({
              onChange:(ap,event)=>{
                SaveDocument();
              },
              onReady:()=>{
                GetDocumentOutput();
              },
                holder: 'editorjs',
                tools: { 
                    header: Header, 
                    delimiter: Delimiter,
                    image: SimpleImage,
                    alert: {
                      class: Alert,
                      inlineToolbar: true,
                      shortcut: 'CMD+SHIFT+A',
                      config: {
                        alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
                        defaultType: 'primary',
                        messagePlaceholder: 'Enter something',
                      }
                    },
                    List: {
                        class: EditorjsList,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+L',
                        config: {
                          defaultStyle: 'unordered'
                        },
                    },
                    paragraph: {
                        class: Paragraph,
                        inlineToolbar: true,
                    },
                    code: {
                      class: CodeTool,
                      config: {
                        modes: {
                            'js': 'JavaScript',
                            'ts': 'TypeScript',
                            'py': 'Python',
                            'java': 'Java',
                            'go': 'Go',
                            'cpp': 'C++',
                            'cs': 'C#',
                            'c': 'C',
                            'php': 'PHP',
                            'rb': 'Ruby',
                            'kt': 'Kotlin',
                            'swift': 'Swift',
                            'rs': 'Rust',
                            'scala': 'Scala',
                            'dart': 'Dart',
                            'sh': 'Shell',
                            'html': 'HTML',
                            'css': 'CSS',
                            'scss': 'SCSS',
                            'xml': 'XML',
                            'json': 'JSON',
                            'yaml': 'YAML',
                            'md': 'Markdown',
                            'sql': 'SQL',
                            'r': 'R',
                            'pl': 'Perl',
                            'lua': 'Lua',
                            'hs': 'Haskell',
                            'mat': 'MATLAB'
                        },
                        defaultMode: 'C'
                      }
                    },

                    nestedchecklist : editorjsNestedChecklist,
                    embed: Embed,
                    table: Table,
                    
                    textVariant: TextVariantTune,
                },
            });
            ref.current=editor
        }
    }
  return (
    <div className='lg:-ml-80'>

        <div id='editorjs'></div>

    </div>
  )
}

export default RichDocumentEditor