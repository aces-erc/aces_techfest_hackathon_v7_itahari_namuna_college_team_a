import React, { useEffect, useState } from "react";
import { FaCalendarDay } from "react-icons/fa6";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { MdCalendarMonth } from "react-icons/md";
import axios from "axios";

const Transaction = () => {
  const [data, setData] = useState([]);
  console.log(data);

  const fetchData = async () => {
    await axios
      .get("http://localhost:8800/api/users/transaction")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-10 flex flex-col gap-3">
      <div className="flex gap-16">
        <div className="w-1/3 h-48 shadow-lg bg-white p-8 flex flex-col justify-center items-center gap-2">
          <div className="rounded-full w-16 h-16 bg-[#F1F5F9] grid place-items-center text-[2.4rem]">
            <FaCalendarDay />
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-2xl font-bold text-primary">Rs. 45551</span>
            <span>Weekly Transaction</span>
          </div>
        </div>
        <div className="w-1/3 h-48 shadow-lg bg-white p-8 flex flex-col justify-center items-center gap-2">
          <div className="rounded-full w-16 h-16 bg-[#F1F5F9] grid place-items-center text-[2.4rem]">
            <BsCalendar2WeekFill />
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-2xl font-bold text-primary">Rs. 2394948</span>
            <span>Weekly Transaction</span>
          </div>
        </div>
        <div className="w-1/3 h-48 shadow-lg bg-white p-8 flex flex-col justify-center items-center gap-2">
          <div className="rounded-full w-16 h-16 bg-[#F1F5F9] grid place-items-center text-[2.4rem]">
            <MdCalendarMonth />
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-2xl font-bold text-primary">Rs 3000056</span>
            <span>Monthly Transaction</span>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-primary ml-3">Transaction List</h2>
        <table className="min-w-full text-left text-sm font-light mt-6">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">#</th>
              <th scope="col" className="px-6 py-4">Product Name</th>
              <th scope="col" className="px-6 py-4">Category</th>
              <th scope="col" className="px-6 py-4">Transaction Amount</th>
              <th scope="col" className="px-6 py-4">Image</th>
              <th scope="col" className="px-6 py-4">Buyer Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index} className="border-b transition duration-300 ease-in-out">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                  <td className="whitespace-nowrap px-6 py-4">{item.pname}</td> {/* Access item here */}
                  <td className="whitespace-nowrap px-6 py-4">{item.type}</td> {/* Access item here */}
                  <td className="whitespace-nowrap px-6 py-4">{item.price}</td> {/* Access item here */}
                  <td className="whitespace-nowrap px-6 py-4">
                    {/* {item.images.map((image, imgIndex) => (
                      <img key={imgIndex} src={`http://localhost:8000/${image}`} alt="Product" className="w-10 h-10" /> // Render images as needed
                    ))} */}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{item.buyer_name}</td> {/* Access item here */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
