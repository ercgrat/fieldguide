import { db } from 'db';
import { Command } from 'db/Command';

export default class GetUserCommand implements Command {
  constructor(private email: string) {}

  public execute() {
    return db.user.findFirst({
      where: {
        email: this.email
      }
    });
  }
}
