import { RecoveryScreen } from "../components/RecoveryScreen";

export default async function NewPasswordPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;
  return <RecoveryScreen mode="update" initialMessage={erro ? "O link não está mais válido. Solicite uma nova recuperação de senha." : ""} />;
}
