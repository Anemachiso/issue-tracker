import { issueSchema } from "@/app/validationSchemas";
import { patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";


export async function PATCH(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }) {

    const session = await getServerSession(authOptions);

    if(!session)
       return NextResponse.json({}, {status: 401});

    const { id } = await params;
    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.issues, {status: 400});

    const {assignedToUserId, tittle, description} = body;

    if(assignedToUserId) {
        const user = await prisma.user.findUnique({where: {id: assignedToUserId}});
        if(!user)
            return NextResponse.json({error: "Invalid user"}, {status: 400});
    }

    const issue = await prisma.issue.findUnique({
        where: { id: Number(id) }
    });

    if (!issue)
        return NextResponse.json({error: "invalid issue"}, {status: 404});

    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data: {
            tittle,
            description,
            assignedToUserId
        }
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }) {

    const session = await getServerSession(authOptions);

    if(!session)
        return NextResponse.json({}, {status: 401});

    const { id } = await params;

    const issue = await prisma.issue.findUnique({
        where: { id: Number(id) }
    });

    if (!issue)
        return NextResponse.json({error: "invalid issue"}, {status: 404});
    
    await prisma.issue.delete({
        where: {id: issue.id}
    });

    return NextResponse.json({});
}