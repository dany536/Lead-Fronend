import React from 'react';

const CardDataStats = ({
  title,
  total
}) => {
  return (
    <div className="rounded border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-xl font-bold text-left text-black dark:text-white">
            {total}
          </h3>
          <span className="text-md font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
