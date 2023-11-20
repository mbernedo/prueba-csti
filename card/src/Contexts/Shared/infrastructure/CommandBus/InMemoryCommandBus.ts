import { CommandBus } from "../../domain/CommandBus";
import { CommandHandlersInformation } from "./CommandHandlersInformation";
import { Command } from "../../domain/Command";


export class InMemoryCommandBus implements CommandBus {
  // eslint-disable-next-line no-useless-constructor
  constructor(private commandHandlersInformation: CommandHandlersInformation) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlersInformation.search(command);

    await handler.handle(command);
  }
}
