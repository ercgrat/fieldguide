import { db } from 'db';
import { Command } from './Command';

type UnwrapTuple<Tuple extends readonly Command<unknown>[]> = {
  [K in keyof Tuple]: Tuple[K] extends Command<infer X> ? X : never;
};

export class SequentialTransaction<TCommands extends Command<unknown>[]> {
  constructor(private commands: TCommands) {
    this.commands = commands;
  }

  public execute(): Promise<UnwrapTuple<TCommands>> {
    return db.$transaction(this.commands.map(command => command.execute())) as Promise<
      UnwrapTuple<TCommands>
    >;
  }
}
