import React, { useState } from 'react'
import {
  Box,
  Heading,
  HStack,
  Input,
  Button,
  Spinner,
  Text,
  Alert,
  AlertIcon,
  VStack,
  Badge
} from '@chakra-ui/react'
import TableView from '../../components/TableView/TableView'
import { getProjectStatus, listProjectsFundedAndActive } from '../../utils/api'

export default function ProjectPage() {
  // Project Status
  const [pid, setPid] = useState('')
  const [status, setStatus] = useState(null)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [errorStatus, setErrorStatus] = useState(null)

  // Grant-funded & active projects
  const [gid, setGid] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [countResult, setCountResult] = useState(null)
  const [loadingCount, setLoadingCount] = useState(false)
  const [errorCount, setErrorCount] = useState(null)

  

  async function handleGetStatus() {
    setErrorStatus(null)
    setStatus(null)
    if (!pid) {
      setErrorStatus('Please enter PID')
      return
    }
    setLoadingStatus(true)
    try {
      const data = await getProjectStatus(pid)
      // data may be { status: 'Active' } or a simple string
      if (data && typeof data === 'object' && data.status !== undefined) setStatus(data.status)
      else setStatus(data)
    } catch (err) {
      setErrorStatus(err.message)
    } finally {
      setLoadingStatus(false)
    }
  }

  async function handleFindProjectCount() {
    setErrorCount(null)
    setCountResult(null)
    // basic client-side validation
    if (!gid) {
      setErrorCount('Please enter GID')
      return
    }
    if (!startDate || !endDate) {
      setErrorCount('Please provide both start and end dates')
      return
    }

    setLoadingCount(true)
    try {
      const data = await listProjectsFundedAndActive(gid, startDate, endDate)
      // Accept either a number or an array
      if (typeof data === 'number') setCountResult(data)
      else if (Array.isArray(data)) setCountResult(data.length)
      else if (data && typeof data === 'object' && data.count !== undefined) setCountResult(data.count)
      else setCountResult(0)
    } catch (err) {
      setErrorCount(err.message)
    } finally {
      setLoadingCount(false)
    }
  }

  return (
    <Box>
      <Heading size="lg" mb={4}>Projects</Heading>

      {/* Existing CRUD table */}
      <Box mb={6}>
        <TableView tableName="PROJECT" />
      </Box>

      {/* New features: placed below CRUD operations */}
      <VStack align="stretch" spacing={6}>
        {/* 1. Project Status */}
        <Box borderWidth="1px" borderRadius="md" p={4}>
          <Heading size="md" mb={3}>Project Status</Heading>
          <HStack mb={3}>
            <Input placeholder="Enter PID" value={pid} onChange={(e) => setPid(e.target.value)} />
            <Button colorScheme="blue" onClick={handleGetStatus}>Get Status</Button>
            {loadingStatus && <Spinner size="sm" />}
          </HStack>

          {errorStatus && <Alert status="error"><AlertIcon />{errorStatus}</Alert>}

          {!errorStatus && !loadingStatus && (
            <Box mt={2}>
              {status ? (
                <Badge colorScheme="purple" fontSize="md">{String(status)}</Badge>
              ) : (
                <Text color="gray.600">No status to display. Enter a PID and click "Get Status".</Text>
              )}
            </Box>
          )}
        </Box>

        {/* 2. Grant-Funded & Active Projects */}
        <Box borderWidth="1px" borderRadius="md" p={4}>
          <Heading size="md" mb={3}>Grant-Funded & Active Projects</Heading>
          <HStack mb={3} spacing={3}>
            <Input placeholder="Enter GID" value={gid} onChange={(e) => setGid(e.target.value)} maxW="200px" />
            <Input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <Input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <Button size="sm" colorScheme="blue" onClick={handleFindProjectCount} maxW="160px" whiteSpace="normal" textAlign="center" px={2} fontSize="12px">
              Find Project Count
            </Button>
            {loadingCount && <Spinner size="sm" />}
          </HStack>

          {errorCount && <Alert status="error"><AlertIcon />{errorCount}</Alert>}

          {!errorCount && countResult !== null && (
            <Box mt={2}>
              <Text>Projects active during this time and funded by this grant: <strong>{countResult}</strong></Text>
            </Box>
          )}
        </Box>

        
      </VStack>
    </Box>
  )
}
