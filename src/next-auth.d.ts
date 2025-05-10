import { Member } from "@/types";
import { User } from "next-auth";

export type ExtendedUser = Omit<Member, "account">;

declare module "next-auth" {
  interface Session {
    user: Member & User;
  }
}
