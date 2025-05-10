import { auth } from "@/auth";
import { LogoutButton } from "@/components/common/LogoutButton";
import { getDictionary } from "@/utils";

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const session = await auth();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">{dictionary.common.welcome}</h2>
        <span>{session?.user?.name}</span>
        <span>{session?.user?.email}</span>
      </div>
      <LogoutButton label={dictionary.auth.logout} />
    </div>
  );
}
