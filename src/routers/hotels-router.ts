import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotels, getHotelsWithRooms } from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('hotels', getHotels).get('/hotels/:id', getHotelsWithRooms);

export { hotelsRouter };
