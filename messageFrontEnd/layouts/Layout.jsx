import React from 'react'
import Container from '../container/Container'
import Header from '../sections/Header'
import { Outlet } from 'react-router'
import Footer from '../sections/Footer'

const Layout = () => {
  return (
    <Container>
        <Header/>
        <Outlet/>
        <Footer/>
    </Container>
  )
}

export default Layout
