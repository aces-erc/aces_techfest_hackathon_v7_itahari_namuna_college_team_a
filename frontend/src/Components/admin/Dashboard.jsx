import ProgressBar from "../dashboard/common/ProgressBar"

const Dashboard = () => {


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
            <div className="flex shadow-xl h-[calc(100vh-10rem)] w-[40%]">
                user info
            </div>
            <div className="flex gap-4 h-[calc(100vh-10rem)] flex-col w-[60%]">
                <div className="flex flex-col justify-between shadow-xl h-1/2 p-4 ">
                    <ProgressBar start={0} end={100000} current={20000} />
                    <div className="bg-black w-full h-[0.1rem] opacity-40"></div>
                    <ProgressBar start={'2024/02/20'} end={'2025/02/20'} current={Date.now()} type='date' />
                </div>
                <div className="gap-4 flex w-full h-1/2">
                    <div className="shadow-xl w-1/2">
                        latest Consultation
                    </div>
                    <div className="shadow-xl w-1/2">
                        medical record
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard