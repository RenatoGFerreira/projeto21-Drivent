import { TicketStatus } from '@prisma/client';
import { enrollmentRepository } from '@/repositories/enrollments-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { notFoundError } from '@/errors';
import { CreateTicketParams } from '@/protocols';

async function getTicketTypes() {
  const ticketTypes = await ticketsRepository.findTicketsTypes();
  return ticketTypes;
}

async function getTicketByUserId(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findTicketsByENrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }
  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticketData: CreateTicketParams = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  await ticketsRepository.createTicket(ticketData);
  const ticket = await ticketsRepository.findTicketsByENrollmentId(enrollment.id);
  return ticket;
}

const ticketService = {
  getTicketTypes,
  getTicketByUserId,
  createTicket,
};

export default ticketService;
