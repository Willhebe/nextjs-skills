"use client";

import dynamic from "next/dynamic";

// AG Charts is fairly chunky, so only load it in the browser when the Stats page needs it.
// (ssr: false is only allowed inside a Client Component, hence this little wrapper file.)
const StatsChartsLazy = dynamic(() => import("./StatsCharts"), {
  ssr: false,
  loading: () => (
    <div className="grid h-96 place-items-center rounded-2xl bg-white text-stone-500 shadow-sm">
      Warming up the charts...
    </div>
  ),
});

export default StatsChartsLazy;
