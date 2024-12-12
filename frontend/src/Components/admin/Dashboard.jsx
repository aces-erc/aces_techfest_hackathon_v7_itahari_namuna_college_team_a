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
                <div className="shadow-xl h-1/2">
                    progress bar
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