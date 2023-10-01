import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { hotelsService } from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelsService.getHotels(userId);
    if (!hotels) return res.status(404).send('Not Found Hotels');

    return res.status(200).send(hotels);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}

export async function getHotelsWithRooms(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotelId = Number(req.params.hotelId);

  try {
    const hotel = await hotelsService.getHotelsWithRooms(userId, hotelId);
    console.log(hotel);
    return res.status(200).send(hotel);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'CannotListHotelsErrror') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

    return res.status(402).send('Sorry, ERROR 402');
  }
}
