import { Account } from "@prisma/client";

export type AuthType = {
  name: string;
  email: string;
  password: string;
};

export type Member = {
  id: number;
  name?: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  emailVerified?: Date;
  password: string;
  account?: Account;
  createdAt: Date;
  updatedAt: Date;
};
