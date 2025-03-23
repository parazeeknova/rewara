import type React from 'react';

type RevenueCardProps = {
  title: string;
  subtitle: string;
  amount: string;
  description: string;
  className: string;
};

const RevenueCard: React.FC<RevenueCardProps> = ({
  title,
  subtitle,
  amount,
  description,
  className,
}) => {
  return (
    <div className={`w-auto rounded-2xl bg-white p-4 shadow-md ${className}`}>
      <h2 className="font-semibold text-3xl text-gray-900">{title}</h2>
      <p className="text-gray-500 text-sm">{subtitle}</p>
      <p className="mt-2 font-bold text-gray-900 text-lg">
        {amount}{' '}
        <span className="font-normal text-gray-500 text-sm">{description}</span>
      </p>
    </div>
  );
};

export default RevenueCard;
