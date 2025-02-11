import  { ReactNode } from 'react'

const Container = ({children}:{children:ReactNode}) => {
  return (
    <div className='max-w-[1440px] mx-auto overflow-hidden bg-blue-500'>
      {children}
    </div>
  )
}

export default Container
