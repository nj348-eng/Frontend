import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

/**
 * getTable: Fetches all rows from a table.
 * @param {string} tableName
 */
export async function getTable(tableName) {
  try {
    const res = await api.get(`/${tableName}`)
    return res.data
  } catch (err) {
    // Re-throw with friendly message
    throw new Error(err.response?.data?.message || err.message || 'Failed to fetch table')
  }
}

/**
 * createRow: POST new row to table
 */
export async function createRow(tableName, payload) {
  try {
    const res = await api.post(`/${tableName}`, payload)
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || 'Failed to create row')
  }
}

/**
 * updateRow: PUT to update row by id
 */
export async function updateRow(tableName, id, payload) {
  try {
    const res = await api.put(`/${tableName}/${id}`, payload)
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || 'Failed to update row')
  }
}

/**
 * deleteRow: DELETE row by id
 */
export async function deleteRow(tableName, id) {
  try {
    const res = await api.delete(`/${tableName}/${id}`)
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || 'Failed to delete row')
  }
}

export default api

// Equipment specific services
/**
 * Fetch equipment status by EID
 * GET /equipment/status/:eid
 */
export async function getEquipmentStatus(eid) {
  try {
    const res = await api.get(`/equipment/status/${encodeURIComponent(eid)}`)
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || 'Failed to fetch equipment status')
  }
}

/**
 * List equipment usage: members using the equipment and their projects
 * GET /equipment/usage/:eid
 */
export async function listEquipmentUsage(eid) {
  try {
    const res = await api.get(`/equipment/usage/${encodeURIComponent(eid)}`)
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || 'Failed to fetch equipment usage')
  }
}

// Lab member specific services
/**
 * List members who worked on projects funded by a specific grant.
 * GET /lab_member/grant/:gid
 */
export async function listMembersOnGrant(gid) {
  try {
    const res = await api.get(`/lab_member/grant/${encodeURIComponent(gid)}`)
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || 'Failed to fetch members on grant-funded projects')
  }
}

/**
 * Get mentorship relations for members on a project
 * GET /lab_member/mentorship/:pid
 */
export async function getMentorshipRelations(pid) {
  try {
    const res = await api.get(`/lab_member/mentorship/${encodeURIComponent(pid)}`)
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || 'Failed to fetch mentorship relations')
  }
}

/**
 * Get members with highest number of publications
 * GET /lab_member/top-publications
 */
export async function getMembersWithHighestPublications() {
  try {
    const res = await api.get(`/lab_member/top-publications`)
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || 'Failed to fetch top publishing members')
  }
}

// Project specific services
/**
 * Fetch project status by PID
 * GET /project/status/:pid
 */
export async function getProjectStatus(pid) {
  try {
    const res = await api.get(`/project/status/${encodeURIComponent(pid)}`)
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || 'Failed to fetch project status')
  }
}

/**
 * List or count projects funded by a grant and active during a time period
 * Expected backend endpoint: GET /project/list?gid=...&start=...&end=...
 * If backend returns an array, length is used; if number, the number is used.
 */
export async function listProjectsFundedAndActive(gid, startDate, endDate) {
  try {
    const params = new URLSearchParams()
    if (gid !== undefined) params.append('gid', gid)
    if (startDate) params.append('start', startDate)
    if (endDate) params.append('end', endDate)

    const res = await api.get(`/project/list?${params.toString()}`)
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || 'Failed to fetch projects list')
  }
}

/**
 * Get number of publications per major
 * Calls backend service that returns { success, data: [ { major, count } ], message }
 */
export async function getNumberOfPublicationsPerMajor() {
  try {
    const res = await api.get('/publication/number-of-publications')
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || 'Failed to fetch publications per major')
  }
}

