// import axios from "axios";
// import { useState } from "react";

// const Login = ({ onLoginSuccess }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         { email, password }
//       );

//       alert(res.data.message); // ✅ "Login successful"

//       console.log("Logged in user:", res.data.user);

//       setEmail("");
//       setPassword("");

//       if (typeof onLoginSuccess === "function") {
//         onLoginSuccess(res.data.user);
//       }
//     } catch (error) {
//       alert(
//         error.response?.data?.message ||
//         "Login failed. Server not responding"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='bg-[url("src/assets/banner5.jpg")] bg-cover bg-center flex justify-center items-center h-screen'>
//       <form onSubmit={handleSubmit}>
//         <div className='bg-white flex flex-col justify-center shadow-xl items-center p-10 gap-6 rounded-2xl w-[350px]'>

//           <h2 className="text-xl font-semibold">Login</h2>

//           <input
//             className='border border-gray-300 shadow w-full p-2 rounded'
//             type="email"
//             placeholder="Email"
//             autoComplete="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             className='border border-gray-300 shadow w-full p-2 rounded'
//             type="password"
//             placeholder="Password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full p-2 rounded text-white ${
//               loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;


import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post("https://hotel-booking-app-2lg2.onrender.com/api/auth/login", { email, password });
            alert(res.data.message);

            // console.log("Logged in user:", res.data.user);

            setEmail("");
            setPassword("");

            if (typeof onLoginSuccess === "function") {
                onLoginSuccess(res.data.user);
            }


            navigate('/')
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login failed. Server not responding"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-[url("src/assets/banner5.jpg")] bg-cover bg-center flex justify-center items-center min-h-screen'>
            <form onSubmit={handleSubmit}>
                <div className='bg-white flex flex-col shadow-xl items-center p-10 gap-6 rounded-2xl w-[350px]'>

                    <h2 className="text-xl font-semibold">Login</h2>

                    <input
                        className='border border-gray-300 w-full p-2 rounded'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
                        required
                    />

                    {/* <input
            className='border border-gray-300 w-full p-2 rounded'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> */}

                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-gray-300 w-full p-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />

                    <button className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600">
                        Login
                    </button>

                    <p>Don't Have an Accont? <Link to="/register">Register Here</Link></p>

                </div>
            </form>
        </div>
    );
};

export default Login;
