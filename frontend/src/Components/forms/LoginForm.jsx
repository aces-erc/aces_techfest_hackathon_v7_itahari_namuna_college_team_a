import { useContext, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { IoLogoGoogle } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";
import MySvg from "../../images/svg/login.svg";
import Validation from "./LoginValidation";

const LoginForm = () => {
    const { login, currentUser } = useContext(AuthContext);
    const [values, setValues] = useState({
        phone: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!errors.phone && !errors.password) {
            setErr(null);
        }
    }, [errors]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = Validation(values);

        // Check for validation errors
        if (Object.keys(validationErrors).some(key => validationErrors[key] !== "")) {
            setErrors(validationErrors);
            setErr(null); // Reset general error message
        } else {
            setErrors({});
            try {
                await login(values);
                const res = JSON.parse(localStorage.getItem('currentUser'));

                if (res?.role === 'PATIENTS') {
                    navigate('/user/dashboard');
                } else if (res?.role === 'INSURANCE') {
                    navigate('/insurance/dashboard');
                } else if (res?.role === 'HOSPITAL') {
                    navigate('/hospital/dashboard');
                }
            } catch (err) {
                // Check if err is an object and extract the message or set a fallback string
                setErr(err.response?.data?.error || 'Something went wrong! Please try again.');
            }
        }
    };

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="w-full h-[100vh] grid place-items-center">
            <div className="h-[80%] w-[65%] rounded-xl shadow-2xl flex">
                <div className="h-full w-1/2 flex flex-col items-center">
                    <img className="h-[90%] w-full" src={MySvg} alt="Login SVG" />
                    <NavLink to="/signup">
                        <p className="underline font-bold">Create an account</p>
                    </NavLink>
                </div>
                <div className="h-full w-1/2 pl-14 pt-14 font-heading">
                    <div className="flex flex-col justify-start">
                        <h3 className="w-full text-4xl font-bold">Login</h3>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col justify-center gap-4 items-start mt-12"
                        >
                            <div className="flex items-center w-full relative">
                                <FaUserAlt className="absolute" />
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone" // Updated ID for better targeting
                                    placeholder="User Id"
                                    className="font-semibold border-0 !border-b-2 w-[80%] outline-none px-8"
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            {errors.phone && <span className="text-red-600">{errors.phone}</span>}
                            <div className="mt-2 flex items-center w-full relative">
                                <RiLockPasswordFill className="absolute" />
                                <input
                                    type="password"
                                    name="password"
                                    id="password" // Added meaningful ID
                                    placeholder="Password"
                                    className="outline-none font-semibold border-0 !border-b-2 w-[80%] px-8"
                                    onChange={handleInput}
                                    autoComplete="on"
                                    required
                                />
                            </div>
                            {errors.password && <span className="text-red-600">{errors.password}</span>}
                            <div className="flex justify-center items-center">
                                <input
                                    className="cursor-pointer"
                                    type="checkbox"
                                    name="check"
                                    id="remember-me"
                                />{" "}
                                <span className="pl-2 font-semibold">Remember me</span>
                            </div>
                            {/* Check if err is a string and render it */}
                            {err && typeof err === 'string' && <span className="text-red-700">{err}</span>}
                            <button
                                type="submit"
                                className="bg-primary p-2 px-4 font-bold rounded-sm hover:bg-[#79db7c] transition-colors duration-200 mt-8"
                            >
                                Sign In
                            </button>
                            <div className="flex gap-4 mt-20">
                                <span className="font-semibold">or login with</span>
                                <button className="p-1 rounded-md text-white bg-[#276bff]">
                                    <FaFacebookF />
                                </button>
                                <button className="p-1 rounded-md text-white bg-black">
                                    <FaXTwitter />
                                </button>
                                <button className="p-1 rounded-md text-white bg-[#DB4437]">
                                    <IoLogoGoogle />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
