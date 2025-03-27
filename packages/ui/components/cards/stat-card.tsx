import type { LucideIcon } from 'lucide-react';
import React, { type JSX } from 'react';

type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon;
};

type StatCardProps = {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
};

const StatCard = ({
  title,
  primaryIcon,
  details,
  dateRange,
}: StatCardProps) => {
  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? '+' : '';
    return `${signal}${value.toFixed(1)}%`;
  };

  const getChangeColor = (value: number) =>
    value >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="col-span-1 flex flex-col justify-between rounded-2xl bg-white shadow-md md:row-span-1 xl:row-span-2">
      {/* HEADER */}
      <div>
        <div className="mb-2 flex items-center justify-between px-5 pt-4">
          <h2 className="font-semibold text-gray-700 text-lg">{title}</h2>
          <span className="rounded-full bg-gray-50 px-2 py-1 text-gray-400 text-xs">
            {dateRange}
          </span>
        </div>
        <hr className="border-gray-100" />
      </div>

      {/* BODY */}
      <div className="mb-6 flex items-center justify-around gap-4 px-5">
        <div className="rounded-full border-[1px] border-blue-200 bg-blue-50 p-5 shadow-sm">
          {primaryIcon}
        </div>
        <div className="flex-1">
          {details.map((detail, index) => (
            <React.Fragment key={detail.title}>
              <div className="my-4 flex items-center justify-between">
                <span className="font-medium text-gray-500">
                  {detail.title}
                </span>
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text font-bold text-gray-800 text-transparent">
                  {detail.amount}
                </span>
                <div className="flex items-center rounded-full bg-gray-50 px-2 py-1">
                  <detail.IconComponent
                    className={`mr-1 h-4 w-4 ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  />

                  <span
                    className={`font-medium ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  >
                    {formatPercentage(detail.changePercentage)}
                  </span>
                </div>
              </div>
              {index < details.length - 1 && <hr className="border-gray-100" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
