import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany();
}

async function roomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  findHotels,
  roomsByHotelId,
};

export default hotelRepository;
