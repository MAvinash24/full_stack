import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function MathBlock({ formula, inline = false }: { formula: string, inline?: boolean }) {
  return (
    <div className="my-4 overflow-x-auto rounded-lg p-4 text-center text-lg transition-colors
      bg-gray-100 text-gray-900             /* Light Mode: Light Gray bg, Dark text */
      dark:bg-black/20 dark:text-white"     /* Dark Mode: Dark transparent bg, White text */
    >
      {inline ? <InlineMath math={formula} /> : <BlockMath math={formula} />}
    </div>
  );
}