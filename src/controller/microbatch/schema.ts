import { z } from 'zod';

export const MessageTypeSchema = z.object({
  id: z.number(),
  message: z.string(),
  body: z.object({
    data: z.string(),
  }),
});

export type MessageType = z.infer<typeof MessageTypeSchema>;
