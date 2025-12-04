import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

/**
 * Navbar: simple top bar
 */
export default function Navbar() {
  return (
    <Flex align="center" justify="space-between" px={6} py={3} borderBottomWidth="1px" bg="white">
      <Text fontWeight="bold">Research Lab Manager</Text>
      {/* Right side intentionally left blank for a cleaner header */}
    </Flex>
  )
}
