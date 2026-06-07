import { IsEnum } from 'class-validator';

export enum SubscriptionPlanDto {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  GOLD = 'GOLD',
}

export class ChangeSubscriptionDto {
  @IsEnum(SubscriptionPlanDto)
  plan!: SubscriptionPlanDto;
}
