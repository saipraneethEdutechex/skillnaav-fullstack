import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../../Warnings/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const PartnerLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/users/login", values, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/partner-main-page");
    } catch (err) {
      setLoading(false);
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : "Something went wrong"
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-poppins">
      {/* Left Section (Colorful Background) */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-blue-500 to-teal-400">
        <div className="w-3/4 h-3/4 flex items-center justify-center">
          <h1 className="text-white text-5xl font-extrabold">Partner Portal</h1>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="flex flex-col items-center justify-center p-8 w-full lg:w-1/2 bg-white shadow-lg rounded-lg">
        <div className="w-full max-w-md flex flex-col justify-center min-h-screen lg:min-h-full">
          <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
            Welcome Back
          </h1>
          <h2 className="text-lg font-medium mb-6 text-center text-gray-600">
            Please sign in to your account
          </h2>

          {/* Error Message */}
          {error && (
            <div className="bg-red-200 text-red-600 p-3 mb-4 text-center rounded-lg">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <Loading />
          ) : (
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  {/* Email Field */}
                  <div className="relative">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      className="w-full p-4 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-4 mt-3 flex items-center justify-center h-full text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        size="lg"
                      />
                    </button>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Remember Me and Forgot Password */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                      <Field
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        className="form-checkbox h-4 w-4 text-teal-500 transition duration-150 ease-in-out"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="block text-sm mt-4 text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium mt-4 text-teal-500 hover:text-teal-700 transition duration-150 ease-in-out"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600 transition-colors duration-300 shadow-md"
                  >
                    Sign In
                  </button>
                </Form>
              )}
            </Formik>
          )}

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="w-full border-gray-300" />
            <span className="px-3 text-gray-500">OR</span>
            <hr className="w-full border-gray-300" />
          </div>

          {/* Sign Up */}
          <p className="text-center text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/partner-create-account"
              className="text-teal-500 hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;
