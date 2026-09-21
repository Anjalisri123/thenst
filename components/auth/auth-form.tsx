"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, Building, Users, Lock, Compass, BookOpen, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { UserRole } from "@/lib/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const countryCodes = [
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
];

interface AuthFormProps {
    mode: "login" | "register";
    role?: UserRole;
}

export function AuthForm({ mode, role = "guard" }: AuthFormProps) {
    const [currentRole, setCurrentRole] = useState<UserRole>(role);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isResetMode, setIsResetMode] = useState(false);
    const [countryCode, setCountryCode] = useState("+91");
    const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");

    const { signIn, signUp, resetPassword } = useAuth();
    const router = useRouter();

    const roleOptions = [
        { value: "guard", label: "Security Professional" },
        { value: "pilot", label: "Drone Pilot" },
        { value: "educator", label: "Educator" },
        { value: "hr", label: "Organisation" },
        { value: "researcher", label: "Researcher" },
        { value: "learner", label: "Learner" },
    ];

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            if (isResetMode) {
                await resetPassword(email);
                toast.success("Password reset link sent to your email!");
                setIsResetMode(false);
                return;
            }

            let identifier = email;

            if (mode === "register") {
                if (password !== confirmPassword) {
                    toast.error("Passwords do not match.");
                    setLoading(false);
                    return;
                }
                if (password.length < 8) {
                    toast.error("Password must be at least 8 characters.");
                    setLoading(false);
                    return;
                }

                // Validate 10-digit phone
                const phoneDigits = phone.replace(/\D/g, "");
                if (phoneDigits.length !== 10) {
                    toast.error("Please enter exactly 10 digits for the mobile number.");
                    setLoading(false);
                    return;
                }

                const fullPhone = countryCode + phoneDigits;

                await signUp(email, password, fullName, fullPhone, currentRole);
                toast.success("Registration successful! Welcome to TheNST.");
                router.push(`/dashboard`);

            } else {
                // Login
                if (loginMethod === "phone") {
                    const phoneDigits = phone.replace(/\D/g, "");
                    if (phoneDigits.length !== 10) {
                        toast.error("Please enter a valid 10-digit mobile number.");
                        setLoading(false);
                        return;
                    }
                    identifier = countryCode + phoneDigits;
                } else {
                    if (!email) {
                        toast.error("Email is required.");
                        setLoading(false);
                        return;
                    }
                    identifier = email;
                }

                const { role: userRole } = await signIn(identifier, password);
                toast.success("Welcome back to TheNST!");

                if (userRole === "superadmin") {
                    router.push("/dashboard/superadmin");
                } else {
                    router.push(`/dashboard`);
                }
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : `${mode === "login" ? "Login" : "Registration"} failed.`;
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-[#171b22] px-4 py-12 relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#d95325]/5 blur-[120px] pointer-events-none" />

            {/* Institutional Box */}
            <div className="w-full max-w-md bg-[#f7f6f2] border border-[#e5e3db] p-8 sm:p-10 shadow-2xl relative z-10">
                {/* Brand Logo Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-baseline gap-0 text-[24px] font-medium tracking-[-1.1px] text-[#171b22] mb-3">
                        <span className="font-sans font-bold">The</span>
                        <span className="font-serif italic font-normal text-[28px] tracking-[-0.5px]">NST</span>
                        <small className="text-[8px] tracking-[1.4px] text-[#737a83] ml-2.5 font-bold uppercase">
                            INSTITUTIONAL
                        </small>
                    </Link>
                    <h1 className="text-3xl font-medium tracking-tight text-[#171b22] mb-1">
                        {isResetMode ? "Reset Password" : (mode === "login" ? "Institutional Sign In" : "Create Account")}
                    </h1>
                    <p className="text-xs text-[#737a83] font-sans">
                        {isResetMode
                            ? "Enter your verified email address to recover credentials."
                            : (mode === "login"
                                ? "Access your command dashboard and sovereign enclave."
                                : "Join the national security talent and research network.")}
                    </p>
                </div>

                {/* Role View Selector */}
                {!isResetMode && (
                    <div className="mb-6 flex flex-col gap-1.5">
                        <Label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#737a83]">
                            SELECT ROLE VIEW
                        </Label>
                        <Select value={currentRole} onValueChange={(v) => setCurrentRole(v as UserRole)}>
                            <SelectTrigger className="h-11 bg-white border-[#e5e3db] text-[#171b22] text-xs font-semibold rounded-none focus:ring-[#d95325]">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-[#e5e3db] rounded-none shadow-xl">
                                <div className="px-3 py-1 text-[9px] font-mono uppercase tracking-widest text-[#737a83] border-b border-[#e5e3db]/60 mb-1">
                                    SELECT ROLE VIEW
                                </div>
                                {roleOptions.map((opt) => (
                                    <SelectItem
                                        key={opt.value}
                                        value={opt.value}
                                        className="py-2.5 text-xs text-[#171b22] focus:bg-[#f7f6f2] focus:text-[#d95325] font-medium cursor-pointer"
                                    >
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {mode === "register" && !isResetMode && (
                        <>
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="fullName" className="text-xs font-semibold text-[#171b22]">Full Name</Label>
                                <Input
                                    id="fullName"
                                    placeholder="Col. Vikramaditya Sen / Jane Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    className="bg-white border-[#e5e3db] text-[#171b22] placeholder:text-[#737a83]/50 focus-visible:ring-[#d95325] h-11 rounded-none text-xs"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="email" className="text-xs font-semibold text-[#171b22]">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="analyst@institution.gov.in"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-white border-[#e5e3db] text-[#171b22] placeholder:text-[#737a83]/50 focus-visible:ring-[#d95325] h-11 rounded-none text-xs"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="phone" className="text-xs font-semibold text-[#171b22]">Mobile Number</Label>
                                <div className="flex gap-2">
                                    <Select value={countryCode} onValueChange={setCountryCode}>
                                        <SelectTrigger className="w-[100px] bg-white border-[#e5e3db] text-[#171b22] h-11 rounded-none text-xs">
                                            <SelectValue placeholder="Code" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e5e3db] rounded-none">
                                            {countryCodes.map((c) => (
                                                <SelectItem key={c.code} value={c.code} className="text-xs">
                                                    {c.flag} {c.code}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="10-digit mobile"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                        required
                                        className="flex-1 bg-white border-[#e5e3db] text-[#171b22] placeholder:text-[#737a83]/50 focus-visible:ring-[#d95325] h-11 rounded-none text-xs"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {mode === "login" && !isResetMode && (
                        <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as "email" | "phone")} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-[#eceae3] border border-[#e5e3db] mb-4 h-10 p-1 rounded-none">
                                <TabsTrigger value="email" className="rounded-none data-[state=active]:bg-white data-[state=active]:text-[#171b22] data-[state=active]:shadow-sm text-xs font-semibold uppercase tracking-wider">Email</TabsTrigger>
                                <TabsTrigger value="phone" className="rounded-none data-[state=active]:bg-white data-[state=active]:text-[#171b22] data-[state=active]:shadow-sm text-xs font-semibold uppercase tracking-wider">Mobile</TabsTrigger>
                            </TabsList>

                            <TabsContent value="email" className="mt-0">
                                <div className="flex flex-col gap-1.5">
                                    <Label htmlFor="loginEmail" className="text-xs font-semibold text-[#171b22]">Email Address</Label>
                                    <Input
                                        id="loginEmail"
                                        type="email"
                                        placeholder="officer@domain.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-white border-[#e5e3db] text-[#171b22] placeholder:text-[#737a83]/50 focus-visible:ring-[#d95325] h-11 rounded-none text-xs"
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="phone" className="mt-0">
                                <div className="flex flex-col gap-1.5">
                                    <Label htmlFor="loginPhone" className="text-xs font-semibold text-[#171b22]">Mobile Number</Label>
                                    <div className="flex gap-2">
                                        <Select value={countryCode} onValueChange={setCountryCode}>
                                            <SelectTrigger className="w-[100px] bg-white border-[#e5e3db] text-[#171b22] h-11 rounded-none text-xs">
                                                <SelectValue placeholder="Code" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-[#e5e3db] rounded-none">
                                                {countryCodes.map((c) => (
                                                    <SelectItem key={c.code} value={c.code} className="text-xs">
                                                        {c.flag} {c.code}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Input
                                            id="loginPhone"
                                            type="tel"
                                            placeholder="10-digit mobile"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                            required
                                            className="flex-1 bg-white border-[#e5e3db] text-[#171b22] placeholder:text-[#737a83]/50 focus-visible:ring-[#d95325] h-11 rounded-none text-xs"
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    )}

                    {isResetMode && (
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="resetEmail" className="text-xs font-semibold text-[#171b22]">Email Address</Label>
                            <Input
                                id="resetEmail"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-white border-[#e5e3db] text-[#171b22] placeholder:text-[#737a83]/50 focus-visible:ring-[#d95325] h-11 rounded-none text-xs"
                            />
                        </div>
                    )}

                    {!isResetMode && (
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-xs font-semibold text-[#171b22]">Password</Label>
                                {mode === "login" && (
                                    <button
                                        type="button"
                                        onClick={() => setIsResetMode(true)}
                                        className="text-[11px] font-semibold text-[#d95325] hover:text-[#bc3f18]"
                                    >
                                        Forgot Password?
                                    </button>
                                )}
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-white border-[#e5e3db] text-[#171b22] placeholder:text-[#737a83]/50 focus-visible:ring-[#d95325] h-11 pr-10 rounded-none text-xs"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737a83] hover:text-[#171b22]"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    )}

                    {mode === "register" && !isResetMode && (
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="confirmPassword" className="text-xs font-semibold text-[#171b22]">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="bg-white border-[#e5e3db] text-[#171b22] placeholder:text-[#737a83]/50 focus-visible:ring-[#d95325] h-11 rounded-none text-xs"
                            />
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 bg-[#d95325] hover:bg-[#bc3f18] text-white text-xs font-semibold tracking-wider uppercase rounded-none mt-2 shadow-sm transition-all"
                    >
                        {loading
                            ? "Processing..."
                            : (isResetMode
                                ? "Send Reset Link"
                                : (mode === "login" ? "Sign In to Platform" : "Create Verified Account"))}
                    </Button>
                </form>

                {/* Footer Switch */}
                <div className="mt-6 pt-4 border-t border-[#e5e3db] text-center text-xs text-[#737a83] font-sans">
                    {isResetMode ? (
                        <button
                            type="button"
                            onClick={() => setIsResetMode(false)}
                            className="font-semibold text-[#d95325] hover:text-[#bc3f18]"
                        >
                            Back to Sign In
                        </button>
                    ) : mode === "login" ? (
                        <p>
                            Don't have an institutional profile?{" "}
                            <Link href="/register" className="font-semibold text-[#d95325] hover:text-[#bc3f18]">
                                Register here
                            </Link>
                        </p>
                    ) : (
                        <p>
                            Already registered?{" "}
                            <Link href="/login" className="font-semibold text-[#d95325] hover:text-[#bc3f18]">
                                Sign In
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
}
