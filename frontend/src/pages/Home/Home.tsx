import logoBot from "../../assets/logobot.png";

const Home = () => {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-10">
      <img src={logoBot} alt="funny bot" className="max-w-[500px] max-h-[500px] rounded-full"/>
    </div>
  );
};

export default Home;