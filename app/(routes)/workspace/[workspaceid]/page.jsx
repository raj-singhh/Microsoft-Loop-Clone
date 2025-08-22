import React, { use } from 'react'
import SideNav from '../_components/SideNav'
import { Room } from '@/app/Room'

function Workspace({params:paramsPromise}) {
  const params=use(paramsPromise);
  console.log('Workspace page params:', params);
  return (
    <div>
      <Room params={params}>
        <SideNav params={params} />
      </Room>
    </div>
  )
}

export default Workspace