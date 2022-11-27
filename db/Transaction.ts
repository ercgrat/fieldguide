import { db } from 'db';
import { Command } from './Command';

type UnwrapPromise<P> = P extends Promise<infer R> ? R : P;
type UnwrapTuple<Tuple extends readonly Command<unknown>[]> = {
  [K in keyof Tuple]: UnwrapPromise<Tuple[K]['execute']>;
};

export class SequentialTransaction<TCommands extends readonly Command<unknown>[]> {
  constructor(private commands: [...TCommands]) {
    this.commands = commands;
  }

  public execute(): Promise<UnwrapTuple<TCommands>> {
    return db.$transaction(this.commands.map(command => command.execute())) as Promise<
      UnwrapTuple<TCommands>
    >;
  }
}
