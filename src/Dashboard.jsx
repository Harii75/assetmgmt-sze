import Header from "./Header";
import Greeting from "./Greeting";
import MainButtons from "./MainButtons";
import Statistics from "./Statistics";
import RecentlyAdded from "./RecentlyAdded";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Header />
      <Greeting />
      <MainButtons />
      <Statistics />
      <RecentlyAdded />
    </div>
  );
};

export default Dashboard;
