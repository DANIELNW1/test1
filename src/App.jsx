import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceDot,
  Label
} from 'recharts';

export default function Koden_19042025() {
  const [bruttolon, setBruttolon] = useState(45000);
  const [resultat, setResultat] = useState(0);
  const toolRef = useRef(null);

  // Constants
  const amBidrag = 8;
  const kommuneskat = 25;
  const atp = 99;
  const personfradrag = 4300;
  const andreFradrag = 4875;
  const topskatGraense = 46800;
  const topskatProcent = 0.15;

  // Calculate nettoløn
  useEffect(() => {
    const amBelob = (bruttolon * amBidrag) / 100;
    const efterAm = bruttolon - amBelob;
    const fradrag = personfradrag + andreFradrag;
    const skattepligtigIndkomst = Math.max(0, efterAm - fradrag);

    const bundskat = (skattepligtigIndkomst * kommuneskat) / 100;
    const topskat = Math.max(0, skattepligtigIndkomst - topskatGraense) * topskatProcent;
    const netto = Math.max(0, efterAm - bundskat - topskat - (bruttolon > 0 ? atp : 0));

    setResultat(Math.round(netto));
  }, [bruttolon]);

  const arslon = bruttolon * 12;
  const amBelob = (bruttolon * amBidrag) / 100;
  const efterAm = bruttolon - amBelob;
  const fradrag = personfradrag + andreFradrag;
  const skattepligtigIndkomst = Math.max(0, efterAm - fradrag);

  const currentBundskat = (skattepligtigIndkomst * kommuneskat) / 100;
  const currentTopskat = Math.max(0, skattepligtigIndkomst - topskatGraense) * topskatProcent;
  const currentSkatIAlt = currentBundskat + currentTopskat + amBelob;
  const currentSkatteProcent = bruttolon > 0 ? ((1 - resultat / bruttolon) * 100).toFixed(1) : "0.0";

  const staticValues = [20000, 30000, 40000, 50000, 60000, 70000, 80000];
  const staticData = staticValues.map(gross => {
    const amBelob = (gross * amBidrag) / 100;
    const efterAm = gross - amBelob;
    const fradrag = personfradrag + andreFradrag;
    const skattepligtigIndkomst = Math.max(0, efterAm - fradrag);
    const bundskat = (skattepligtigIndkomst * kommuneskat) / 100;
    const topskat = Math.max(0, skattepligtigIndkomst - topskatGraense) * topskatProcent;
    const netto = Math.max(0, efterAm - bundskat - topskat - (gross > 0 ? atp : 0));
    return { gross, netto };
  });

  const allX = staticData.map(d => d.netto).concat(resultat);
  const minX = 20000;
  const maxX = 40000;
  const xTicks = [20000, 25000, 30000, 35000, 40000];

  const allY = staticData.map(d => d.gross).concat(bruttolon);
  const minY = 20000;
  const maxY = 80000;
  const yTicks = [20000, 30000, 40000, 50000, 60000, 70000, 80000];

  return (
    <>
      <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-blue-500 text-white px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Velkommen til Min Økonomi</h1>
        <p className="text-xl mb-8 max-w-2xl">
          Få overblik over din løn, skat og økonomi med vores interaktive værktøjer.
        </p>
        <button
          onClick={() => toolRef.current.scrollIntoView({ behavior: 'smooth' })}
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-md hover:bg-gray-100 transition"
        >
          Se Lønberegneren
        </button>
      </section>
    </>
  );
}