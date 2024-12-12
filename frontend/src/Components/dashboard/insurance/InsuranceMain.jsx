import { Outlet } from "react-router-dom";
import InsuranceSidebar from "./InsuranceSidebar";
import InsuranceTopbar from "./InsuranceTopbar";

const InsuranceMain = () => {
    return (
        <div className="flex">
            <div className="h-[100vh] w-[18%] ">
                <InsuranceSidebar />
            </div>
            <div className="w-[82%] h-[100vh] flex flex-col bg-[#F1F5F9]">
                <InsuranceTopbar />
                <div className="h-[calc(100vh - 5rem)] relative ml-2 p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default InsuranceMain;
