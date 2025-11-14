import BettingGrid from "@/components/elements/BettingGrid";

import { useBettingGridContext } from "@/contexts/BettingGridContext";

const BettingContainer = () => {
  const bettingGrid = useBettingGridContext();
  
  return (
    <section className="grid grid-cols-3 gap-1 w-full p-1 bg-text-primary rounded-2xl max-w-100 betting-container">
      {bettingGrid.grid.map((item) => (
        <BettingGrid
          key={item.betNumber}
          betNumber={item.betNumber}
          color={item.color}
          seleted={item.selected}
          dim={item.dim}
          onClick={() => bettingGrid.toggleNumber(item.betNumber)}
        />
      ))}
    </section>
  );
}

export default BettingContainer;