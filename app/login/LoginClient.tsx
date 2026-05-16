"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion, type Transition } from "motion/react";
import {
  Construction,
  Eye,
  EyeOff,
  LockKeyhole,
  LogIn,
  Mail,
  UserPlus,
  UserRound,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, type ReactNode, useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// ─── Static copy ─────────────────────────────────────────────────────────────

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

// ─── Constants ─────────────────────────────────────────────────────────────

const BACKGROUND_IMAGES = [
  "/img/bg/487504859_1103237165156296_9068684090957355681_n.jpg",
  "/img/bg/487792077_1103724245107588_6946238724504402471_n.jpg",
  "/img/bg/487818438_1103724265107586_1566616198544260297_n.jpg",
  "/img/bg/487997325_1103738515106161_1743352002758202848_n.jpg",
  "/img/bg/488502142_1105161598297186_1204773431847924387_n.jpg",
  "/img/bg/667585274_1422103136603029_7793980385051577507_n.jpg",
  "/img/bg/668412337_1422103049936371_6881423643504357290_n.jpg",
  "/img/bg/668434195_1422103079936368_4368765746477651947_n.jpg",
];

// ─── Root component ───────────────────────────────────────────────────────────

export default function LoginClient() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const contentTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="h-screen overflow-hidden bg-background">
      <main className="animate-rise-in grid h-screen lg:grid-cols-[0.7fr_1.3fr]">
        {/* ── Left panel — Form ── */}
        <section className="relative flex items-center justify-center overflow-y-auto bg-linear-to-b from-blue-50 to-white p-8 sm:p-10 lg:p-12 z-10">
          {/* Subtle Security Pattern Background */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: `radial-gradient(var(--primary-accent) 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} 
          />
          
          <div className="mx-auto flex h-full w-full max-w-md flex-col relative z-10">
            {/* Live Status Indicator */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-emerald-600 ring-1 ring-emerald-100 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Election Period Live
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
                <div className="flex items-center justify-center gap-4 mb-3">
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
                  className="mt-6"
                >
                  <h2 className="font-lexend text-3xl font-bold tracking-tight text-primary">
                    {authCopy[activeTab].heading}
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-500">
                    {authCopy[activeTab].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Tab switcher */}
            <LayoutGroup id="auth-tabs">
              <div className="relative mt-8 grid grid-cols-2 gap-2 rounded-2xl bg-primary-soft p-1.5 shadow-inner">
                <AuthTabButton
                  active={activeTab === "login"}
                  onClick={() => setActiveTab("login")}
                  transition={contentTransition}
                  icon={<LogIn size={16} aria-hidden="true" />}
                >
                  Sign In
                </AuthTabButton>
                <AuthTabButton
                  active={activeTab === "register"}
                  onClick={() => setActiveTab("register")}
                  transition={contentTransition}
                  icon={<UserPlus size={16} aria-hidden="true" />}
                >
                  Register
                </AuthTabButton>
              </div>
            </LayoutGroup>

            {/* Forms */}
            <div className="relative mt-8 flex-1">
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
                    <RegisterForm onSuccess={() => setActiveTab("login")} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── Right panel — Slideshow ── */}
        <section className="relative hidden overflow-hidden lg:block bg-slate-900">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentBgIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${BACKGROUND_IMAGES[currentBgIndex]}')` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-linear-to-br from-blue-900/40 via-transparent to-black/40" />
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
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      // Simulated delay
      await new Promise(r => setTimeout(r, 1500));
      
      toast.success("Welcome back! Accessing voting dashboard...");
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Authentication failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
      <InputField
        id="email"
        label="USN or Student ID"
        type="text"
        placeholder="Enter your student ID or email"
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

      <div className="flex items-center justify-between text-sm">
        <label className="inline-flex cursor-pointer items-center gap-2 text-slate-500 group">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-line accent-primary-accent cursor-pointer"
          />
          <span className="group-hover:text-slate-700 transition-colors">Remember me</span>
        </label>
        
        <Dialog>
          <DialogTrigger className="cursor-pointer font-semibold text-primary-accent hover:underline decoration-2 underline-offset-4">
            Forgot password?
          </DialogTrigger>
          <DialogContent className="sm:max-w-md gap-4 overflow-hidden border-none shadow-2xl" showCloseButton={false}>
            <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-blue-400 via-indigo-500 to-blue-600" />
            <div className="flex flex-col items-center text-center px-2 pt-4">
              <div className="relative mb-6">
                <span className="absolute inset-0 h-20 w-20 animate-ping rounded-full bg-blue-100 opacity-40" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-blue-50 to-indigo-50 shadow-inner ring-4 ring-white">
                  <Construction size={36} className="text-blue-500" />
                </div>
              </div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-blue-700 ring-1 ring-blue-100">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                In Development
              </div>

              <DialogHeader className="items-center gap-2">
                <DialogTitle className="font-lexend text-2xl font-bold text-primary">
                  Password Recovery
                </DialogTitle>
                <DialogDescription className="max-w-xs text-slate-500 leading-relaxed">
                  We are currently upgrading our security systems. Password recovery will be available shortly.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 w-full rounded-2xl bg-slate-50 p-4 text-left border border-slate-100">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Quick Solution</p>
                <p className="text-sm text-slate-500">
                  Please visit the MIS Department or contact your local student council representative for a manual password reset.
                </p>
              </div>
            </div>
            <DialogFooter className="mt-4" showCloseButton />
          </DialogContent>
        </Dialog>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="font-lexend flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary-accent px-4 py-3 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:shadow-blue-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 mt-2"
      >
        {isSubmitting ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <ShieldCheck size={20} />
        )}
        {isSubmitting ? "Authenticating..." : "Verify & Sign In"}
      </button>
    </form>
  );
}

// ─── Register form ────────────────────────────────────────────────────────────

function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const studentId = String(formData.get("studentId") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!studentId || !email || !password) {
      toast.error("Please fill in all registration fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise(r => setTimeout(r, 2000));
      toast.success("Registration successful! You can now sign in.");
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
      <InputField
        id="studentId"
        label="Student ID"
        type="text"
        placeholder="e.g. 2023-00001"
        icon={<UserRound size={18} />}
        disabled={isSubmitting}
      />
      <InputField
        id="email"
        label="Email Address"
        type="email"
        placeholder="student@aclc.edu.ph"
        icon={<Mail size={18} />}
        disabled={isSubmitting}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="Create a secure password"
        icon={<LockKeyhole size={18} />}
        disabled={isSubmitting}
      />
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="font-lexend flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary-accent px-4 py-3 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 mt-4"
      >
        <UserPlus size={20} />
        {isSubmitting ? "Creating Account..." : "Create Account"}
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
};

function InputField({ id, label, type, placeholder, icon, disabled = false }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;

  return (
    <div className="space-y-1.5">
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
          className="w-full rounded-xl border border-line bg-surface-strong px-3.5 py-2.5 text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-primary-accent focus:ring-4 focus:ring-blue-100 disabled:opacity-60"
        />
        {isPassword && (
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
