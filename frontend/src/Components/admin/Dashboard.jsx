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
        <div className='p-10 flex'>
            <div className="flex">
                user info
            </div>
            <div className="flex flex-col">
                <div className="">
                    progress bar
                </div>
                <div className="flex">
                    <div className="">
                        latest Consultation
                    </div>
                    <div className="">
                        medical record
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard