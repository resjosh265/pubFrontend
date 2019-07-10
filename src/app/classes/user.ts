import { Time } from '@angular/common';

export interface User {
    UserId: string;
    FirstName: string;
    LastName: string;
    IsAdmin: boolean;
    WeeklyBudget?: number;
    DefaultServingSize?: number;
    MembershipTier?: number;
    SubscriptionDate?: Time;
    CreateDate?: Time;
    LastModified?: Time;
}
