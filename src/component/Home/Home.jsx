
import Banner from '../img/banner.png'

const Home = () => {
    return (
        <div
            className="font-lora bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${Banner})`, // Replace with your image path
            }}
        >
            <div className="md:w-1/2 w-full md:px-28 min-h-screen px-5  md:text-left space-y-6 pt-[150px]">

                <div className='w-[100px] bg-[#041C3780] '>
                    <p className='  border-l-4 border-l-[#041c37b2] px-1 text-[#FFFFFF] '>ShipMate Ai</p>
                </div>
                <div className='py-4'>
                    <h1 className="text-3xl md:text-[66px] font-bold text-[#0A3161] lora">AI-Powered</h1>
                    <p className="font-bold text-3xl md:text-[66px] text-[#FFFFFF] lora">
                        Maintenance & Inventory
                    </p>
                    <p className="font-bold text-3xl md:text-[66px] text-[#FFFFFF] lora">
                        Management
                    </p>

                    <p className="text-[#FFFFFF] roboto mt-4 text-base md:text-lg md:w-2/3 w-full">
                        In augue ligula, feugiat ut nulla consequat. Ut est lacus, molestie in arcu no, iaculis vehicula ipsum. Nunc faucibus, nisl id dapibus finibus, enim diam interdum nulla, sed laoreet risus lectus.
                    </p>
                </div>

                <button className="text-[#FFFFFF] bg-[#0A3161] text-lg md:text-xl font-medium roboto py-2 px-4 rounded-xl mt-6 cursor-pointer">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Home;
