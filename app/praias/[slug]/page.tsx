import { BeachDetails } from "../../components/BeachDetails";
import { ProductShell } from "../../components/ProductShell";
import { beaches, featuredBeach } from "../../lib/beaches";

export default async function BeachPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const beach = beaches.find((item) => item.slug === slug) ?? featuredBeach;
  return <ProductShell active="Hoje" eyebrow="Salvador · previsão modelada" title={beach.name}><BeachDetails beach={beach} /><aside className="product-ad"><span><small>Espaço parceiro</small><strong>Anuncie aqui. Fortaleça o movimento surf.</strong></span><p>Conecte sua marca à comunidade que vive o mar.</p><a href="mailto:anuncie@quipraia.com">Quero anunciar</a></aside></ProductShell>;
}
