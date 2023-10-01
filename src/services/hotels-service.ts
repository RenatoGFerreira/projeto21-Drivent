import { notFoundError } from '@/errors';
import { ticketHotel } from '@/errors/ticket-hotel';
import { ticketRemote } from '@/errors/ticket-remote';
import { ticketReserved } from '@/errors/ticket-reserved';
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

  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.status === 'RESERVED') throw ticketReserved();

  if (!ticket.TicketType.includesHotel) throw ticketHotel();

  if (ticket.TicketType.isRemote) throw ticketRemote();
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  await listHotels(userId);
  const hotel = await hotelRepository.roomsByHotelId(hotelId);
  if (!hotel) {
    throw notFoundError();
  }

  return hotel;
}

export const hotelsService = {
  getHotels,
  getHotelsWithRooms,
};
