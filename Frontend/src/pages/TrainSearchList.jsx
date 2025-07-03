import { useLocation, useNavigate } from 'react-router-dom';

const TrainSearchList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, fromStation, toStation, date } = location.state || {};

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-red-500 text-lg">No data received.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium"
      >
        ← Back
      </button>

      <h1 className="text-md sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-center">
        Trains: <span className="text-orange-400">{fromStation?.label}</span> →{" "}
        <span className="text-orange-400">{toStation?.label}</span> on{" "}
        <span className="text-orange-400">{date}</span>
      </h1>

      <div className="md:max-w-[90%] mx-auto">
        {(data.data || []).map((train, i) => (
          <div
            key={i}
            className="bg-gray-800 mb-4 p-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition"
          >
            <div className="flex items-center flex-wrap gap-y-3 gap-x-2 justify-between mb-3">
              <h2 className="text-md sm:text-xl font-semibold mr-10">
                {train.train_name}{" "}
                <span className="text-gray-400">({train.train_number})</span>
              </h2>
              <div className='flex items-center gap-x-2'>
                <p className='text-xs border border-gray-500 p-[1px]'>4★</p>
                <p className="flex text-sm underline gap-x-2 text-gray-400">
                  {train.run_days.map((day, index) => (
                    <span key={index}> {day}</span>
                  ))}
                </p>
              </div>
            </div>
            <div className="flex mb-1">
              <p className="text-md text-gray-200">
                {train.from_std} {train.from} ----{" "}
                <span className="text-xs">{train.duration} hr</span> ----{" "}
                {train.to_std} {train.to}{" "}
              </p>
            </div>

              <div className="mt-2 pt-2 border-t border-gray-700">
                <p className="text-sm text-gray-300 mb-3">Fare:</p>
                <div className="flex justify-start flex-wrap gap-x-8 gap-y-2">
                  {train.class_type.map((classType, index) => {
                    return (
                      <button
                        key={index}
                        className="text-sm text-gray-400 border border-orange-500 rounded-lg p-1 min-w-[100px] text-center hover:bg-gray-500 hover:text-white transition duration-200"
                      >
                        <p>{classType}</p>
                        <p>AVL - {train.score}</p>
                        <span className="font-semibold text-orange-400">
                          ₹{train.distance}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            {/* {train.curr_sa_title && (
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainSearchList;
