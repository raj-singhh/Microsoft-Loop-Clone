'use client'
import React, { useState } from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { MessageCircle, X } from 'lucide-react'
import CommentBox from './CommentBox'

const RichDocumentEditor = dynamic(() => import('./RichDocumentEditor'), { ssr: false })

function DocumentEditorSection({params}) {
  const [openComment, setOpenComment] = useState(false)
  return (
    <div>
        {/* Header */}

        <DocumentHeader/>

        {/* Document Information */}

        <DocumentInfo params={params}/>

        {/* Rich Text Editor */}

        

            <RichDocumentEditor params={params}/>
          

          <div className='fixed right-10 bottom-10 '>
            <Button onClick={()=>setOpenComment(!openComment)}>{openComment?<X/>:<MessageCircle/>}</Button>
            {openComment && <CommentBox/>}
          </div>
        
    </div>
  )
}

export default DocumentEditorSection
