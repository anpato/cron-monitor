import React from 'react'
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Button
} from 'react-md'
import StatusSnack from './StatusSnack'
import { RouteChildrenProps } from 'react-router-dom'

interface Jobs {
  headers: string[]
  data: any[]
}

interface iProps extends RouteChildrenProps<any> {
  jobs: Jobs
}

const JobTable: React.SFC<iProps> = (props: iProps) => {
  return (
    <DataTable plain>
      <TableHeader>
        <TableRow>
          {props.jobs.headers.map((header: string) => (
            <TableColumn key={header}>{header}</TableColumn>
          ))}
          <TableColumn>Edit</TableColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.jobs.data.map((job: any) => {
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
                <Button
                  icon
                  onClick={() =>
                    props.history.push({
                      pathname: `/jobs/edit/${job.id}`,
                      state: { job }
                    })
                  }
                >
                  build
                </Button>
              </TableColumn>
            </TableRow>
          )
        })}
      </TableBody>
    </DataTable>
  )
}

export default JobTable
