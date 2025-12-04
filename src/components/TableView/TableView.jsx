import React, { useState, useEffect } from 'react'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Text,
  Spinner,
  useDisclosure,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import CRUDModal from '../CRUDModal/CRUDModal'
import { schemas } from '../../utils/schema'
import { getTable, createRow, updateRow, deleteRow, getEquipmentStatus, listEquipmentUsage } from '../../utils/api'
import { getValidationSchema } from '../../utils/validation'
import EquipmentUsage from '../Equipment/EquipmentUsage'

/**
 * TableView: Shows table rows and CRUD controls.
 * - tableName: string
 */
export default function TableView({ tableName }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)

  const insertModal = useDisclosure()
  const editModal = useDisclosure()

  const schema = schemas[tableName]
  // Tables that should be read-only in the UI (no Insert/Update/Delete)
  const readOnlyTables = ['GRANT', 'STUDENT', 'FACULTY', 'COLLABORATOR']
  const isReadOnly = tableName ? readOnlyTables.includes(tableName.toUpperCase()) : false

  useEffect(() => {
    if (!tableName) return
    // clear any selection when switching tables and reload
    setSelected(null)
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableName])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await getTable(tableName)
      setRows(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(payload) {
    if (isReadOnly) return
    await createRow(tableName, payload)
    await load()
  }

  async function handleUpdate(payload) {
    if (isReadOnly) return
    // assume the first key in schema is the primary id
    const pk = Object.keys(schema)[0]
    const id = payload[pk]
    if (id === undefined || id === '') throw new Error('Primary key is required')
    await updateRow(tableName, id, payload)
    await load()
  }

  async function handleDelete() {
    if (isReadOnly) return
    if (!selected) return
    const pk = Object.keys(schema)[0]
    const id = selected[pk]
    if (id === undefined) throw new Error('Selected row has no primary key')
    await deleteRow(tableName, id)
    setSelected(null)
    await load()
  }

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Text fontSize="lg" fontWeight="bold">{tableName}</Text>
        {/* If the table is read-only, hide Insert/Update/Delete and show a Refresh/Fetch button only */}
        {!isReadOnly ? (
          <HStack>
            <Button colorScheme="green" onClick={insertModal.onOpen}>Insert</Button>
            <Button colorScheme="blue" onClick={() => editModal.onOpen()} isDisabled={!selected}>Update</Button>
            <Button colorScheme="red" onClick={handleDelete} isDisabled={!selected}>Delete</Button>
          </HStack>
        ) : (
          <HStack>
            <Button onClick={load}>Fetch</Button>
          </HStack>
        )}
      </HStack>

      {loading && <Spinner />}
      {error && <Alert status="error"><AlertIcon />{error}</Alert>}

      {!loading && !error && (
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              {Object.keys(schema).map((col) => (
                <Th key={col}>{col}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row, idx) => {
              const clickable = !isReadOnly
              return (
                <Tr
                  key={idx}
                  onClick={clickable ? () => setSelected(row) : undefined}
                  bg={selected === row ? 'gray.100' : undefined}
                  cursor={clickable ? 'pointer' : 'default'}
                >
                  {Object.keys(schema).map((col) => (
                    <Td key={col}>{String(row[col] ?? '')}</Td>
                  ))}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      )}

      {/* Equipment specific: show status and current usage when table is EQUIPMENT */}
      {tableName && tableName.toUpperCase() === 'EQUIPMENT' && (
        <EquipmentUsage
          eid={selected ? selected[Object.keys(schema)[0]] : ''}
          fetchStatus={getEquipmentStatus}
          fetchUsage={listEquipmentUsage}
        />
      )}

      {/* Insert Modal */}
      {/* Only render CRUD modals for non read-only tables */}
      {!isReadOnly && (
        <>
          <CRUDModal
            isOpen={insertModal.isOpen}
            onClose={insertModal.onClose}
            schema={schema}
            initialValues={{}}
            title={`Insert into ${tableName}`}
            onSubmit={handleCreate}
            validationSchema={getValidationSchema(tableName)}
          />

          <CRUDModal
            isOpen={editModal.isOpen}
            onClose={editModal.onClose}
            schema={schema}
            initialValues={selected || {}}
            title={`Update ${tableName}`}
            onSubmit={handleUpdate}
            validationSchema={getValidationSchema(tableName)}
          />
        </>
      )}
    </Box>
  )
}
