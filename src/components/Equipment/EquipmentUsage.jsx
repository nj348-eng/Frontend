import React, { useState } from 'react'
import {
  Box,
  Heading,
  Text,
  Badge,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Spinner,
  Collapse,
  IconButton,
  VStack,
  HStack,
  Divider
} from '@chakra-ui/react'

/**
 * MemberProjects: renders a collapsible list of projects for a member
 */
function MemberProjects({ projects = [] }) {
  const [open, setOpen] = useState(false)

  return (
    <Box borderWidth="1px" borderRadius="md" p={2} mt={2}>
      <HStack justify="space-between">
        <Text fontWeight="semibold">Projects ({projects.length})</Text>
        <IconButton
          size="sm"
          icon={<span style={{ fontSize: 12 }}>{open ? '▼' : '▶'}</span>}
          onClick={() => setOpen((s) => !s)}
          aria-label={open ? 'Collapse' : 'Expand'}
        />
      </HStack>

      <Collapse in={open} animateOpacity>
        <Table size="sm" mt={3} variant="simple">
          <Thead>
            <Tr>
              <Th>PID</Th>
              <Th>Title</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
              <Th>Exp Duration</Th>
              <Th>Faculty ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((p, i) => (
              <Tr key={i}>
                <Td>{p.PID ?? ''}</Td>
                <Td>{p.TITLE ?? ''}</Td>
                <Td>{p.START_DATE ?? ''}</Td>
                <Td>{p.END_DATE ?? ''}</Td>
                <Td>{p.EXP_DURATION ?? ''}</Td>
                <Td>{p.FID ?? ''}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Collapse>
    </Box>
  )
}

/**
 * MemberUsageCard: shows a member using equipment and their basic info
 */
function MemberUsageCard({ member }) {
  return (
    <Box borderWidth="1px" borderRadius="md" p={3} mb={3}>
      <HStack justify="space-between">
        <VStack align="start" spacing={0}>
          <Text fontWeight="bold">{member.NAME ?? 'Unknown'}</Text>
          <Text fontSize="sm">MID: {member.MID ?? ''} • Type: {member.MTYPE ?? ''}</Text>
        </VStack>
        <Badge colorScheme="purple">Joined: {member.JOINDATE ?? '—'}</Badge>
      </HStack>

      <Text fontSize="sm" mt={2}>Mentor MID: {member.MENTOR_MID ?? '—'}</Text>

      {/* Projects list */}
      <MemberProjects projects={member.PROJECTS ?? []} />
    </Box>
  )
}

/**
 * EquipmentUsage: displays equipment status and a list of members/projects using it.
 * Props:
 * - eid: equipment id to fetch (optional)
 * - statusData, usageData, loading, errors can be passed for pre-fetched data
 */
export default function EquipmentUsage({ eid: initialEid, fetchStatus, fetchUsage }) {
  const [eid, setEid] = useState(initialEid ?? '')
  const [status, setStatus] = useState(null)
  const [members, setMembers] = useState([])
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [loadingUsage, setLoadingUsage] = useState(false)
  const [errorStatus, setErrorStatus] = useState(null)
  const [errorUsage, setErrorUsage] = useState(null)

  async function doFetch(eidToFetch) {
    if (!eidToFetch) return
    setErrorStatus(null)
    setErrorUsage(null)
    setLoadingStatus(true)
    setLoadingUsage(true)

    try {
      const s = await fetchStatus(eidToFetch)
      setStatus(s)
    } catch (err) {
      setErrorStatus(err.message || String(err))
      setStatus(null)
    } finally {
      setLoadingStatus(false)
    }

    try {
      const u = await fetchUsage(eidToFetch)
      // Expecting an array of members with nested PROJECTS array
      setMembers(Array.isArray(u) ? u : [])
    } catch (err) {
      setErrorUsage(err.message || String(err))
      setMembers([])
    } finally {
      setLoadingUsage(false)
    }
  }

  // When initialEid prop changes (e.g., user selected a row), update input and auto-fetch
  React.useEffect(() => {
    if (initialEid) {
      setEid(initialEid)
      doFetch(initialEid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialEid])

  return (
    <Box mt={6}>
      <Heading size="md" mb={3}>Equipment Details</Heading>

      <HStack spacing={3} mb={4}>
        <Input placeholder="Enter EID" value={eid} onChange={(e) => setEid(e.target.value)} />
        <Button onClick={() => doFetch(eid)} colorScheme="blue">Fetch Details</Button>
      </HStack>

      <Stack direction={{ base: 'column', md: 'row' }} spacing={4} align="stretch">
        <Box flex="1" borderWidth="1px" p={3} borderRadius="md">
          <Text fontWeight="semibold">Status</Text>

          {loadingStatus ? (
            <Spinner />
          ) : errorStatus ? (
            <Text color="red.500">{errorStatus}</Text>
          ) : status ? (
            <Badge colorScheme={String(status).toLowerCase() === 'available' ? 'green' : 'orange'}>{String(status)}</Badge>
          ) : (
            <Text color="gray.600">Status not available</Text>
          )}
        </Box>

        <Box flex="2" borderWidth="1px" p={3} borderRadius="md">
          <HStack justify="space-between">
            <Text fontWeight="semibold">Current Usage Details</Text>
            {loadingUsage && <Spinner size="sm" />}
          </HStack>

          <Divider my={2} />

          {errorUsage && <Text color="red.500">{errorUsage}</Text>}

          {!loadingUsage && !errorUsage && members.length === 0 && (
            <Text color="gray.600">No members currently using this equipment.</Text>
          )}

          <VStack align="stretch" mt={2}>
            {members.map((m, i) => (
              <MemberUsageCard key={i} member={m} />
            ))}
          </VStack>
        </Box>
      </Stack>
    </Box>
  )
}
