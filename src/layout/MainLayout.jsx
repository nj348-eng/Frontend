import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar/Sidebar'
import Navbar from '../components/Navbar/Navbar'

/**
 * MainLayout: App shell with Sidebar and top Navbar.
 */
export default function MainLayout() {
  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box flex="1">
        <Navbar />
        <Box p={4}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  )
}
