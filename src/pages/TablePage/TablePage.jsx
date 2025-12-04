import React from 'react'
import { useParams } from 'react-router-dom'
import TableView from '../../components/TableView/TableView'
import LabMember from '../LabMember/LabMember'
import ProjectPage from '../Project/ProjectPage'
import PublicationPage from '../Publication/PublicationPage'

/**
 * TablePage: wrapper that reads the tableName param and renders TableView
 */
export default function TablePage() {
  const { tableName } = useParams()

  // If the user navigates to LAB_MEMBER, render the custom LabMember page
  if (tableName && tableName.toUpperCase() === 'LAB_MEMBER') {
    return <LabMember />
  }

  if (tableName && tableName.toUpperCase() === 'PROJECT') {
    return <ProjectPage />
  }

  if (tableName && tableName.toUpperCase() === 'PUBLICATION') {
    return <PublicationPage />
  }

  return (
    <div>
      <TableView tableName={tableName} />
    </div>
  )
}
