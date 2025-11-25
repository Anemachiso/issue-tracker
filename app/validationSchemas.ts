import { z } from 'zod';

export const issueSchema = z.object({
    tittle: z.string().min(1).max(255),
    description: z.string().min(1)
});