"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, Building, Users, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    role: UserRole;
}

export function AuthForm({ mode, role }: AuthFormProps) {
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

    const [companyName, setCompanyName] = useState("");
    const [website, setWebsite] = useState("");
    const [designation, setDesignation] = useState("");

    const { signIn, signUp, resetPassword } = useAuth();
    const router = useRouter();

    const roleLabels = {
        guard: "Security Professional",
        hr: "Hiring Manager",
        admin: "Admin",
        superadmin: "Super Admin",
        agency: "Security Agency",
        intern: "Intern"
    };

    const roleIcons = {
        guard: Shield,
        hr: Users,
        admin: Building,
        superadmin: Lock,
        agency: Building,
        intern: Shield
    };

    const RoleIcon = roleIcons[currentRole] || Shield;

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
                toast.success("Registration successful! Please complete your profile.");
                router.push(`/dashboard/${currentRole}`);

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
                toast.success("Welcome back!");

                if (userRole === "superadmin") {
                    router.push("/dashboard/superadmin");
                } else {
                    router.push(`/dashboard/${userRole}`);
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
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 relative overflow-hidden">
            {/* Background Gradients - Subtle Tricolour Atmosphere */}
            {/* Background Atmosphere - Clean & Neutral */}
            <div className="absolute inset-0 bg-slate-50/50 pointer-events-none" />


            <Card className="w-full max-w-md relative z-10 border-primary/10 bg-white/95 backdrop-blur-md text-primary shadow-2xl">
                <CardHeader className="text-center">
                    {/* Logo Removed */}
                    <CardTitle className="text-2xl text-primary font-black tracking-[0.2em]">
                        {isResetMode ? "Reset Password" : (mode === "login" ? "Account login" : "Create account")}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground font-bold text-[10px] tracking-widest mt-2">
                        {isResetMode
                            ? "Email Recovery Service"
                            : (mode === "login"
                                ? "Access Secure Dashboard"
                                : `Register as ${roleLabels[currentRole]}`)}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!isResetMode && mode === "register" && (
                        <div className="mb-6 flex flex-col gap-2">
                            <Label className="text-zinc-400 text-xs font-bold uppercase tracking-widest pl-1">I am a/an</Label>
                            <Select value={currentRole} onValueChange={(v) => setCurrentRole(v as UserRole)}>
                                <SelectTrigger className="h-12 bg-white border-ashoka-blue/10 text-ashoka-blue font-medium rounded-xl focus:ring-ashoka-blue">
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-ashoka-blue/10 text-ashoka-blue rounded-xl">
                                    <SelectItem value="guard" className="py-3 focus:bg-ashoka-blue/5 focus:text-ashoka-blue">Security Professional</SelectItem>
                                    <SelectItem value="hr" className="py-3 focus:bg-ashoka-blue/5 focus:text-ashoka-blue">Hiring Manager</SelectItem>
                                    <SelectItem value="agency" className="py-3 focus:bg-ashoka-blue/5 focus:text-ashoka-blue">Security Agency</SelectItem>
                                    <SelectItem value="admin" className="py-3 focus:bg-ashoka-blue/5 focus:text-ashoka-blue">Admin</SelectItem>
                                    <SelectItem value="intern" className="py-3 focus:bg-ashoka-blue/5 focus:text-ashoka-blue">Intern</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {mode === "register" && !isResetMode && (
                            <>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="fullName" className="text-ashoka-blue/70">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        placeholder="John Doe"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        className="bg-white border-ashoka-blue/10 text-ashoka-blue placeholder:text-ashoka-blue/30 focus-visible:ring-ashoka-blue h-12 rounded-xl"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="email" className="text-ashoka-blue/70">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-white border-ashoka-blue/10 text-ashoka-blue placeholder:text-ashoka-blue/30 focus-visible:ring-ashoka-blue h-12 rounded-xl"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="phone" className="text-ashoka-blue/70">Mobile Number</Label>
                                    <div className="flex gap-2">
                                        <Select value={countryCode} onValueChange={setCountryCode}>
                                            <SelectTrigger className="w-[110px] bg-white border-ashoka-blue/10 text-ashoka-blue h-12 rounded-xl">
                                                <SelectValue placeholder="Code" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-ashoka-blue/10 text-ashoka-blue rounded-xl">
                                                {countryCodes.map((c) => (
                                                    <SelectItem key={c.code} value={c.code}>
                                                        <span className="flex items-center gap-2">
                                                            <span>{c.flag}</span>
                                                            <span>{c.code}</span>
                                                        </span>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="10-digit number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                            required
                                            className="flex-1 bg-white border-ashoka-blue/10 text-ashoka-blue placeholder:text-ashoka-blue/30 focus-visible:ring-ashoka-blue h-12 rounded-xl"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {mode === "login" && !isResetMode && (
                            <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as "email" | "phone")} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 bg-slate-100 border border-ashoka-blue/5 mb-4 h-11 p-1 rounded-xl">
                                    <TabsTrigger value="email" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-ashoka-blue data-[state=active]:shadow-sm transition-all text-xs font-bold tracking-widest">Email</TabsTrigger>
                                    <TabsTrigger value="phone" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-ashoka-blue data-[state=active]:shadow-sm transition-all text-xs font-bold tracking-widest">Mobile</TabsTrigger>
                                </TabsList>

                                <TabsContent value="email" className="mt-0">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="email" className="text-ashoka-blue/70">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required={loginMethod === "email"}
                                            className="bg-white border-ashoka-blue/10 text-ashoka-blue placeholder:text-ashoka-blue/30 focus-visible:ring-ashoka-blue h-12 rounded-xl"
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="phone" className="mt-0">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="phone" className="text-ashoka-blue/70">Mobile Number</Label>
                                        <div className="flex gap-2">
                                            <Select value={countryCode} onValueChange={setCountryCode}>
                                                <SelectTrigger className="w-[110px] bg-white border-ashoka-blue/10 text-ashoka-blue h-12 rounded-xl">
                                                    <SelectValue placeholder="Code" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border-ashoka-blue/10 text-ashoka-blue rounded-xl">
                                                    {countryCodes.map((c) => (
                                                        <SelectItem key={c.code} value={c.code}>
                                                            <span className="flex items-center gap-2">
                                                                <span>{c.flag}</span>
                                                                <span>{c.code}</span>
                                                            </span>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="10-digit number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                                required={loginMethod === "phone"}
                                                className="flex-1 bg-white border-ashoka-blue/10 text-ashoka-blue placeholder:text-ashoka-blue/30 focus-visible:ring-ashoka-blue h-12 rounded-xl"
                                            />
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        )}

                        {isResetMode && (
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email" className="text-ashoka-blue/70">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-white border-ashoka-blue/10 text-ashoka-blue placeholder:text-ashoka-blue/30 focus-visible:ring-ashoka-blue h-12 rounded-xl"
                                />
                            </div>
                        )}

                        {!isResetMode && (
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-ashoka-blue/70">Password</Label>
                                    {mode === "login" && (
                                        <button
                                            type="button"
                                            onClick={() => setIsResetMode(true)}
                                            className="text-xs text-black hover:underline font-bold"
                                        >
                                            Forgot password?
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder={mode === "register" ? "Min 8 characters" : "Enter password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="bg-white border-ashoka-blue/10 text-ashoka-blue placeholder:text-ashoka-blue/30 focus-visible:ring-ashoka-blue h-12 rounded-xl pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        )}

                        {mode === "register" && !isResetMode && (
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="confirmPassword" className="text-ashoka-blue/70">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Re-enter password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="bg-white border-ashoka-blue/10 text-ashoka-blue placeholder:text-ashoka-blue/30 focus-visible:ring-ashoka-blue h-12 rounded-xl"
                                />
                            </div>
                        )}

                        <Button type="submit" className="mt-4 h-12 w-full bg-ashoka-blue hover:bg-ashoka-blue/90 text-white font-black rounded-xl shadow-lg shadow-ashoka-blue/20 transition-all border-none tracking-widest" disabled={loading}>
                            {loading
                                ? (isResetMode ? "Processing..." : (mode === "login" ? "Verifying..." : "Registering..."))
                                : (isResetMode ? "Send reset link" : (mode === "login" ? "Sign in" : "Create account"))}
                        </Button>
                    </form>

                    {isResetMode ? (
                        <div className="mt-6 text-center text-sm">
                            <button
                                onClick={() => setIsResetMode(false)}
                                className="text-ashoka-blue/40 hover:text-ashoka-blue transition-colors font-bold uppercase tracking-widest text-[10px]"
                            >
                                ← Back to Login
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="mt-6 text-center text-sm text-ashoka-blue/60 font-medium">
                                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                                <Link
                                    href={mode === "login" ? "/register" : "/login"}
                                    className="font-black text-black hover:underline decoration-black/30 underline-offset-4"
                                >
                                    {mode === "login" ? "Register here" : "Sign in"}
                                </Link>
                            </p>
                        </>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
