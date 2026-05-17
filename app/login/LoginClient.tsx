"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion, type Transition } from "motion/react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  LogIn,
  UserPlus,
  UserRound,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Vote,
  Activity
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, type ReactNode, useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ─── Static copy ─────────────────────────────────────────────────────────────

interface SearchedStudent {
  usn: string;
  firstName: string;
  lastName: string;
  middleName: string;
  course: string;
  section: string;
}

const authCopy = {
  login: {
    heading: "Student Login",
    description: "Sign in to cast your vote for the upcoming election.",
  },
  register: {
    heading: "Student Registration",
    description: "Register your account to participate in ACLC voting.",
  },
} as const;

export default function LoginClient() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [searchedStudent, setSearchedStudent] = useState<SearchedStudent | null>(null);
  const [timeLeft, setTimeLeft] = useState("08:00:00");
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();

  const handleTabChange = (tab: "login" | "register") => {
    setActiveTab(tab);
    setSearchedStudent(null);
  };

  useEffect(() => {
    const target = new Date();
    target.setHours(17, 0, 0, 0); // 5:00 PM today
    if (target.getTime() < Date.now()) {
      target.setDate(target.getDate() + 1); // 5 PM tomorrow if it passed
    }
    const update = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("00:00:00");
        return;
      }
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const contentTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="h-screen overflow-hidden bg-background">
      <main className="animate-rise-in grid h-screen lg:grid-cols-[0.7fr_1.3fr]">
        {/* ── Left panel — Form ── */}
        <section className="relative flex items-center justify-center overflow-y-auto bg-linear-to-b from-blue-50 to-white p-6 sm:p-8 lg:p-10 z-10">
          {/* Subtle Security Pattern Background */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: `radial-gradient(var(--primary-accent) 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} 
          />
          
          <div className="mx-auto flex h-full w-full max-w-md flex-col relative z-10">
            {/* Live Status Indicator */}
            <div className="flex justify-between items-center bg-emerald-50/70 border border-emerald-100/80 rounded-2xl p-2 mb-4 shadow-xs">
              <div className="flex items-center gap-2 pl-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-700">Election Live</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 bg-emerald-100/50 px-2.5 py-1 rounded-lg border border-emerald-200/40">
                <span className="text-[9px] uppercase font-sans tracking-wider text-emerald-600 font-semibold">Ends In:</span>
                <span>{timeLeft}</span>
              </div>
            </div>

            {/* Logo + heading */}
            <div className="space-y-1 text-center">
              <motion.div
                animate={{ scale: 1, opacity: 1 }}
                initial={{ scale: 0.94, opacity: 0 }}
                transition={contentTransition}
                className="flex flex-col items-center"
              >
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="relative">
                    <Image
                      src="/img/logo/SSC LOGO.png"
                      alt="SSC Logo"
                      width={60}
                      height={60}
                      className="h-14 w-14 object-contain"
                      priority
                    />
                  </div>
                  <div className="relative">
                    <Image
                      src="/img/logo/aclclogo.png"
                      alt="ACLC Logo"
                      width={70}
                      height={70}
                      className="h-16 w-16 object-contain"
                      priority
                    />
                  </div>
                  <div className="relative">
                    <Image
                      src="/img/logo/SSLG LOGO.png"
                      alt="SSLG Logo"
                      width={60}
                      height={60}
                      className="h-14 w-14 object-contain"
                      priority
                    />
                  </div>
                </div>
                <p className="font-lexend text-xs font-bold tracking-widest text-primary-accent uppercase">
                  ACLC Voting System
                </p>
              </motion.div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                  transition={contentTransition}
                  className="mt-4"
                >
                  <h2 className="font-lexend text-2xl font-bold tracking-tight text-primary">
                    {authCopy[activeTab].heading}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {authCopy[activeTab].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Tab switcher */}
            <LayoutGroup id="auth-tabs">
              <div className="relative mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-primary-soft p-1.5 shadow-inner">
                <AuthTabButton
                  active={activeTab === "login"}
                  onClick={() => handleTabChange("login")}
                  transition={contentTransition}
                  icon={<LogIn size={16} aria-hidden="true" />}
                >
                  Sign In
                </AuthTabButton>
                <AuthTabButton
                  active={activeTab === "register"}
                  onClick={() => handleTabChange("register")}
                  transition={contentTransition}
                  icon={<UserPlus size={16} aria-hidden="true" />}
                >
                  Register
                </AuthTabButton>
              </div>
            </LayoutGroup>

            {/* Forms */}
            <div className="relative mt-5 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                {activeTab === "login" ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -18, filter: "blur(6px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: shouldReduceMotion ? 0 : 18, filter: "blur(6px)" }}
                    transition={contentTransition}
                  >
                    <LoginForm onSuccess={() => router.push("/dashboard")} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 18, filter: "blur(6px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -18, filter: "blur(6px)" }}
                    transition={contentTransition}
                  >
                    <RegisterForm 
                      onSuccess={() => handleTabChange("login")} 
                      searchedStudent={searchedStudent}
                      setSearchedStudent={setSearchedStudent}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Voting Stepper / Guide */}
            {!searchedStudent && (
              <>
                <div className="mt-6 pt-4 border-t border-slate-100/80 space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                    Secure Ballot Steps
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center p-2 rounded-xl bg-blue-50/40 border border-blue-100/50 shadow-xs">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-accent text-white font-lexend font-bold text-xs mb-1 shadow-sm shadow-blue-500/20">
                        1
                      </div>
                      <span className="text-[10px] font-bold text-primary text-center leading-tight">Verify USN</span>
                      <span className="text-[8px] font-bold text-primary-accent mt-0.5 uppercase tracking-wider animate-pulse">Active</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50/60 border border-slate-100 opacity-60">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 text-slate-500 font-lexend font-bold text-xs mb-1">
                        2
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Cast Ballot</span>
                      <span className="text-[8px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">Pending</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50/60 border border-slate-100 opacity-60">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 text-slate-500 font-lexend font-bold text-xs mb-1">
                        3
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Confirmation</span>
                      <span className="text-[8px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">Pending</span>
                    </div>
                  </div>
                </div>

                {/* Live Turnout Progress */}
                <div className="mt-4 p-3 rounded-2xl bg-white/60 border border-blue-100/30 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                    <span className="uppercase tracking-wider">Voter Turnout Rate</span>
                    <span className="text-primary-accent">78.4% Participated</span>
                  </div>
                  <div className="relative h-1.5 w-full bg-slate-200/60 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "78.4%" }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      className="h-full bg-linear-to-r from-blue-500 to-primary-accent rounded-full" 
                    />
                  </div>
                  <p className="text-[9px] font-medium text-slate-400 text-center leading-none">
                    1,568 out of 2,000 registered students have cast their votes.
                  </p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* ── Right panel — Single Static Background Image ── */}
        <section 
          className="relative hidden overflow-hidden lg:flex flex-col justify-between p-12 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/img/bg/437193639_294729263681669_8443938025331276693_n.jpg')` }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-blue-950/85 via-blue-950/60 to-slate-950/95" />
          
          {/* Top Header Block - Placed at the top and bigger on a different container */}
          {/* Top Header Block - Placed at the top and bigger with NO container */}
          <div className="relative z-10 animate-fade-in self-start">
            <div className="flex items-center gap-5">
              <Image 
                src="/img/logo/aclclogo.png" 
                alt="ACLC Logo" 
                width={56} 
                height={56} 
                className="object-contain drop-shadow-lg" 
              />
              <div className="flex flex-col" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                <span className="text-3xl font-black uppercase tracking-widest text-white leading-none">
                  ACLC Student Council
                </span>
                <span className="flex items-center gap-1.5 text-sm font-black uppercase tracking-widest text-blue-300 mt-2 leading-none">
                  <Vote size={16} />
                  Official Voting Portal
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Description Block */}
          <div className="relative z-10 max-w-xl text-white space-y-4 animate-fade-in-up" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            <div className="space-y-2">
              <h3 className="font-lexend text-3xl font-extrabold tracking-tight leading-tight text-white">
                Empower Your Voice, Shape Our Future
              </h3>
              <p className="text-sm text-slate-100 leading-relaxed font-normal">
                Welcome to the ACLC Official Student Voting Portal. Your vote is your power to choose leaders who will advocate for your academic journey and lead our student community towards excellence.
              </p>
            </div>
            <div className="pt-5 flex items-center gap-8 text-sm text-white border-t border-white/20">
              <div className="flex items-center gap-2.5 font-bold">
                <LockKeyhole size={18} className="text-blue-400 drop-shadow-md" />
                <span>Encrypted Ballot</span>
              </div>
              <div className="flex items-center gap-2.5 font-bold">
                <Activity size={18} className="text-blue-400 drop-shadow-md" />
                <span>Real-time Tallying</span>
              </div>
              <div className="flex items-center gap-2.5 font-bold">
                <UserRound size={18} className="text-blue-400 drop-shadow-md" />
                <span>One Student, One Vote</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>


  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

type AuthTabButtonProps = {
  active: boolean;
  children: ReactNode;
  icon: ReactNode;
  onClick: () => void;
  transition: Transition;
};

function AuthTabButton({ active, children, icon, onClick, transition }: AuthTabButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl px-4 py-3 text-sm font-semibold transition-colors outline-none",
        active ? "text-primary-accent" : "text-slate-500 hover:text-slate-700"
      )}
      onClick={onClick}
    >
      {active && (
        <motion.span
          layoutId="auth-tab-indicator"
          className="absolute inset-0 rounded-xl bg-white shadow-sm ring-1 ring-black/5"
          transition={transition}
        />
      )}
      <span className="font-lexend relative z-10 inline-flex items-center justify-center gap-2">
        {icon}
        {children}
      </span>
    </button>
  );
}



// ─── Login form ───────────────────────────────────────────────────────────────

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const usn = String(formData.get("usn") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!usn || !password) {
      toast.error("Please enter both USN and password.", {
        icon: <AlertCircle className="h-5 w-5 text-rose-500" />
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usn, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Authentication failed.", {
          icon: <AlertCircle className="h-5 w-5 text-rose-500" />
        });
        return;
      }
      
      toast.success(`Welcome back, ${data.student.fullName}! Accessing voting dashboard...`, {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      });
      onSuccess();
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Authentication failed. Please check your credentials.";
      toast.error(errorMessage, {
        icon: <AlertCircle className="h-5 w-5 text-rose-500" />
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit} noValidate>
      <InputField
        id="usn"
        label="USN"
        type="text"
        placeholder="Enter your USN"
        icon={<UserRound size={18} />}
        disabled={isSubmitting}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={<LockKeyhole size={18} />}
        disabled={isSubmitting}
      />
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="font-lexend flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary-accent px-4 py-2.5 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:shadow-blue-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 mt-1"
      >
        {isSubmitting ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <ShieldCheck size={18} />
        )}
        {isSubmitting ? "Authenticating..." : "Verify & Sign In"}
      </button>
    </form>
  );
}

// ─── Register form ────────────────────────────────────────────────────────────

function RegisterForm({
  onSuccess,
  searchedStudent,
  setSearchedStudent,
}: {
  onSuccess: () => void;
  searchedStudent: SearchedStudent | null;
  setSearchedStudent: (s: SearchedStudent | null) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usnInput, setUsnInput] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // If we haven't searched the student yet, this is the SEARCH step!
    if (!searchedStudent) {
      if (!usnInput.trim()) {
        toast.error("Please enter your USN.", {
          icon: <AlertCircle className="h-5 w-5 text-rose-500" />
        });
        return;
      }

      try {
        setIsSubmitting(true);

        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: usnInput.trim() }),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error || "Search failed.", {
            icon: <AlertCircle className="h-5 w-5 text-rose-500" />
          });
          return;
        }

        toast.success(data.message || "Student search complete! Record found.", {
          icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        });
        setSearchedStudent(data.student);
      } catch (err: unknown) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : "USN search failed. Student record not found.";
        toast.error(errorMessage, {
          icon: <AlertCircle className="h-5 w-5 text-rose-500" />
        });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Otherwise, this is the final PASSWORD REGISTER step!
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");

    if (!password) {
      toast.error("Please set a password for your account.", {
        icon: <AlertCircle className="h-5 w-5 text-rose-500" />
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: searchedStudent.usn, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Registration failed.", {
          icon: <AlertCircle className="h-5 w-5 text-rose-500" />
        });
        return;
      }

      toast.success(data.message || "Registration successful! You can now sign in.", {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      });
      onSuccess();
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Registration failed. Please try again.";
      toast.error(errorMessage, {
        icon: <AlertCircle className="h-5 w-5 text-rose-500" />
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-3.5" onSubmit={onSubmit} noValidate>
      <InputField
        id="studentId"
        label="USN"
        type="text"
        placeholder="Enter your USN"
        icon={<UserRound size={18} />}
        disabled={isSubmitting || searchedStudent !== null}
        value={searchedStudent ? searchedStudent.usn : usnInput}
        onChange={(e) => setUsnInput(e.target.value)}
      />

      {searchedStudent && (
        <>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200/50 text-amber-800 text-[11px] font-semibold mt-1">
            <HelpCircle className="h-4.5 w-4.5 text-amber-600 shrink-0" />
            <span>Are you sure this is you? Please check your details before continuing.</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-1">
            <InputField
              id="firstName"
              label="First Name"
              type="text"
              placeholder=""
              icon={<UserRound size={14} />}
              readOnly
              value={searchedStudent.firstName}
            />
            <InputField
              id="lastName"
              label="Last Name"
              type="text"
              placeholder=""
              icon={<UserRound size={14} />}
              readOnly
              value={searchedStudent.lastName}
            />
            <InputField
              id="middleName"
              label="Middle Name"
              type="text"
              placeholder=""
              icon={<UserRound size={14} />}
              readOnly
              value={searchedStudent.middleName || "—"}
            />
            <InputField
              id="section"
              label="Section"
              type="text"
              placeholder=""
              icon={<ShieldCheck size={14} />}
              readOnly
              value={searchedStudent.section}
            />
            <div className="col-span-2">
              <InputField
                id="course"
                label="Course"
                type="text"
                placeholder=""
                icon={<ShieldCheck size={14} />}
                readOnly
                value={searchedStudent.course}
              />
            </div>
          </div>

          <InputField
            id="password"
            label="Set Password"
            type="password"
            placeholder="Create a secure password"
            icon={<LockKeyhole size={18} />}
            disabled={isSubmitting}
          />
        </>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="font-lexend flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary-accent px-4 py-2.5 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 mt-2"
      >
        <UserPlus size={18} />
        {isSubmitting
          ? searchedStudent ? "Registering..." : "Searching..."
          : searchedStudent ? "Register & Create Account" : "Search Student"}
      </button>
    </form>
  );
}

// ─── Shared input field ───────────────────────────────────────────────────────

type InputFieldProps = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({
  id,
  label,
  type,
  placeholder,
  icon,
  disabled = false,
  readOnly = false,
  value,
  defaultValue,
  onChange,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="font-lexend flex items-center gap-2 text-sm font-semibold text-primary">
        <span className="text-slate-400">{icon}</span>
        {label}
      </label>
      <div className="relative group">
        <input
          id={id}
          name={id}
          type={resolvedType}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          className={cn(
            "w-full rounded-xl border border-line bg-surface-strong px-3.5 py-2 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-primary-accent focus:ring-4 focus:ring-blue-100 disabled:opacity-60",
            readOnly && "bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed focus:ring-0 focus:border-slate-200"
          )}
        />
        {isPassword && !readOnly && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-primary-accent transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
