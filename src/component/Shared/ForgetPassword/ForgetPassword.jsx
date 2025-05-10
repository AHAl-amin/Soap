import { useState } from "react";


import { MdEmail } from "react-icons/md";

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("Student");

    const [emailFocused, setEmailFocused] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, userType, });
        // Add your form submission logic here (e.g., API call)
    };

    return (
        <div className="flex  justify-center items-center    lora">

          


                <div className=" shadowrounde md:py-50 py-10 md:w-[30%] w-full">
                    <h2 className="text-[28px] font-medium text-center text-[#0A3161] mb-6">
                        Confirm email
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4 ">
                        <div className="relative ">
                            <label className="block text-gray-400  mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="user@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(email !== "")}
                                className="w-full  px-4 py-3 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
                                required
                            />
                            
                                <MdEmail className="text-[#959AA6] bottom-4 left-3 absolute" />
                            
                        </div>






                        <div className="flex justify-center mt-16">
                            <button
                                type="submit"
                                className="bg-[#0A3161] text-white rounded-[8px] mx-auto px-6 py-2 cursor-pointer w-[123px]"
                            >
                                Confirm
                            </button>
                        </div>

                    </form>
                </div>
          
        </div>
    );
}

export default ForgetPassword;