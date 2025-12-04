import React, { useState } from 'react'
import {
  Box,
  Heading,
  HStack,
  Button,
  Spinner,
  Text,
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react'
import { getNumberOfPublicationsPerMajor } from '../../utils/api'

/**
 * PublicationsAnalytics: fetches number of publications per major and displays
 * a table with Major | Publication Count | Average
 */
export default function PublicationsAnalytics() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [rows, setRows] = useState([])

  async function handleFetch() {
    setError(null)
    setRows([])
    setLoading(true)
    try {
      const res = await getNumberOfPublicationsPerMajor()
      // backend returns { success, data, message } or raw array
      const data = res && res.data ? res.data : Array.isArray(res) ? res : []

      // Normalize: data is array of { major, count, totalStudents? }
      const normalized = (data || []).map((r) => ({
        major: r.major ?? r.MAJOR ?? 'Unknown',
        count: Number(r.count ?? r.COUNT ?? 0),
        totalStudents: r.totalStudents ?? r.total_students ?? r.TOTAL_STUDENTS ?? null
      }))

      setRows(normalized)
    } catch (err) {
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mt={6}>
      <Heading size="md" mb={3}>Average Number of Student Publications per Major</Heading>

      <HStack mb={4}>
        <Button colorScheme="teal" onClick={handleFetch} size="sm">Calculate Average Publications</Button>
        {loading && <Spinner size="sm" />}
      </HStack>

      {error && <Alert status="error"><AlertIcon />{error}</Alert>}

      {!loading && !error && rows.length === 0 && (
        <Text color="gray.600">No data yet. Click the button to calculate averages.</Text>
      )}

      {rows.length > 0 && (
        <Box overflowX="auto">
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Major</Th>
                <Th>Publication Count</Th>
                <Th>Average</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rows.map((r, i) => {
                const avg = r.totalStudents ? r.count / Number(r.totalStudents) : r.count
                return (
                  <Tr key={i}>
                    <Td>{r.major}</Td>
                    <Td>{r.count}</Td>
                    <Td>{Number.isFinite(avg) ? avg.toFixed(2) : '0.00'}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  )
}
