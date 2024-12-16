const CatalogSkeleton = ({ count = 9 }: { count: number }) => {
  return (
    <div className="bg-[#EDEDED] py-5 sm:p-2  flex-1 flex flex-col justify-between">
      <div className="grid grid-cols-block gap-6 py-5">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-200 rounded-md px-5 flex flex-col justify-between py-8 h-[420px] md:h-auto max-w-[319px] w-full md:max-w-full md:w-full "
          >
            <div className="h-[200px] bg-gray-300 rounded-md mb-4"></div>
            <div className="h-5 bg-gray-300 rounded-md mb-2"></div>
            <div className="h-5 bg-gray-300 rounded-md w-2/3 mb-4"></div>
            <div className="h-10 bg-gray-300 rounded-md w-full mt-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogSkeleton;
