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
        <div className='h-full p-10 flex w-full my-border'>
            <div className="flex w-1/2 my-border">
                user info
            </div>
            <div className="flex flex-col w-1/2">
                <div className="my-border">
                    progress bar
                </div>
                <div className="flex w-full">
                    <div className="my-border">
                        latest Consultation
                    </div>
                    <div className="my-border">
                        medical record
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard