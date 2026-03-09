// import React, { useState } from 'react'
// import axios from "axios"


// const Register = ({ onRegisterSuccess }) => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");


//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post(
//                 "http://localhost:5000/api/auth/register",
//                 { name, email, password }
//             );

//             alert("Successfully Registered");

//             setName("");
//             setEmail("");
//             setPassword("");

//             if (onRegisterSuccess) {
//                 onRegisterSuccess();
//             }

//         } catch (err) {
//             console.error(err);
//             alert(err.response?.data?.message || "Register failed");
//         }
//     };



//     return (
//         <>

//             <div className='bg-[url("src/assets/banner5.jpg")] bg-cover bg-center flex justify-center items-center h-200'>
//                 <form onSubmit={handleSubmit}>




//                     <div className='bg-white flex flex-col justify-center shadow-xl items-center p-15 gap-10 rounded-2xl'>

//                         <input className='border-1 border-gray-200 shadow w-70 p-2'
//                             type="name"
//                             name="name"
//                             placeholder="name"
//                             autoComplete="name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                         />

//                         <input className='border-1 border-gray-200 shadow w-70 p-2'
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             autoComplete="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />

//                         <input className='border-1 border-gray-200 shadow w-70 p-2'
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             autoComplete="current-password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />

//                         <button type="submit" className='bg-red-400 p-2 rounded text-white w-25'>Register</button>
//                     </div>

//                 </form>
//             </div >

//         </>
//     )
// }

// export default Register



import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";


const Register = ({ onRegisterSuccess }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                { name, email, password }
            );

            alert("Successfully Registered");

            setName("");
            setEmail("");
            setPassword("");

            if (onRegisterSuccess) {
                onRegisterSuccess();
            }

            navigate('/login')
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Register failed");
        }
    };



    return (
        <>

            <div className='bg-[url("src/assets/banner5.jpg")] bg-cover bg-center flex justify-center items-center h-200'>
                <form onSubmit={handleSubmit}>




                    <div className='bg-white flex flex-col justify-center shadow-xl items-center p-15 gap-10 rounded-2xl'>

                        <h2 className="text-xl font-semibold">Register</h2>

                        <input className='border-1 border-gray-200 shadow w-70 p-2'
                            type="name"
                            name="name"
                            placeholder="name"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input className='border-1 border-gray-200 shadow w-70 p-2'
                            type="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input className='border-1 border-gray-200 shadow w-70 p-2'
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit" className='bg-red-400 p-2 rounded text-white w-25'>Register</button>
                        <p>Already Have an Accont? <Link to="/login">Login</Link></p>
                    </div>
                    
                    

                </form>
            </div >

        </>
    )
}

export default Register