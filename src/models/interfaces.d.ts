// TypeScript interfaces describing the database entities.
// This file is for developer reference and tooling; it does not affect runtime.

export interface LabMember {
  MID?: number
  NAME: string
  MTYPE?: string
  JOINDATE?: string
}

export interface Project {
  PID?: number
  TITLE: string
  START_DATE?: string
  END_DATE?: string
  EXP_DURATION?: string // expected project duration
}

export interface Grant {
  GID?: number
  AMOUNT?: number
  SOURCE?: string
  YEAR?: number
  DURATION?: string
}

export interface Equipment {
  EID?: number
  ENAME?: string
  ETYPE?: string
  STATUS?: string
  PDATE?: string
}

export interface Publication {
  PUBID?: number
  TITLE: string
  VENUE?: string
  PUBDATE?: string
  DOI?: string
}

export interface Student {
  SID?: number
  NAME: string
  MAJOR?: string
  LEVEL?: string // e.g., Undergraduate / Masters / PhD
}

export interface Faculty {
  FID?: number
  NAME?: string
  DEPT?: string
}

export interface Collaborator {
  CID?: number
  NAME?: string
  AFFILIATION?: string
  BIOGRAPHY?: string
}
