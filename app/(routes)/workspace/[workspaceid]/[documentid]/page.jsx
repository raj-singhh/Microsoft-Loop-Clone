'use client'
import React, { use, useEffect } from 'react'
import SideNav from '../../_components/SideNav'
import DocumentEditorSection from '../../_components/DocumentEditorSection'
import { Room } from '@/app/Room'

function page({params:paramsPromise}) {
const params = use(paramsPromise)

  return (
    <Room params={params}>

      <div>
        {/* Side Nav  */}
        <div className=''>
          <SideNav params={params}/>
        </div>

        {/* Document  */}
        <div className='md:ml-72'>
          <DocumentEditorSection params={params}/>
        </div>
      </div>

    </Room>
  )
}

export default page