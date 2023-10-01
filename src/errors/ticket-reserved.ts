import { ApplicationError } from '@/protocols';

export function ticketReserved(): ApplicationError {
  return {
    name: 'ticket reserved',
    message: 'The ticket is reserved',
  };
}
