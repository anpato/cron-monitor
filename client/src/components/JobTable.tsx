import React from 'react'
import {
  AccessibleFakeButton,
  FontIcon,
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn
} from 'react-md'
import StatusSnack from './StatusSnack'

interface Jobs {
  headers: string[]
  data: any[]
}

interface iProps {
  jobs: Jobs
}

const JobTable = ({ jobs }: iProps) => {
  return (
    <DataTable plain>
      <TableHeader>
        <TableRow>
          {jobs.headers.map((header: string) => (
            <TableColumn key={header}>{header}</TableColumn>
          ))}
          <TableColumn>Edit</TableColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.data.map((job: any) => {
          // Get Job id here and pass to fake button
          return (
            <TableRow key={job.id}>
              <TableColumn>{job.id}</TableColumn>
              <TableColumn>{job.name}</TableColumn>
              <TableColumn>
                <StatusSnack status={job.status} />
              </TableColumn>
              <TableColumn>{job.expression}</TableColumn>
              <TableColumn>{job.runTime}</TableColumn>
              <TableColumn>
                <AccessibleFakeButton secondary="true">
                  <FontIcon>build</FontIcon>
                </AccessibleFakeButton>
              </TableColumn>
            </TableRow>
          )
        })}
      </TableBody>
    </DataTable>
  )
}

export default JobTable
