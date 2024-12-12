import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import BotImg from '../../images/bot.png'
import Topbar from "./Topbar";

const AdminMain = () => {
  return (
    <div className="flex">
      <div className="h-[100vh] w-[18%] ">
        <AdminSidebar />
      </div>
      <div className="w-[82%] flex flex-col bg-[#F1F5F9]">
        <Topbar />
        <div className="h-[calc(100vh - 5rem)] relative ml-2 p-4">
          {/* <div className="rounded-full w-40 h-40 shadow-2xl animate-bounce absolute bottom-0 right-20 flex flex-col justify-center items-center cursor-pointer bg-white">
            <h6>Ask AroGen for help</h6>
            <div className="h-12 w-12 bg-blue-700 rounded-full ">
              <img className="h-full w-full" src={BotImg} alt="" />
            </div>
            <span className="font-bold text-sm">AroGen AI</span>
          </div> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
