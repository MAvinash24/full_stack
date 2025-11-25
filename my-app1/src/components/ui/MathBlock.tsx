import { BlockMath, InlineMath } from "react-katex";

export default function MathBlock({ formula, inline = false }: { formula: string, inline?: boolean }) {
  return (
    <div className="my-4 overflow-x-auto rounded-lg bg-black/20 p-4 text-center text-lg text-white">
      {inline ? <InlineMath math={formula} /> : <BlockMath math={formula} />}
    </div>
  );
}