'use client'
import Logo from '@/app/_components/Logo'
import { useAuth } from '@clerk/clerk-react'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
    const {orgId}= useAuth();
    console.log(orgId)
  return (
    <div className='flex justify-between items-center p-3 shadow-sm'>
        <Logo/>
        <OrganizationSwitcher
         afterCreateOrganizationUrl={'/dashboard'}
         afterLeaveOrganizationUrl={'/dashboard'}
         />
        <UserButton/>
    </div>
  )
}

export default Header