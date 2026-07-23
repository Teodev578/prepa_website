import { Metadata } from 'next';
import Cgv from "./_components/Cgv";

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente | Law Clean Center',
  description: 'Conditions générales de vente et de prestation de services de Law Clean Center.',
  alternates: { canonical: "https://lawcleancenter.com/cgv" },
  robots: {
    index: false,
    follow: true,
  }
};

export default function CgvPage() {
  return (
      <>
        <Cgv />
      </>
  );
}