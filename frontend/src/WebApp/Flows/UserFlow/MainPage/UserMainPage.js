import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import BodyContent from "./BodyContent"; // Main content component
import { TabProvider } from "./UserHomePageContext/HomePageContext";

const UserMainPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [isApproved, setIsApproved] = useState(false); // Track if user is approved

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token")); // Retrieve and parse the token
        console.log("Token:", token); // Log the token
  
        const response = await fetch("http://3.110.114.26:5000/api/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
  
        const data = await response.json();
        setUserInfo(data);
        setIsApproved(data.adminApproved); // Set approval status based on the response
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };
  
    fetchUserInfo();
  }, []);

  return (
    <TabProvider>
      <div className="flex relative">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />

          {/* Show loading skeleton while fetching data */}
          {loading ? (
            <div className="p-4">
              <Skeleton active />
            </div>
          ) : (
            <>
              {/* Render BodyContent regardless of approval status */}
              <div className="relative flex-1">
                <BodyContent />
                
                {/* Mask specific features if user is not approved */}
                {!isApproved ? (
                  <>
                    <div className="absolute inset-0 bg-gray-500 opacity-50 z-10" />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-lg font-semibold">Account Not Approved</h2>
                        <p>Your account is not approved by an admin yet. Some features may be restricted.</p>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </TabProvider>
  );
};

export default UserMainPage;


// import React from "react";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import BodyContent from "./BodyContent";
// import { TabProvider } from "./UserHomePageContext/HomePageContext";

// const UserMainPage = () => {
//   return (
//     <TabProvider>
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 flex flex-col">
//           <Navbar />
//           <BodyContent />
//         </div>
//       </div>
//     </TabProvider>
//   );
// };

// export default UserMainPage;



