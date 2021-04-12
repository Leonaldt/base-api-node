import { UsecaseError } from './usecase-error';

export class MailServiceError extends Error implements UsecaseError {
  constructor() {
    super('Mail service error.')
    this.name = 'MailServiceError'
  }
}
