import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import toast from "react-hot-toast";

import {
    Phone,
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        phone: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [workspaces, setWorkspaces] = useState([]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const data = await login(
                formData.phone,
                formData.password
                
            );

            handleLoginResponse(data);
        } catch (err) {
            toast.error(
                err.response?.data?.error ||
                err.response?.data?.detail ||
                "Authentication failed."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleWorkspaceSelect = async (workspaceCode) => {
        setLoading(true);

        try {
            const data = await login(
                formData.phone,
                formData.password,
                workspaceCode
            );

            handleLoginResponse(
                data,
                workspaceCode
            );
        } catch (err) {
            toast.error(
                err.response?.data?.error ||
                "Workspace authentication failed."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleLoginResponse = (
        data,
        workspaceCode
    ) => {
        if (data.multiple_workspaces) {
            setWorkspaces(data.workspaces);
            toast.success(
                "Select your workspace."
            );
            return;
        }

        if (data.phone_verify) {
            navigate("/verify-phone", {
                state: {
                    phone: formData.phone,
                    email: data.email,
                },
            });
            return;
        }

        if (data.pending) {
            navigate("/pending-approval");
            return;
        }

        if (data.mfa_required) {
            navigate("/mfa", {
                state: {
                    email: data.email,
                    workspace_code: workspaceCode,
                },
            });
            return;
        }

        toast.success("Welcome back!");

        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
            return;
        }

        const role = data.user?.role || data.role;

        if (role === "super_admin") {
            navigate("/super-admin");
        } else if (role === "company_admin") {
            navigate("/dashboard", { replace: true });
        } else if (role === "operations_manager") {
            navigate("/operations");
        } else {
            navigate("/employee");
        }

        // const role =
        //     data.role || data.user?.role;

        // if (role === "super_admin") {
        //     navigate("/super-admin");
        // } else if (role === "company_admin") {
        //     navigate("/dashboard");
        // } else if (
        //     role === "operations_manager"
        // ) {
        //     navigate("/operations");
        // } else {
        //     navigate("/employee");
        // }
    };

    return (
        <div className="min-h-screen bg-[#F7F7F3] flex items-center justify-center px-6 py-10">

            <div className="w-full max-w-7xl bg-white rounded-[30px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

                {/* LEFT */}

                <div className="px-16 py-14 flex flex-col justify-center">

                    <div className="flex items-center gap-3 mb-10">

                        <div className="w-12 h-12 rounded-2xl bg-emerald-700 flex items-center justify-center">

                            <ShieldCheck className="text-white w-6 h-6" />

                        </div>

                        <div>

                            <h2 className="font-bold text-2xl">
                                TrackFlow AI
                            </h2>

                            <p className="text-sm text-gray-500">
                                Logistics Platform
                            </p>

                        </div>

                    </div>

                    <h1 className="text-5xl font-bold leading-tight text-gray-900">

                        Welcome back

                    </h1>

                    <p className="mt-4 text-gray-500 text-lg">

                        Sign in to access your logistics workspace and manage operations securely.

                    </p>

                    {workspaces.length === 0 && (

                        <form
                            onSubmit={handleSubmit}
                            className="mt-10 space-y-6"
                        >

                            {/* PHONE */}

                            <div>

                                <label className="text-sm font-semibold text-gray-700">

                                    Phone Number

                                </label>

                                <div className="mt-2 relative">

                                    <Phone
                                        className="absolute left-4 top-4 text-gray-400"
                                        size={20}
                                    />

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 9876543210"
                                        required
                                        className="w-full pl-12 pr-4 h-14 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-emerald-600 outline-none transition"
                                    />

                                </div>

                            </div>

                            {/* PASSWORD */}

                            <div>

                                <div className="flex justify-between items-center mb-2">

                                    <label className="text-sm font-semibold">

                                        Password

                                    </label>

                                    <Link
                                        to="/forgot-password"
                                        className="text-sm text-emerald-700 font-semibold hover:underline"
                                    >

                                        Forgot password?

                                    </Link>

                                </div>

                                <div className="relative">

                                    <Lock
                                        className="absolute left-4 top-4 text-gray-400"
                                        size={20}
                                    />

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter password"
                                        className="w-full pl-12 pr-12 h-14 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-emerald-600 outline-none transition"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="absolute right-4 top-4 text-gray-500"
                                    >

                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}

                                    </button>

                                </div>

                            </div>

                            {/* LOGIN BUTTON */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 rounded-xl bg-emerald-700 hover:bg-emerald-800 transition text-white font-semibold flex items-center justify-center gap-2"
                            >

                                {loading ? (
                                    "Signing In..."
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} />
                                    </>
                                )}

                            </button>

                            {/* OR */}

                            <div className="flex items-center gap-4 py-2">

                                <div className="flex-1 border-t"></div>

                                <span className="text-sm text-gray-400">

                                    OR

                                </span>

                                <div className="flex-1 border-t"></div>

                            </div>

                            <GoogleLoginButton />

                            <p className="text-center text-gray-500 pt-4">

                                Don't have a company account?{" "}

                                <Link
                                    to="/register"
                                    className="font-semibold text-emerald-700 hover:underline"
                                >

                                    Register Company

                                </Link>

                            </p>

                            {/* WORKSPACE SELECTION */}

                            {workspaces.length > 0 && (
                                <div className="mt-10 animate-fade-in">

                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Select Workspace
                                    </h2>

                                    <p className="text-gray-500 mt-2 mb-6">
                                        Your account belongs to multiple companies.
                                        Select the workspace you want to enter.
                                    </p>

                                    <div className="space-y-4">

                                        {workspaces.map((workspace) => (

                                            <button
                                                key={workspace.workspace_code}
                                                onClick={() =>
                                                    handleWorkspaceSelect(
                                                        workspace.workspace_code
                                                    )
                                                }
                                                disabled={loading}
                                                className="
                        w-full
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        p-5
                        hover:border-emerald-600
                        hover:bg-emerald-50
                        transition
                        flex
                        items-center
                        justify-between
                        group
                        "
                                            >

                                                <div className="text-left">

                                                    <h3 className="font-semibold text-lg text-gray-900">
                                                        {workspace.name}
                                                    </h3>

                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {workspace.workspace_code}.localhost
                                                    </p>

                                                </div>

                                                <ArrowRight
                                                    className="text-emerald-700 group-hover:translate-x-1 transition"
                                                    size={20}
                                                />

                                            </button>

                                        ))}

                                    </div>

                                    <button
                                        onClick={() => setWorkspaces([])}
                                        className="
                    mt-8
                    text-sm
                    text-gray-500
                    hover:text-black
                    font-medium
                    "
                                    >
                                        ← Back
                                    </button>

                                </div>
                            )}

                        </form>

                    )}

                </div>

                {/* RIGHT PANEL */}

                <div className="hidden lg:flex bg-[#155E52] relative overflow-hidden">

                    {/* Background Decoration */}

                    <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>

                    <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald-300/10 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col justify-between w-full p-14">

                        {/* Top */}

                        <div>

                            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">

                                <ShieldCheck
                                    size={18}
                                    className="text-emerald-300"
                                />

                                <span className="text-white text-sm font-semibold">

                                    Enterprise SaaS

                                </span>

                            </div>

                        </div>

                        {/* Middle */}

                        <div>

                            <div className="flex items-center gap-1 text-yellow-300 text-xl">

                                ★ ★ ★ ★ ★

                            </div>

                            <p className="text-white text-3xl font-bold leading-relaxed mt-6">

                                "TrackFlow AI transformed how we manage logistics.

                                Every shipment, employee and warehouse is now managed

                                from one secure platform."

                            </p>

                            <div className="mt-10 flex items-center gap-4">

                                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold">

                                    R

                                </div>

                                <div>

                                    <h3 className="text-white font-bold text-lg">

                                        Rahul Sharma

                                    </h3>

                                    <p className="text-emerald-100">

                                        Operations Head

                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Bottom Statistics */}

                        <div className="grid grid-cols-3 gap-5">

                            <div className="bg-white rounded-2xl p-6">

                                <h2 className="text-4xl font-bold text-emerald-700">

                                    500+

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    Companies

                                </p>

                            </div>

                            <div className="bg-white rounded-2xl p-6">

                                <h2 className="text-4xl font-bold text-emerald-700">

                                    3200+

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    Employees

                                </p>

                            </div>

                            <div className="bg-white rounded-2xl p-6">

                                <h2 className="text-4xl font-bold text-emerald-700">

                                    98%

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    Delivery Success

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}