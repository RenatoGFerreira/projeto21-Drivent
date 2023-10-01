import { ApplicationError } from '@/protocols';

export function ticketHotel(): ApplicationError {
  return {
    name: 'ticket need Hotel',
    message: 'Need hotel ',
  };
}
