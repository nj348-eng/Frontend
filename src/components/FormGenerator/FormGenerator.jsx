import React from 'react'
import { FormControl, FormLabel, Input, NumberInput, NumberInputField, Switch, Stack, Textarea, Select } from '@chakra-ui/react'

/**
 * FormGenerator: Generates form inputs based on schema definition.
 * - schema: { fieldName: type }
 * - values: current form values
 * - onChange: (field, value) => void
 */
export default function FormGenerator({ schema, values = {}, onChange }) {
  return (
    <Stack spacing={3}>
      {Object.entries(schema).map(([field, type]) => {
        const value = values[field] ?? ''

        if (type === 'number') {
          return (
            <FormControl key={field}>
              <FormLabel>{field}</FormLabel>
              <NumberInput value={value} onChange={(val) => onChange(field, val === '' ? '' : Number(val))}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
          )
        }

        if (type === 'date') {
          return (
            <FormControl key={field}>
              <FormLabel>{field}</FormLabel>
              <Input type="date" value={value} onChange={(e) => onChange(field, e.target.value)} />
            </FormControl>
          )
        }

        if (type === 'boolean') {
          return (
            <FormControl display="flex" alignItems="center" key={field}>
              <FormLabel mb="0">{field}</FormLabel>
              <Switch isChecked={!!value} onChange={(e) => onChange(field, e.target.checked)} />
            </FormControl>
          )
        }

        // Special handling for Level (render a select)
        if (field.toUpperCase() === 'LEVEL') {
          return (
            <FormControl key={field}>
              <FormLabel>{field}</FormLabel>
              <Select value={value} onChange={(e) => onChange(field, e.target.value)} placeholder="Select level">
                <option>Undergraduate</option>
                <option>Masters</option>
                <option>PhD</option>
              </Select>
            </FormControl>
          )
        }

        // Special handling for Biography (multi-line)
        if (field.toUpperCase() === 'BIOGRAPHY') {
          return (
            <FormControl key={field}>
              <FormLabel>{field}</FormLabel>
              <Textarea value={value} onChange={(e) => onChange(field, e.target.value)} />
            </FormControl>
          )
        }

        // default to string input
        return (
          <FormControl key={field}>
            <FormLabel>{field}</FormLabel>
            <Input value={value} onChange={(e) => onChange(field, e.target.value)} />
          </FormControl>
        )
      })}
    </Stack>
  )
}
