'use client'
import React, { useEffect } from 'react'
import SideNav from '../_components/SideNav'

function Workspace({params}) {
    useEffect(()=>{
        console.log(params)
    })
  return (
    <div>
        <SideNav params={params} />
    </div>
  )
}

export default Workspace