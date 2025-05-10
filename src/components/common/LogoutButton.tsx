"use client";
import { useLogout } from "@/hooks/api/useLogout";
import { Button } from "../ui";

export const LogoutButton = ({ label }: { label: string }) => {
  const logOut = useLogout();
  return (
    <Button variant="destructive" onClick={logOut}>
      {label}
    </Button>
  );
};
