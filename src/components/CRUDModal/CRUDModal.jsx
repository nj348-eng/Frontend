import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast
} from '@chakra-ui/react'
import FormGenerator from '../FormGenerator/FormGenerator'

/**
 * CRUDModal: reusable modal for Create / Update operations.
 * - isOpen, onClose: modal control
 * - schema: fields definition
 * - initialValues: object for edit
 * - onSubmit: called with form values
 */
export default function CRUDModal({ isOpen, onClose, schema, initialValues = {}, onSubmit, title = 'Edit', validationSchema }) {
  const [values, setValues] = useState({})
  const toast = useToast()

  useEffect(() => {
    // initialize form values with schema keys
    const init = {}
    Object.keys(schema).forEach((k) => {
      init[k] = initialValues[k] ?? ''
    })
    setValues(init)
  }, [schema, initialValues, isOpen])

  function handleChange(field, val) {
    setValues((s) => ({ ...s, [field]: val }))
  }

  async function submit() {
    try {
      // If a zod validation schema is provided validate before submitting
      if (validationSchema) {
        const parsed = validationSchema.safeParse(values)
        if (!parsed.success) {
          const first = parsed.error.errors[0]
          throw new Error(first.message || 'Validation error')
        }
      }

      await onSubmit(values)
      toast({ title: 'Success', status: 'success', duration: 2000 })
      onClose()
    } catch (err) {
      toast({ title: 'Error', description: err.message || String(err), status: 'error', duration: 4000 })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormGenerator schema={schema} values={values} onChange={handleChange} />
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>Cancel</Button>
          <Button colorScheme="blue" onClick={submit}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
