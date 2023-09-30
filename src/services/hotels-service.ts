import { notFoundError } from '@/errors';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels';
import { enrollmentRepository, ticketsRepository } from '@/repositories';
import hotelRepository from '@/repositories/hotel-repository';

async function getHotels(userId: number) {
  await listHotels(userId);
  const hotels = await hotelRepository.findHotels();
  return hotels;
}

async function listHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === 'RESERVED' || !ticket.TicketType.includesHotel || ticket.TicketType.isRemote) {
    throw cannotListHotelsError();
  }
}

export const hotelsService = {
  getHotels,
};
