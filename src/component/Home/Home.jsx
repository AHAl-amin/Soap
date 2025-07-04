
// import { Link } from 'react-router-dom';
// import Banner from '../img/banner.png'

// import authSlice from ""

// const Home = () => {
//     return (
//         <div
//             className="font-lora bg-cover bg-center bg-no-repeat"
//             style={{
//                 backgroundImage: `url(${Banner})`, // Replace with your image path
//             }}
//         >
//             <div className=" w-full md:px-28 min-h-screen px-5  md:text-left space-y-6 pt-[150px]">

//                 <div className='w-44  bg-[#041C3780] '>
//                     <p className='  border-l-4 border-l-[#041c37b2] pr-10 pl-3 py-2 text-[#FFFFFF] font-semibold tracking-widest'>ShipMate AI</p>
//                 </div>
//                 <div className='py-4'>
//                     <h1 className="text-3xl md:text-[66px] font-bold text-[#0A3161] lora">AI-Powered</h1>
//                     <p className="font-bold text-3xl md:text-[66px] text-[#FFFFFF] lora">
//                         Maintenance & Inventory
//                     </p>
//                     <p className="font-bold text-3xl md:text-[66px] text-[#FFFFFF] lora">
//                         Management
//                     </p>

//                     <p className="text-[#FFFFFF] roboto mt-4 text-base md:text-lg md:w-3/4 w-full">
//                         In augue ligula, feugiat ut nulla consequat. Ut est lacus, molestie in arcu no, iaculis vehicula ipsum. Nunc faucibus, nisl id dapibus finibus, enim diam interdum nulla, sed laoreet risus lectus.
//                     </p>
//                 </div>

//                 <Link to="dashboard/ai_assistant">
//                 <button className="text-[#FFFFFF] bg-[#0A3161] hover:bg-[#3d516e] text-lg md:text-xl font-medium roboto py-2 px-4 rounded-xl cursor-pointer">
//                     Get Started
//                 </button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default Home;






import { Link } from 'react-router-dom';
import Banner from '../img/banner.png';

const Home = () => {
    // Get token from Redux store
    // const token = useSelector((state) => state.auth.token);

    // const token = localStorage.getItem('access_token')
    // console.log(token)
  


    // If no token, redirect to login page
    // if (!token) {
    //     return <Navigate to="/login" replace />;
    // }

    return (
        <div
            className="font-lora bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${Banner})`,
            }}
        >
            <div className="w-full md:px-28 min-h-screen px-5 md:text-left space-y-6 pt-[150px]">
                <div className='w-78 bg-[#041C3780] '>
                    <p className='border-l-4 capitalize border-l-[#041c37b2] pr-2 pl-3 py-2 text-[#FFFFFF] font-semibold tracking-widest'>Ship logistics AI driven tool</p>
                </div>
                <div className='py-4'>
                    <h1 className="text-3xl md:text-[66px] font-bold text-[#0A3161] lora">AI-Powered</h1>
                    <p className="font-bold text-3xl md:text-[66px] text-[#FFFFFF] lora">
                        Maintenance & Inventory
                    </p>
                    <p className="font-bold text-3xl md:text-[66px] text-[#FFFFFF] lora">
                        Management
                    </p>
                    <p className="text-[#FFFFFF] roboto mt-4 text-base md:text-lg md:w-3/4 w-full">
                        Streamline ship maintenance with advanced AI recognition, technical manual integration, and intelligent part management.
                    </p>
                </div>

                <Link to="dashboard/ai_assistant">
                    <button className="text-[#FFFFFF] bg-[#0A3161] hover:bg-[#3d516e] text-lg md:text-xl font-medium roboto py-2 px-4 rounded-xl cursor-pointer">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
