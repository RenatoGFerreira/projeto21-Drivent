import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketSchema } from '@/schemas/ticket-schema';
import { createTicket, getTicket, getTicketTypes } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketTypes)
  .get('/', getTicket)
  .post('/', validateBody(ticketSchema), createTicket);

export { ticketsRouter };
