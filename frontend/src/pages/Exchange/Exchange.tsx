import { api } from "../../config/api";

const Exchange = () => {
  const handleMine = async () => {
    const response = await api.post("/wallet/mine");

    console.log(response.data);
  };
  return (
    <div className="w-full h-full text-center m-5">
      <button className="bg-primary text-white rounded p-4" onClick={handleMine}>
        Mine
      </button>
    </div>
  );
};

export default Exchange;
