/**
 * schemas: Table definitions used to generate forms dynamically.
 * Type hints: "number" | "string" | "date" | "boolean"
 */
export const schemas = {
  LAB_MEMBER: {
    MID: 'number',
    NAME: 'string',
    MTYPE: 'string',
    JOINDATE: 'date'
  },
  PROJECT: {
    PID: 'number',
    TITLE: 'string',
    START_DATE: 'date',
    END_DATE: 'date',
    EXP_DURATION: 'string' // expected project duration
  },
  GRANT: {
    GID: 'number',
    AMOUNT: 'number',
    SOURCE: 'string',
    YEAR: 'number',
    DURATION: 'string' // duration of the grant
  },
  EQUIPMENT: {
    EID: 'number',
    ENAME: 'string',
    ETYPE: 'string',
    STATUS: 'string',
    PDATE: 'date'
  },
  PUBLICATION: {
    PUBID: 'number',
    TITLE: 'string',
    VENUE: 'string',
    PUBDATE: 'date',
    DOI: 'string'
  },
  STUDENT: {
    SID: 'number',
    NAME: 'string',
    MAJOR: 'string',
    LEVEL: 'string' // Undergraduate / Masters / PhD
  },
  FACULTY: {
    FID: 'number',
    NAME: 'string',
    DEPT: 'string'
  },
  COLLABORATOR: {
    CID: 'number',
    NAME: 'string',
    AFFILIATION: 'string'
    ,BIOGRAPHY: 'string'
  }
}
