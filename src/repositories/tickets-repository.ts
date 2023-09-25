import { prisma } from '@/config';
import { CreateTicketParams } from '@/protocols';

function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

function findTicketsByENrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

function createTicket(ticket: CreateTicketParams) {
  return prisma.ticket.create({
    data: ticket,
  });
}

function findTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
  });
}

const ticketsRepository = {
  findTicketById,
  findTicketsTypes,
  findTicketsByENrollmentId,
  createTicket,
};

export default ticketsRepository;
