import React from 'react';

const CardDataStats = ({
  title,
  total
}) => {
  return (
    <div className="rounded-xl border p-5 shadow-default text-center">
      <div>
        <h3 className="text-xl font-bold text-black">
          {total}
        </h3>
        <span className="text-md font-medium">{title}</span>
      </div>
    </div>
  );
};

export default CardDataStats;
