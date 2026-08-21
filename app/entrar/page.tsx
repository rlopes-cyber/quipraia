import { AuthScreen } from "../components/AuthScreen";
import { authMessageFromCode } from "../lib/auth-paths";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ erro?: string; status?: string }> }) {
  const params = await searchParams;
  return <AuthScreen mode="login" initialMessage={authMessageFromCode(params.erro ?? params.status ?? null)} />;
}
