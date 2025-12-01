import { prisma } from '@/prisma/client'
import IssueActions from './IssueActions'
import { Status } from '@prisma/client';
import Pagination from '../components/Pagination';
import IssueTable, { columnNames, issueQuery } from './IssueTable';
import { Flex } from '@radix-ui/themes';

interface Props {
  searchParams: Promise<issueQuery>,
}

const IssuesPage = async ({ searchParams }: Props) => {
  // Await the searchParams Promise
  const params = await searchParams;
  const status = params.status;


  // Build the where clause conditionally
  const statuses = Object.values(Status);
  const checkStatus = statuses.includes(status)
    ? status
    : undefined;

  const where = { status };

  const orderBy = columnNames
    .includes(params.orderBy as any)
      ? { [params.orderBy]: "asc" }
      : undefined;

  const page = parseInt((await searchParams).page) || 1;
  const pageSize = 10;
  

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
    });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues}/>
      <Pagination 
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  )
}

export default IssuesPage