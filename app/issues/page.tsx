import React from 'react'
import { Table } from '@radix-ui/themes'
import { prisma } from '@/prisma/client'
import { Link, IssueStatusBadge } from "@/app/components";
import IssueActions from './IssueActions'
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';

interface Props {
  searchParams: Promise<{ status: Status, orderBy: keyof Issue }>
}

const IssuesPage = async ({ searchParams }: Props) => {
  // Await the searchParams Promise
  const params = await searchParams;
  const status = params.status;

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'tittle' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ]

  // Build the where clause conditionally
  const statuses = Object.values(Status);
  const checkStatus = statuses.includes(status)
    ? status
    : undefined;

  

  const issues = await prisma.issue.findMany({
    where: {status: checkStatus}
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map(column => 
            <Table.ColumnHeaderCell key={column.value}>
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
    </div>
  )
}

export default IssuesPage