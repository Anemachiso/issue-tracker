import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { delayUntilRuntimeStage } from "next/dist/server/app-render/dynamic-rendering";
import { NextRequest, NextResponse } from "next/server";
import { safeParse } from "zod";
import delay from 'delay';


export async function PATCH(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.issues, {status: 400});

    const issue = await prisma.issue.findUnique({
        where: { id: Number(id) }
    });

    if (!issue)
        return NextResponse.json({error: "invalid issue"}, {status: 404});

    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data: {
            tittle: body.tittle,
            description: body.description
        }
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }) {

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