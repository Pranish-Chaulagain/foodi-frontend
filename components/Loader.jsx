const Loader = () => {
  return (
    <div className="w-full h-screen absolute top-0 z-40">
      <div
        className="h-screen w-full bg-[#fffafc] flex items-center justify-center"
        id="pre-loader"
      >
        <div className="flex flex-col justify-center items-center">
          <img className="md:w-64 w-56" src="/loader.gif" alt="" />
          <p className="text-sm -mt-10 md:text-base font-medium mb-0">
            LOADING...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
