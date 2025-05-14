



// import { useState, useRef, useEffect } from "react";
// import { PaperclipIcon, SendIcon } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import { GoPaperAirplane } from "react-icons/go";
// import { useNavigate } from "react-router-dom";
// import aiIcon from "../../img/login_icon2.png";
// import { useAiMutation } from "../../../Redux/feature/ApiSlice";
// import { FaUserTie } from "react-icons/fa";

// const AiAssistant = () => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [selectedFileName, setSelectedFileName] = useState("");
//     const [selectedFile, setSelectedFile] = useState(null); // Store file object

//     const messagesEndRef = useRef(null);
//     const inputRef = useRef(null);
//     const fileInputRef = useRef(null);

//     const navigate = useNavigate();
//     const [aiRequest] = useAiMutation();

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         scrollToBottom();
//         if (hasUserSentMessage) {
//             inputRef.current?.focus();
//         }
//     }, [messages, hasUserSentMessage]);

//     const generateAIResponse = async (userMessage, imageFile, fileName) => {
//         setIsLoading(true);
//         try {
//             const formData = new FormData();
//             if (imageFile) {
//                 formData.append("image", imageFile); // Send file object under 'image'
//                 formData.append("image_path", fileName); // Send file name as string
//             }
//             if (userMessage) {
//                 formData.append("question", userMessage);
//             }

//             // Log FormData for debugging
//             for (let pair of formData.entries()) {
//                 console.log(`${pair[0]}: ${pair[1]}`);
//             }

//             const result = await aiRequest(formData).unwrap();

//             const botResponse = result.result || "No response received.";
//             console.log(botResponse)

//             setTimeout(() => {
//                 setMessages((prev) => [
//                     ...prev,
//                     {
//                         text: botResponse,
//                         isUser: false,
//                         timestamp: new Date(),
//                     },
//                 ]);
//                 setIsLoading(false);
//             }, 800);
//         } catch (error) {
//             console.error("Error generating AI response:", error);
//             let errorMessage = "Sorry, I encountered an error. Please try again later.";
//             if (error.data?.details) {
//                 errorMessage = `Error: ${JSON.stringify(error.data.details)}`;
//             }
//             setTimeout(() => {
//                 setMessages((prev) => [
//                     ...prev,
//                     {
//                         text: errorMessage,
//                         isUser: false,
//                         timestamp: new Date(),
//                     },
//                 ]);
//                 setIsLoading(false);
//             }, 800);
//         }
//     };

//     const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             // Validate file type and size
//             if (!file.type.startsWith("image/")) {
//                 alert("Please upload an image file (e.g., .jpg, .png).");
//                 return;
//             }

//             const imageUrl = URL.createObjectURL(file);
//             setSelectedImage(imageUrl);
//             setSelectedFileName(file.name);
//             setSelectedFile(file);
//         }
//     };

//     const handleSendMessage = async () => {
//         if (newMessage.trim() === "" && !selectedImage) return;

//         const userMessage = newMessage.trim();
//         if (userMessage || selectedImage) {
//             setMessages((prev) => [
//                 ...prev,
//                 {
//                     text: userMessage,
//                     image: selectedImage,
//                     fileName: selectedFileName,
//                     isUser: true,
//                     timestamp: new Date(),
//                 },
//             ]);

//             setNewMessage("");
//             setSelectedImage(null);
//             setSelectedFileName("");
//             setSelectedFile(null);
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = ""; // Clear file input
//             }
//             setHasUserSentMessage(true);

//             await generateAIResponse(userMessage, selectedFile, selectedFileName);
//         }
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter" && !e.shiftKey) {
//             e.preventDefault();
//             handleSendMessage();
//         }
//     };

//     return (
//         <div className="md:p-8 pt-4 h-full w-full flex flex-col lora">
//             <div className="lora flex items-center justify-between p-4">
//                 <div className="flex flex-col items-start">
//                     <div className="flex gap-10">
//                         <h1 className="text-[#0A3161] font-bold text-[35px]">Ai Assistant</h1>
//                     </div>
//                     <div className="border w-screen mt-4 border-[#E6E6E6]"></div>
//                 </div>
//             </div>

//             <div className="flex flex-col flex-1">
//                 <div className="flex-1 overflow-y-auto p-4 space-y-6 relative mb-10">
//                     {!hasUserSentMessage && (
//                         <div className="absolute bottom-4 w-[80%]">
//                             <div className="flex items-start space-x-3">
//                                 <div className="rounded-full text-[#0A3161] flex items-center justify-center">
//                                     <img src={aiIcon} className="h-10 w-10 mt-1 text-[#0A3161]" />
//                                 </div>
//                                 <div className="px-5 py-4 rounded-lg bg-[#0A31611A] dark:bg-[#0A31611A] text-black dark:text-[#595959] lg:text-[16px] shadow-sm w-full text-sm">
//                                     <ReactMarkdown>Hello! I'm your AI assistant. How can I help you today?</ReactMarkdown>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {messages.map((message, index) => (
//                         <div key={index} className="flex w-full">
//                             {message.isUser ? (
//                                 <div className="flex flex-col items-end w-full">
//                                     <div className="flex justify-end items-end space-x-3">
//                                         {message.text && (
//                                             <div className="px-4 py-3 rounded-xl bg-[#0A3161] text-white lg:text-[16px] shadow-md w-full">
//                                                 <span>{message.text}</span>
//                                             </div>
//                                         )}
//                                         {message.image && (
//                                             <div className="flex justify-end">
//                                                 <div>
//                                                     <img
//                                                         src={message.image}
//                                                         alt="Uploaded"
//                                                         className="rounded-lg shadow-md w-14 h-10"
//                                                     />
//                                                     {message.fileName && (
//                                                         <p className="text-xs text-gray-500 mt-1 capitalize">{message.fileName}</p>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         )}
//                                         <div className="rounded-full flex items-center justify-center">
//                                             {/* <img
//                                                 src="https://i.ibb.co.com/x2wkVkr/Whats-App-Image-2024-07-04-at-10-43-40-AM.jpg"
//                                                 alt=""
//                                                 className="rounded-full h-10 min-w-10"
//                                             /> */}

//                                             <FaUserTie
//                                                 className="text-[36px] text-gray-800 cursor-pointer"

//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="flex flex-col items-start w-full">
//                                     <div className="flex items-start space-x-3 md:w-[80%] w-full">
//                                         <div className="h-10 w-10 rounded-full flex items-center justify-center">
//                                             <img src={aiIcon} className="h-10 w-10 text-white" />
//                                         </div>
//                                         {/* <div className="px-5 py-4 rounded-lg dark:bg-[#0A31611A] text-black dark:text-[#595959] lg:text-[16px] max-w-[80%] break-words whitespace-pre-wrap">
//                                             <ReactMarkdown>{message.text}</ReactMarkdown>
//                                         </div> */}
//                                         <div className="px-5 py-4 rounded-lg dark:bg-[#0A31611A] text-black dark:text-[#595959] lg:text-[16px] md:max-w-[80%] w-full break-words whitespace-pre-wrap">
//                                             <ReactMarkdown>{message.text}</ReactMarkdown>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                     {isLoading && (
//                         <div className="flex w-full">
//                             <div className="flex flex-col items-start w-full">
//                                 <div className="flex items-start space-x-3 mb-12">
//                                     <div className="h-10 w-10 rounded-full flex items-center justify-center">
//                                         <img src={aiIcon} className="h-10 w-10 text-white" />
//                                     </div>
//                                     <div className="px-5 py-4 rounded-lg bg-[#0A31611A] text-black dark:text-gray-200 shadow-sm">
//                                         <div className="flex space-x-1">
//                                             <div
//                                                 className="w-2 h-2 bg-[#0a316194] rounded-full animate-bounce"
//                                                 style={{ animationDelay: "0ms" }}
//                                             ></div>
//                                             <div
//                                                 className="w-2 h-2 bg-[#093163ce] rounded-full animate-bounce"
//                                                 style={{ animationDelay: "150ms" }}
//                                             ></div>
//                                             <div
//                                                 className="w-2 h-2 bg-[#0A3161] rounded-full animate-bounce"
//                                                 style={{ animationDelay: "300ms" }}
//                                             ></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                     <div ref={messagesEndRef} />
//                 </div>

//                 {selectedImage && (
//                     <div className="mb-3 ml-3 flex items-center space-x-3">
//                         <div className="relative">
//                             <img
//                                 src={selectedImage}
//                                 alt="Selected"
//                                 className="rounded-lg shadow-md w-24 h-10 object-cover"
//                             />
//                             <button
//                                 onClick={() => {
//                                     setSelectedImage(null);
//                                     setSelectedFileName("");
//                                     setSelectedFile(null);
//                                     if (fileInputRef.current) {
//                                         fileInputRef.current.value = ""; // Clear file input
//                                     }
//                                 }}
//                                 className="absolute top-1 right-1 bg-[#5B21BD] text-white rounded-full p-[2px] hover:bg-[#2f6ea9] cursor-pointer"
//                             >
//                                 <GoPaperAirplane />
//                             </button>
//                         </div>
//                         <p className="text-sm text-gray-600 truncate max-w-[150px]">{selectedFileName}</p>
//                     </div>
//                 )}

//                 <div className="p-3 fixed bottom-0 md:w-[85%] w-full bg-white md:left-[270px] z-30">
//                     <div className="flex items-center border border-[#0A3161] rounded-[10px] px-4 py-3">
//                         <input
//                             type="file"
//                             accept="image/*"
//                             ref={fileInputRef}
//                             onChange={handleImageUpload}
//                             className="hidden"
//                         />
//                         <button
//                             onClick={() => fileInputRef.current?.click()}
//                             className="text-gray-500 hover:text-gray-700"
//                         >
//                             <PaperclipIcon className="h-5 w-5 cursor-pointer" />
//                         </button>
//                         <input
//                             type="text"
//                             placeholder="Ask about ship parts, maintenance procedures, or technical manuals...."
//                             className="flex-1 bg-transparent border-none focus:outline-none mx-3 md:text-sm text-[10px]"
//                             value={newMessage}
//                             onChange={(e) => setNewMessage(e.target.value)}
//                             onKeyDown={handleKeyPress}
//                             disabled={isLoading}
//                             ref={inputRef}
//                         />
//                         <button
//                             className={`${isLoading ? "text-gray-400" : "text-[#0A3161]"}`}
//                             onClick={handleSendMessage}
//                             disabled={isLoading}
//                         >
//                             <SendIcon className="h-5 w-5 cursor-pointer text-[#0A3161]" />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AiAssistant;



import { useState, useRef, useEffect } from "react";
import { PaperclipIcon, SendIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import aiIcon from "../../img/login_icon2.png";
import { useAiMutation } from "../../../Redux/feature/ApiSlice";
import { FaUserTie } from "react-icons/fa";

const AiAssistant = () => {
    const [messages, setMessages] = useState(() => {
        // Load messages from localStorage on component mount
        const savedMessages = localStorage.getItem("chatMessages");
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);

    const navigate = useNavigate();
    const [aiRequest] = useAiMutation();

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Save messages to localStorage
    const saveMessagesToStorage = (updatedMessages) => {
        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
    };

    // Fetch chat history from backend
    const fetchChatHistory = async () => {
        try {
            const response = await aiRequest({ action: "fetchHistory" }).unwrap(); // Adjust endpoint/action as needed
            const chatHistory = response.messages || [];
            setMessages(chatHistory);
            saveMessagesToStorage(chatHistory); // Save fetched history to localStorage
            setHasUserSentMessage(chatHistory.some((msg) => msg.isUser));
        } catch (error) {
            console.error("Error fetching chat history:", error);
            // Fallback to localStorage if backend fetch fails
            const savedMessages = localStorage.getItem("chatMessages");
            if (savedMessages) {
                setMessages(JSON.parse(savedMessages));
            }
        }
    };

    // Load chat history on component mount
    useEffect(() => {
        fetchChatHistory();
    }, []);

    // Scroll to bottom and focus input when messages change
    useEffect(() => {
        scrollToBottom();
        if (hasUserSentMessage) {
            inputRef.current?.focus();
        }
    }, [messages, hasUserSentMessage]);

    const generateAIResponse = async (userMessage, imageFile) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            if (imageFile) {
                formData.append("image", imageFile);
            }
            if (userMessage) {
                formData.append("question", userMessage);
            }

            // Log FormData for debugging
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            const result = await aiRequest(formData).unwrap();
            const botResponse = result.result || "No response received.";

            const newBotMessage = {
                text: botResponse,
                isUser: false,
                timestamp: new Date(),
            };

            setMessages((prev) => {
                const updatedMessages = [...prev, newBotMessage];
                saveMessagesToStorage(updatedMessages); // Save to localStorage
                return updatedMessages;
            });

            // Optionally send the new message to the backend to persist
            await aiRequest({
                action: "saveMessage",
                message: newBotMessage,
            }).unwrap();

            setIsLoading(false);
        } catch (error) {
            console.error("Error generating AI response:", error);
            let errorMessage = "Sorry, I encountered an error. Please try again later.";
            if (error.data?.details) {
                errorMessage = `Error: ${JSON.stringify(error.data.details)}`;
            }

            const errorBotMessage = {
                text: errorMessage,
                isUser: false,
                timestamp: new Date(),
            };

            setMessages((prev) => {
                const updatedMessages = [...prev, errorBotMessage];
                saveMessagesToStorage(updatedMessages); // Save to localStorage
                return updatedMessages;
            });

            setIsLoading(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please upload an image file (e.g., .jpg, .png).");
                return;
            }

            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setSelectedFile(file);
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === "" && !selectedImage) return;

        const userMessage = newMessage.trim();
        if (userMessage || selectedImage) {
            const newUserMessage = {
                text: userMessage,
                image: selectedImage,
                isUser: true,
                timestamp: new Date(),
            };

            setMessages((prev) => {
                const updatedMessages = [...prev, newUserMessage];
                saveMessagesToStorage(updatedMessages); // Save to localStorage
                return updatedMessages;
            });

            // Optionally send the user message to the backend
            await aiRequest({
                action: "saveMessage",
                message: newUserMessage,
            }).unwrap();

            setNewMessage("");
            setSelectedImage(null);
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Clear file input
            }
            setHasUserSentMessage(true);

            await generateAIResponse(userMessage, selectedFile);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="md:p-8 pt-4 h-full w-full flex flex-col lora">
            <div className="lora flex items-center justify-between p-4">
                <div className="flex flex-col items-start">
                    <div className="flex gap-10">
                        <h1 className="text-[#0A3161] font-bold text-[35px]">AI Assistant</h1>
                    </div>
                    <div className="border w-screen mt-4 border-[#E6E6E6]"></div>
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex-1 overflow-y-auto p-4 space-y-6 relative mb-10">
                    {!hasUserSentMessage && !messages.length && (
                        <div className="absolute bottom-4 w-[80%]">
                            <div className="flex items-start space-x-3">
                                <div className="rounded-full text-[#0A3161] flex items-center justify-center">
                                    <img src={aiIcon} className="h-10 w-10 mt-1 text-[#0A3161]" />
                                </div>
                                <div className="px-5 py-4 rounded-lg bg-[#0A31611A] dark:bg-[#0A31611A] text-black dark:text-[#595959] lg:text-[16px] shadow-sm w-full text-sm">
                                    <ReactMarkdown>Hello! I'm your AI assistant. How can I help you today?</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    )}

                    {messages.map((message, index) => (
                        <div key={index} className="flex w-full">
                            {message.isUser ? (
                                <div className="flex flex-col items-end w-full">
                                    <div className="flex justify-end items-end space-x-3">
                                        {message.text && (
                                            <div className="px-4 py-3 rounded-xl bg-[#0A3161] text-white lg:text-[16px] shadow-md w-full">
                                                <span>{message.text}</span>
                                            </div>
                                        )}
                                        {message.image && (
                                            <div className="flex justify-end">
                                                <div>
                                                    <img
                                                        src={message.image}
                                                        alt="Uploaded"
                                                        className="rounded-lg shadow-md w-14 h-10"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-start w-full">
                                    <div className="flex items-start space-x-3 md:w-[80%] w-full">
                                        <div className="h-10 w-10 rounded-full flex items-center justify-center">
                                            <img src={aiIcon} className="h-10 w-10 text-white" />
                                        </div>
                                        <div className="px-5 py-4 rounded-lg dark:bg-[#0A31611A] text-black dark:text-[#595959] lg:text-[16px] md:max-w-[80%] w-full break-words whitespace-pre-wrap">
                                            <ReactMarkdown>{message.text}</ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex w-full">
                            <div className="flex flex-col items-start w-full">
                                <div className="flex items-start space-x-3 mb-12">
                                    <div className="h-10 w-10 rounded-full flex items-center justify-center">
                                        <img src={aiIcon} className="h-10 w-10 text-white" />
                                    </div>
                                    <div className="px-5 py-4 rounded-lg bg-[#0A31611A] text-black dark:text-gray-200 shadow-sm">
                                        <div className="flex space-x-1">
                                            <div
                                                className="w-2 h-2 bg-[#0a316194] rounded-full animate-bounce"
                                                style={{ animationDelay: "0ms" }}
                                            ></div>
                                            <div
                                                className="w-2 h-2 bg-[#093163ce] rounded-full animate-bounce"
                                                style={{ animationDelay: "150ms" }}
                                            ></div>
                                            <div
                                                className="w-2 h-2 bg-[#0A3161] rounded-full animate-bounce"
                                                style={{ animationDelay: "300ms" }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {selectedImage && (
                    <div className="md:mb-10 mb-18 ml-3 flex items-center space-x-3">
                        <div className="relative">
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="rounded-lg shadow-md w-24 h-10"
                            />
                            <button
                                onClick={() => {
                                    setSelectedImage(null);
                                    setSelectedFile(null);
                                    if (fileInputRef.current) {
                                        fileInputRef.current.value = "";
                                    }
                                }}
                                className="absolute top-0 right-0 text-[10px] text-black rounded-full p-[2px] hover:bg-[#2f6ea9] cursor-pointer"
                            >
                                X
                            </button>
                        </div>
                    </div>
                )}

                <div className="p-3 fixed bottom-0 md:w-[85%] w-full bg-white md:left-[270px] z-30">
                    <div className="flex items-center border border-[#0A3161] rounded-[10px] px-4 py-3">
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <PaperclipIcon className="h-5 w-5 cursor-pointer" />
                        </button>
                        <input
                            type="text"
                            placeholder="Ask about ship parts, maintenance procedures, or technical manuals...."
                            className="flex-1 bg-transparent border-none focus:outline-none mx-3 md:text-sm text-[10px]"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={isLoading}
                            ref={inputRef}
                        />
                        <button
                            className={`${isLoading ? "text-gray-400" : "text-[#0A3161]"}`}
                            onClick={handleSendMessage}
                            disabled={isLoading}
                        >
                            <SendIcon className="h-5 w-5 cursor-pointer text-[#0A3161]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiAssistant;