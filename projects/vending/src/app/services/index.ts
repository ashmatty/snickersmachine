import { BankService } from './bank.service';
import { MessageService } from './message.service';
import { SupplyService } from './supply.service';

export const PROVIDERS = [BankService, MessageService, SupplyService];

export * from './bank.service';
export * from './message.service';
export * from './supply.service';
