import { IssueStatusBadge } from '../components'
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Link } from "../components";
import { Table } from '@radix-ui/themes'
import { Issue, Status } from '@prisma/client';


export interface issueQuery {
        status: Status, 
        orderBy: keyof Issue, 
        page: string ,
}

interface Props {
    searchParams: Promise<issueQuery>,
    issues: Issue[]
  }

const IssueTable = async ({searchParams, issues}: Props) => {

    const params = await searchParams;
    const status = params.status;
      
  return (
    <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map(column => 
            <Table.ColumnHeaderCell key={column.value} className={column.className}>
              <NextLink href={{
                query: { ...params, orderBy: column.value }
              }}>{column.label}</NextLink>
              {column.value === params.orderBy && <ArrowUpIcon className='inline'/>}
            </Table.ColumnHeaderCell>)}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>
                    {issue.tittle}
                  </Link>
                  <div className='block md:hidden'>
                    <IssueStatusBadge status={issue.status}/>
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <IssueStatusBadge status={issue.status}/>  
                </Table.Cell> 
                <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>           
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
  )
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'tittle' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ]

export const columnNames = columns.map(column => column.value)

export default IssueTable