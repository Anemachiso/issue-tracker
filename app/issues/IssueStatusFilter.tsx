'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const statuses: { label: string, value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' }
];

const IssueStatusFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState('ALL');
    
    // Sync with URL params
    useEffect(() => {
        const status = searchParams.get('status');
        if (status && ['OPEN', 'IN_PROGRESS', 'CLOSED'].includes(status)) {
            setValue(status);
        } else {
            setValue('');
        }
    }, [searchParams]);
    
    return (
        <Select.Root 
            value={value}
            onValueChange={(status) => {
                const params = new URLSearchParams();
                if(status) params.append('status', status);
                if(searchParams.get('orderBy'))
                    params.append('orderBy', searchParams.get('orderBy')!);
                let query = '';
                if(status && status !== 'ALL'){
                    query = '?' + params.toString()
                }

                router.push(`/issues${query}`);
                router.refresh(); // Force a refresh to update the data
            }}
        >
            <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
                {statuses.map(status => (
                    <Select.Item key={status.label} value={status.value || 'ALL'}>
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter