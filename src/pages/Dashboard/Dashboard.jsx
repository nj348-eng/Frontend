import React from 'react'
import { Box, Text } from '@chakra-ui/react'

export default function Dashboard() {
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">Dashboard</Text>
      <Text mt={2}>Select a table from the sidebar to view and manage records.</Text>
    </Box>
  )
}
