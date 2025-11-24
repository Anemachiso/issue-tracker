import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation';
import React from 'react'


const IssueDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;

    const issue = await prisma.issue.findUnique({
        where: { id: Number(id) }
    });

    if(!issue)
        notFound();

    return (
        <div>
            <p>{issue.tittle}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </div>
    )
}

export default IssueDetailPage