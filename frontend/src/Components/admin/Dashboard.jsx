import ProgressBar from "../dashboard/common/ProgressBar"
import MiniUserDetail from "./MiniUserDetail"

const Dashboard = () => {
    const data = [
        {
            "id": 1,
            "name": "John Doe",
            "hospital": 'Noble teaching hospital',
            "expensis": 10000
        },
        {
            "id": 2,
            "name": "John Doe",
            "hospital": 'B.P. koirala hospital',
            "expensis": 2000
        },
        {
            "id": 3,
            "name": "John Doe",
            "hospital": 'Noble teaching hospital',
            "expensis": 5000
        },
    ]

    //   const fetchData = async () => {
    //     await axios
    //       .get("http://localhost:8800/api/users/find")
    //       .then((res) => {
    //         setData(res.data);
    //         console.log(res.data);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   };




    return (
        <div className='h-full gap-4 flex w-full'>
            <div className="flex flex-col shadow-xl h-[calc(100vh-10rem)] w-[40%] p-4">
                <h3 className="font-bold text-lg">User Detail</h3>
                <MiniUserDetail />
            </div>
            <div className="flex gap-4 h-[calc(100vh-10rem)] flex-col w-[60%]">
                <div className="flex flex-col justify-between shadow-xl h-1/2 p-4 ">
                    <ProgressBar start={0} end={100000} current={20000} />
                    <div className="bg-black w-full h-[0.1rem] opacity-40"></div>
                    <ProgressBar start={'2024/02/20'} end={'2025/02/20'} current={Date.now()} type='date' />
                </div>
                <div className="gap-4 flex w-full h-1/2">
                    <div className="shadow-xl w-1/2 p-2 overflow-y-scroll">
                        <h3 className="font-bold text-lg">Latest Consultation</h3>
                        <div className="bg-black w-full h-[0.1rem] opacity-40 mb-2"></div>
                        <div className="flex flex-col justify-center gap-2 ">
                            {
                                data.map((item, index) => {
                                    return (
                                        <div key={index} className="border-b-2 border-black flex gap-2 items-center justify-between">
                                            <div className="flex justify-start  w-[60%]">{item.hospital}</div>
                                            <div className="rounded-md my-grid bg-primary p-2 px-4">
                                                Rs. {item.expensis}
                                            </div>
                                        </div>
                                    )

                                })
                            }
                        </div>
                    </div>
                    <div className="shadow-xl w-1/2 p-2 overflow-y-scroll">
                        <h3 className="font-bold text-lg">Medical Record</h3>
                        <div className="flex h-[14rem] flex-col ">
                            <div className="flex justify-between border-b-2 border-black">
                                <span>B.P</span>
                                <span>Sugar</span>
                                <span>Updated At</span>
                            </div>
                            <div className="flex flex-col ">
                                <div className="flex justify-between items-center mt-2">
                                    <span>180/90 mmHg</span>
                                    <span>180 mg/dL</span>
                                    <div className="text-red-500 rounded-md my-grid bg-primary p-2 px-4">
                                        2024/02/20
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span>183/96 mmHg</span>
                                    <span>176 mg/dL</span>
                                    <div className="text-red-500 rounded-md my-grid bg-primary p-2 px-4">
                                        2024/03/01
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span>187/98 mmHg</span>
                                    <span>180 mg/dL</span>
                                    <div className="text-red-500 rounded-md my-grid bg-primary p-2 px-4">
                                        2024/03/23
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span>178/89 mmHg</span>
                                    <span>180 mg/dL</span>
                                    <div className="text-red-500 rounded-md my-grid bg-primary p-2 px-4">
                                        2024/04/19
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="w-full h-3"></div> */}
        </div>
    )
}

export default Dashboard