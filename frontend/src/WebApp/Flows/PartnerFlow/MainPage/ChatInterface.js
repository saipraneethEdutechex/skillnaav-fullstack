// import React, { useState } from "react";

// const ChatInterface = ({ activeNotification, onSendMessage }) => {
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (input.trim()) {
//       onSendMessage(input);
//       setInput("");
//     }
//   };

//   return (
//     <div className="flex flex-col font-poppins h-screen p-4 bg-gray-100">
//       <div className="flex-grow overflow-y-auto p-4 space-y-4">
//         {activeNotification.messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex flex-col p-4 rounded-lg shadow-md ${
//               msg.author === "User" ? "bg-blue-100 self-end" : "bg-white"
//             }`}
//           >
//             <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
//               <span className="font-semibold">{msg.author}</span>
//               <span>{msg.timestamp}</span>
//             </div>
//             <div className="text-gray-800">{msg.content}</div>
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center mt-4 p-2 bg-white border-t border-gray-300">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-grow p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={handleSend}
//           className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;
