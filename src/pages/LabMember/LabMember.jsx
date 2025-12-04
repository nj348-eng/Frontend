import React, { useState } from 'react'
import {
  Box,
  Heading,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  VStack,
  HStack,
  Badge,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import TableView from '../../components/TableView/TableView'
import { listMembersOnGrant, getMentorshipRelations, getMembersWithHighestPublications } from '../../utils/api'

/**
 * LabMember: Page that shows LAB_MEMBER table plus new tools:
 * - Show members who worked on grant-funded projects
 * - Show mentorship relations for a project
 * - Show members with highest publications
 */
export default function LabMember() {
  const [gid, setGid] = useState('')
  const [grantMembers, setGrantMembers] = useState([])
  const [loadingGrant, setLoadingGrant] = useState(false)
  const [errorGrant, setErrorGrant] = useState(null)
  const [searchedGrant, setSearchedGrant] = useState(false)

  const [pid, setPid] = useState('')
  const [mentorship, setMentorship] = useState([])
  const [loadingMentorship, setLoadingMentorship] = useState(false)
  const [errorMentorship, setErrorMentorship] = useState(null)
  const [searchedMentorship, setSearchedMentorship] = useState(false)

  const [topMembers, setTopMembers] = useState([])
  const [loadingTop, setLoadingTop] = useState(false)
  const [errorTop, setErrorTop] = useState(null)

  async function handleShowGrantMembers() {
    setSearchedGrant(true)
    setErrorGrant(null)
    setLoadingGrant(true)
    try {
      const data = await listMembersOnGrant(gid)
      setGrantMembers(Array.isArray(data) ? data : [])
    } catch (err) {
      setErrorGrant(err.message)
      setGrantMembers([])
    } finally {
      setLoadingGrant(false)
    }
  }

  async function handleShowMentorship() {
    setSearchedMentorship(true)
    setErrorMentorship(null)
    setLoadingMentorship(true)
    try {
      const data = await getMentorshipRelations(pid)
      setMentorship(Array.isArray(data) ? data : [])
    } catch (err) {
      setErrorMentorship(err.message)
      setMentorship([])
    } finally {
      setLoadingMentorship(false)
    }
  }

  async function handleShowTopMembers() {
    setErrorTop(null)
    setLoadingTop(true)
    try {
      const data = await getMembersWithHighestPublications()
      setTopMembers(Array.isArray(data) ? data : [])
    } catch (err) {
      setErrorTop(err.message)
      setTopMembers([])
    } finally {
      setLoadingTop(false)
    }
  }

  return (
    <Box>
      <Heading size="lg" mb={4}>Lab Members</Heading>

      {/* Main table view (reuse TableView with tableName=LAB_MEMBER) */}
      <Box mb={8}>
        <TableView tableName="LAB_MEMBER" />
      </Box>

      {/* 1. Members on grant-funded projects */}
      <Box borderWidth="1px" borderRadius="md" p={4} mb={6}>
        <HStack mb={3}>
          <Input flex="1" placeholder="Enter GID" value={gid} onChange={(e) => setGid(e.target.value)} />
          <Button size="sm" colorScheme="blue" onClick={handleShowGrantMembers} maxW="220px" whiteSpace="normal" textAlign="center" px={2}>
            Show Members on Grant-Funded Projects
          </Button>
          {loadingGrant && <Spinner size="sm" />}
        </HStack>

        {errorGrant && <Alert status="error"><AlertIcon />{errorGrant}</Alert>}

        {!loadingGrant && searchedGrant && grantMembers.length === 0 && !errorGrant && (
          <Text color="gray.600">No members found for this grant.</Text>
        )}

        {grantMembers.length > 0 && (
          <Table size="sm" mt={3} variant="simple">
            <Thead>
              <Tr>
                <Th>MID</Th>
                <Th>Name</Th>
                <Th>Join Date</Th>
                <Th>Member Type</Th>
                <Th>Mentor MID</Th>
              </Tr>
            </Thead>
            <Tbody>
              {grantMembers.map((m, i) => (
                <Tr key={i}>
                  <Td>{m.mid ?? m.MID ?? ''}</Td>
                  <Td>{m.m_name ?? m.NAME ?? ''}</Td>
                  <Td>{m.jdate ?? m.JOINDATE ?? ''}</Td>
                  <Td>{m.member_type ?? m.MTYPE ?? ''}</Td>
                  <Td>{m.mentor_mid ?? m.MENTOR_MID ?? ''}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      {/* 2. Mentorship relations for a project */}
      <Box borderWidth="1px" borderRadius="md" p={4} mb={6}>
        <HStack mb={3}>
          <Input flex="1" placeholder="Enter PID" value={pid} onChange={(e) => setPid(e.target.value)} />
          <Button size="sm" colorScheme="blue" onClick={handleShowMentorship} maxW="180px" whiteSpace="normal" textAlign="center" px={2}>
            Show Mentorship Relations
          </Button>
          {loadingMentorship && <Spinner size="sm" />}
        </HStack>

        {errorMentorship && <Alert status="error"><AlertIcon />{errorMentorship}</Alert>}

        {!loadingMentorship && searchedMentorship && mentorship.length === 0 && !errorMentorship && (
          <Text color="gray.600">No mentorship relations found.</Text>
        )}

        {mentorship.length > 0 && (
          <Table size="sm" mt={3} variant="simple">
            <Thead>
              <Tr>
                <Th>Mentor_ID</Th>
                <Th>Mentee_ID</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mentorship.map((r, i) => (
                <Tr key={i}>
                  <Td>{r.mentor_id ?? r.MENTOR_ID ?? r.mentor ?? ''}</Td>
                  <Td>{r.mentee_id ?? r.MENTEE_ID ?? r.mentee ?? ''}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      {/* 3. Members with highest publications */}
      <Box borderWidth="1px" borderRadius="md" p={4} mb={6}>
        <HStack mb={3}>
          <Button colorScheme="blue" onClick={handleShowTopMembers}>Show Members With Highest Publications</Button>
          {loadingTop && <Spinner size="sm" />}
        </HStack>

        {errorTop && <Alert status="error"><AlertIcon />{errorTop}</Alert>}

        {!loadingTop && topMembers.length === 0 && !errorTop && (
          <Text color="gray.600">No results yet. Click the button to load.</Text>
        )}

        {topMembers.length > 0 && (
          <VStack align="start" spacing={2} mt={2}>
            {topMembers.map((name, i) => (
              <Badge key={i} colorScheme="green">{name}</Badge>
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  )
}
