import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueFormWrapper from '../../_components/IssueFormWrapper';

const EditIssuePage = async ({ params }: { params: Promise<{ id: string }>}) => {
    const { id } = await params;

    const issue = await prisma.issue.findUnique({
        where: { id: Number(id) }
    });

    if(!issue)
        notFound();

  return (
    <IssueFormWrapper issue={issue}/>
  )
}

export default EditIssuePage