import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import TableView from '../../components/TableView/TableView'
import PublicationsAnalytics from './PublicationsAnalytics'

export default function PublicationPage() {
  return (
    <Box>
      <Heading size="lg" mb={4}>Publications</Heading>

      {/* Existing publication CRUD table */}
      <Box mb={6}>
        <TableView tableName="PUBLICATION" />
      </Box>

      {/* Analytics section placed below the publication list */}
      <PublicationsAnalytics />
    </Box>
  )
}
