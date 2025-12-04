import React from 'react'
import { NavLink } from 'react-router-dom'
import { Box, VStack, Heading, Link } from '@chakra-ui/react'
import { schemas } from '../../utils/schema'

/**
 * Sidebar: lists all tables derived from schema.js
 */
export default function Sidebar() {
  return (
    <Box w="220px" bg="gray.50" borderRightWidth="1px" minH="100vh" p={4}>
      <Heading size="sm" mb={4}>Research Lab</Heading>
      <VStack align="stretch" spacing={2}>
        {Object.keys(schemas).map((table) => (
          <Link as={NavLink} to={`/table/${table}`} key={table} _activeLink={{ fontWeight: 'bold' }}>
            {table}
          </Link>
        ))}
      </VStack>
    </Box>
  )
}
