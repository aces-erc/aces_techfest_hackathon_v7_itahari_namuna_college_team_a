import React, { useContext } from 'react';
import { UserContext } from '../../../Context/authContext'; 
import { User, Mail, Phone, Calendar, MapPin } from 'lucide-react';

const UserInfoCard = () => {
  const { user } = useContext(UserContext);


  if (!user || user.role !== 'PATIENTS') {
    return <div className="text-center text-gray-500">No user info available</div>;
  }

  const { first_name, last_name, dob, gender, email, address, phone } = user;


  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col w-full h-full">
      <h2 className="text-xl font-semibold flex items-center">
        <User className="mr-2 h-6 w-6" /> {`${first_name} ${last_name}`}
      </h2>
      <div className="mt-4 space-y-2">
        <p className="flex items-center">
          <Calendar className="mr-2 h-6 w-6" />
          Date of Birth: {dob}
        </p>
        <p className="flex items-center">
          <span className="mr-2">Gender:</span> {gender}
        </p>
        <p className="flex items-center">
          <Mail className="mr-2 h-6 w-6" />
          Email: {email}
        </p>
        <p className="flex items-center">
          <MapPin className="mr-2 h-6 w-6" />
          Address: {address}
        </p>
        <p className="flex items-center">
          <Phone className="mr-2 h-6 w-6" />
          Phone: {phone}
        </p>
      </div>
    </div>
  );
};

export default UserInfoCard;