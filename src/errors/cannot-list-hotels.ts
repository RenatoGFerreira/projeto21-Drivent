import { ApplicationError } from '@/protocols';

export function cannotListHotelsError(): ApplicationError {
  return {
    name: 'CannotListError',
    message: 'Cannot list hotels!',
  };
}
