import { ApplicationError } from '@/protocols';

export function ticketRemote(): ApplicationError {
  return {
    name: 'ticket remote',
    message: 'The ticket is remote.',
  };
}
