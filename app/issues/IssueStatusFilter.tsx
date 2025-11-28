'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const statuses: { label: string, value?: Status }[] = [
    {label: 'All'},
    {label: 'open', value: 'OPEN'},
    {label: 'In progress', value: 'IN_PROGRESS'},
    {label: 'closed', value: 'CLOSED'}
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
        <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
                {statuses.map(status => (
                    <Select.Item key={status.value || 'All'} value={status.value || 'All'}>
                        {status.label}
                    </Select.Item>)
                )}
            </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter