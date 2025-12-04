import { z } from 'zod'
import { schemas } from './schema'

// Build zod schemas from our lightweight schema definitions.
// This is a simple mapping to provide basic client-side validation.
export const validationSchemas = {
  LAB_MEMBER: z.object({
    MID: z.number().optional(),
    NAME: z.string().min(1, 'Name is required'),
    MTYPE: z.string().optional(),
    JOINDATE: z.string().optional()
  }),

  PROJECT: z.object({
    PID: z.number().optional(),
    TITLE: z.string().min(1, 'Title is required'),
    START_DATE: z.string().optional(),
    END_DATE: z.string().optional(),
    EXP_DURATION: z.string().optional()
  }),

  GRANT: z.object({
    GID: z.number().optional(),
    AMOUNT: z.number().optional(),
    SOURCE: z.string().optional(),
    YEAR: z.number().optional(),
    DURATION: z.string().optional()
  }),

  EQUIPMENT: z.object({
    EID: z.number().optional(),
    ENAME: z.string().optional(),
    ETYPE: z.string().optional(),
    STATUS: z.string().optional(),
    PDATE: z.string().optional()
  }),

  PUBLICATION: z.object({
    PUBID: z.number().optional(),
    TITLE: z.string().min(1, 'Title is required'),
    VENUE: z.string().optional(),
    PUBDATE: z.string().optional(),
    DOI: z.string().optional()
  }),

  STUDENT: z.object({
    SID: z.number().optional(),
    NAME: z.string().min(1, 'Name is required'),
    MAJOR: z.string().optional(),
    LEVEL: z.string().optional()
  }),

  FACULTY: z.object({
    FID: z.number().optional(),
    NAME: z.string().optional(),
    DEPT: z.string().optional()
  }),

  COLLABORATOR: z.object({
    CID: z.number().optional(),
    NAME: z.string().optional(),
    AFFILIATION: z.string().optional(),
    BIOGRAPHY: z.string().optional()
  })
}

// Fallback getter
export function getValidationSchema(tableName) {
  return validationSchemas[tableName] || z.object({})
}
