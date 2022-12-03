/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { getSearchLayout } from "../components/layouts/SearchLayout";
import { useSerumMarkets } from "../hooks/useSerumMarkets";
import { classNames } from "../utils/general";
import { prettifyDecimal } from "../utils/numerical";

const Home = () => {
  const router = useRouter();
  const { network } = router.query;

  const { serumMarkets, loading: serumMarketsLoading } = useSerumMarkets();
  const StatBlock = ({
    children,
    loading,
    height,
  }: {
    children: React.ReactNode;
    loading: boolean;
    height?: number;
  }) => {
    return !loading || network ? (
      <div
        className={classNames(
          "bg-neutral-900 py-2 px-3 rounded-md space-y-1 border border-neutral-500"
        )}
      >
        {children}
      </div>
    ) : (
      <div
        className={classNames(
          "animate-pulse bg-neutral-900 py-2 px-3 rounded-md space-y-1 border border-neutral-700",
          height ? `h-${height}` : "h-20"
        )}
      />
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        <StatBlock loading={serumMarketsLoading}>
          <div>
            <p className="text-transparent bg-clip-text solapetext text-sm">
              # of markets
            </p>
          </div>
          {serumMarkets ? (
            <div>
              <p className="text-2xl font-medium text-white">
                {prettifyDecimal(serumMarkets!.length, 2)}
              </p>
            </div>
          ) : null}
          {serumMarketsLoading ? (
            <div className="bg-neutral-900 animate-pulse w-full h-8 rounded-lg" />
          ) : null}
        </StatBlock>
        {/* <StatBlock loading={loading}>
          <div>
            <p className="text-transparent bg-clip-text serum-gradient text-sm">
              TVL
            </p>
          </div>
          {!network ? (
            <div>
              <p className="text-2xl font-medium text-slate-200">
                {prettifyDecimal(stats?.tvl, 2)}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-slate-500">Unavailable</p>
            </div>
          )}
        </StatBlock>
        <StatBlock loading={loading}>
          <div>
            <p className="text-transparent bg-clip-text serum-gradient text-sm">
              Total Vol. 1d
            </p>
          </div>
          {!network ? (
            <div>
              <p className="text-2xl font-medium text-slate-200">
                {prettifyDecimal(stats?.totalVol1d, 2)}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-slate-500">Unavailable</p>
            </div>
          )}
        </StatBlock> */}
      </div>
    </div>
  );
};

Home.getLayout = (page: ReactNode) => getSearchLayout(page, "Home");

export default Home;
