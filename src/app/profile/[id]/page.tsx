import React from 'react'

const UserProfile = ({params}:any) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <p>Profile page {params.id}</p>
    </div>
  )
}

export default UserProfile