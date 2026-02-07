import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Check, X, AlertCircle, MapPin } from 'lucide-react';
import clsx from 'clsx';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// --- Assets & Constants ---
const SHOWCASE_IMAGES = [
    {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
        title: "Luxury Penthouse in Manhattan",
        location: "New York, NY",
        price: "$4,250,000",
        specs: "3 Bed • 2 Bath • 2,400 sq ft"
    },
    {
        url: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop",
        title: "Oceanfront Glass Villa",
        location: "Malibu, CA",
        price: "$12,800,000",
        specs: "5 Bed • 6 Bath • 5,200 sq ft"
    },
    {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
        title: "Skyline Haven",
        location: "Downtown Dubai",
        price: "$9,500,000",
        specs: "4 Bed • 4.5 Bath • 4,100 sq ft"
    }
];

// --- Sub-components ---

const FloatingInput = ({ label, register, name, value, type = "text", error, rules }) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Custom password toggle logic
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    // Check if input has value to keep label floating
    const isFilled = value && value.length > 0;

    return (
        <div className="relative mb-6">
            <div
                className={clsx(
                    "relative border-2 rounded-lg transition-all duration-250 ease-out bg-white h-[58px] flex items-center px-4",
                    error ? "border-red-500" : focused ? "border-luxury-gold shadow-[0_0_0_4px_rgba(212,175,55,0.1)]" : "border-luxury-charcoal/10"
                )}
            >
                <label
                    className={clsx(
                        "absolute left-4 pointer-events-none transition-all duration-250 ease-out font-medium font-sans",
                        (focused || isFilled) ? "text-xs -translate-y-[20px] bg-white px-1 text-luxury-gold" : "text-[15px] translate-y-0 text-gray-500"
                    )}
                >
                    {label}
                </label>

                <input
                    {...register(name, {
                        ...rules,
                        onBlur: () => setFocused(false)
                    })}
                    onFocus={() => setFocused(true)}
                    type={inputType}
                    className="w-full h-full bg-transparent outline-none font-sans text-[15px] text-luxury-charcoal"
                />

                {/* Validation Icons */}
                <AnimatePresence>
                    {!error && isFilled && !isPassword && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.15, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Check className="w-5 h-5 text-green-500" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="ml-2 text-gray-400 hover:text-luxury-charcoal transition-colors focus:outline-none"
                    >
                        <motion.div
                            key={showPassword ? "eye-off" : "eye"}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </motion.div>
                    </button>
                )}
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center mt-1 space-x-1 text-red-500 text-[13px] font-medium font-sans"
                    >
                        <AlertCircle size={14} />
                        <span>{error.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const PasswordStrength = ({ password }) => {
    if (!password) return null;

    const getStrength = (pass) => {
        let score = 0;
        if (pass.length > 5) score += 1;
        if (pass.length > 8) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        return score; // 0-4
    };

    const score = getStrength(password);
    const width = Math.min((score / 4) * 100, 100);

    let color = '#e74c3c'; // Red
    let label = 'Weak';
    if (score >= 2) { color = '#f39c12'; label = 'Medium'; } // Orange
    if (score >= 4) { color = '#27ae60'; label = 'Strong'; } // Green

    return (
        <div className="mt-[-10px] mb-6">
            <div className="h-[3px] w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full"
                    initial={{ width: 0, backgroundColor: '#e74c3c' }}
                    animate={{ width: `${width}%`, backgroundColor: color }}
                    transition={{ duration: 0.4 }}
                />
            </div>
            <div className="flex justify-between mt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Security</span>
                <AnimatePresence mode='wait'>
                    <motion.span
                        key={label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color }}
                    >
                        {label}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
};

const SocialButton = ({ icon, text }) => (
    <button className="flex items-center justify-center space-x-3 w-full h-[54px] bg-white border-2 border-luxury-charcoal/10 rounded-lg hover:border-luxury-gold/40 hover:bg-luxury-gold/5 transition-all duration-300 group">
        <img src={icon} alt={text} className="w-5 h-5 group-hover:scale-115 transition-transform duration-300" />
        <span className="font-sans font-medium text-sm text-luxury-charcoal">{text}</span>
    </button>
);

// --- Main Component ---

export default function AuthPage({ mode = 'login' }) {
    const isLogin = mode === 'login';
    const navigate = useNavigate();
    const { signIn, signUp } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [authError, setAuthError] = useState('');
    const [activeImage, setActiveImage] = useState(0);

    // Form Hooks
    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm();
    const passwordValue = watch("password");
    const emailValue = watch("email");
    const nameValue = watch("name");

    // Load saved email
    useEffect(() => {
        const savedEmail = localStorage.getItem('urbanplot_remember');
        if (savedEmail) {
            setValue('email', savedEmail);
            setValue('remember', true);
        }
    }, [setValue]);

    // Carousel timer
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % SHOWCASE_IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Toggle Handler
    const toggleMode = () => {
        navigate(isLogin ? '/signup' : '/login');
    };

    const onClose = () => {
        navigate('/');
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setAuthError('');

        // Save/Remove Remember Me
        if (data.remember) {
            localStorage.setItem('urbanplot_remember', data.email);
        } else {
            localStorage.removeItem('urbanplot_remember');
        }

        try {
            if (isLogin) {
                const { error } = await signIn(data.email, data.password);
                if (error) throw error;
            } else {
                const { error } = await signUp(data.email, data.password, { name: data.name });
                if (error) throw error;
            }

            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            console.error("Auth Error:", err);
            setAuthError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex bg-luxury-ivory overflow-hidden"
        >

            {/* --- LEFT PANEL: Form --- */}
            <div className="w-full lg:w-[45%] relative flex flex-col p-8 bg-luxury-ivory h-full overflow-y-auto">

                {/* Background Texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

                {/* Logo & Header Row */}
                <div className="flex justify-between items-center w-full z-20 mb-8 min-h-[40px]">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-8 h-8 border border-luxury-gold transform rotate-45 flex items-center justify-center">
                            <div className="w-4 h-4 bg-luxury-gold/50" />
                        </div>
                        <span className="font-serif font-bold text-xl tracking-widest uppercase text-luxury-charcoal">UrbanPlot</span>
                    </motion.div>

                    {/* Close Button (Mobile) */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        onClick={onClose}
                        className="lg:hidden text-luxury-charcoal"
                    >
                        <X size={24} />
                    </motion.button>
                </div>

                {/* Form Container */}
                <motion.div
                    className="w-full max-w-[440px] relative z-10 mx-auto my-auto"
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    {/* Headline */}
                    <div className="mb-10 text-center lg:text-left">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={isLogin ? 'login-head' : 'signup-head'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h1 className="font-serif text-[44px] font-semibold text-luxury-charcoal leading-tight mb-2">
                                    {isLogin ? "Welcome Back" : "Start Your Journey"}
                                </h1>
                                <p className="font-sans text-luxury-charcoal/60 text-[16px]">
                                    {isLogin ? "Access your curated portfolio" : "Find your perfect property"}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Form Box */}
                    <div className="bg-white/60 backdrop-blur-md rounded-xl border border-luxury-taupe/30 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 lg:p-12 transition-all duration-500">
                        <AnimatePresence mode="wait">
                            <motion.form
                                key={isLogin ? "login" : "signup"}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4 }}
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-2"
                            >
                                {!isLogin && (
                                    <FloatingInput
                                        name="name"
                                        label="Full Name"
                                        value={nameValue}
                                        register={register}
                                        rules={{ required: "Name is required" }}
                                        error={errors.name}
                                    />
                                )}

                                <FloatingInput
                                    name="email"
                                    label="Email Address"
                                    value={emailValue}
                                    type="email"
                                    register={register}
                                    rules={{
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                                    }}
                                    error={errors.email}
                                />

                                <FloatingInput
                                    name="password"
                                    label="Password"
                                    value={passwordValue}
                                    type="password"
                                    register={register}
                                    rules={{
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Min 8 characters" }
                                    }}
                                    error={errors.password}
                                />

                                {!isLogin && <PasswordStrength password={passwordValue} />}

                                <div className="flex items-center justify-between mb-8">
                                    <label className="flex items-center space-x-3 cursor-pointer group">
                                        <div className="relative w-5 h-5 border-2 border-luxury-charcoal/20 rounded bg-white group-hover:border-luxury-gold transition-colors flex items-center justify-center">
                                            <input type="checkbox" className="peer w-full h-full opacity-0 absolute cursor-pointer" {...register("remember")} />
                                            <Check className="w-3.5 h-3.5 text-luxury-gold opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                                        </div>
                                        <span className="text-sm font-sans text-luxury-charcoal/70 group-hover:text-luxury-gold transition-colors">
                                            {isLogin ? "Remember me" : <span>I agree to <a href="#" className="underline decoration-luxury-gold">Terms</a></span>}
                                        </span>
                                    </label>

                                    {isLogin && (
                                        <a href="#" className="text-sm font-medium font-sans text-luxury-gold hover:text-luxury-gold/80 relative group">
                                            Forgot Password?
                                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    )}
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading || success}
                                        className="w-full h-[58px] rounded-lg bg-gradient-to-br from-luxury-gold to-[#b8941f] text-white font-sans text-sm font-bold uppercase tracking-[2px] shadow-[0_10px_30px_rgba(212,175,55,0.25)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.35)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                                    >
                                        <AnimatePresence mode="wait">
                                            {loading ? (
                                                <motion.div
                                                    key="loader"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"
                                                />
                                            ) : success ? (
                                                <motion.div
                                                    key="success"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1.2 }}
                                                >
                                                    <Check size={24} strokeWidth={3} />
                                                </motion.div>
                                            ) : (
                                                <motion.span
                                                    key="text"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="flex items-center"
                                                >
                                                    {isLogin ? "Sign In" : "Create Account"}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </div>

                                {/* Social Login */}
                                <div className="mt-8">
                                    <div className="relative flex justify-center text-sm mb-6">
                                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-luxury-charcoal/10"></div></div>
                                        <span className="relative bg-white/60 px-4 font-medium text-luxury-charcoal/40 backdrop-blur-sm">Or continue with</span>
                                    </div>
                                    <div className="flex gap-4">
                                        {/* Using placeholders for social icons */}
                                        <SocialButton icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" text="Google" />
                                        <SocialButton icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" text="Apple" />
                                    </div>
                                </div>

                                {/* Error Message (General) */}
                                <AnimatePresence>
                                    {authError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center mt-4 space-x-1 text-red-500 text-[13px] font-medium font-sans justify-center"
                                        >
                                            <AlertCircle size={14} />
                                            <span>{authError}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Toggle Link */}
                                <div className="mt-8 text-center">
                                    <p className="font-sans text-sm text-luxury-charcoal/60">
                                        {isLogin ? "Don't have an account?" : "Already a member?"}
                                        <button
                                            type="button"
                                            onClick={toggleMode}
                                            className="ml-2 font-bold text-luxury-gold hover:text-luxury-gold/80 transition-colors"
                                        >
                                            {isLogin ? "Sign Up" : "Sign In"}
                                        </button>
                                    </p>
                                </div>
                            </motion.form>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            {/* --- RIGHT PANEL: Showcase (Desktop Only) --- */}
            <div className="hidden lg:block w-[55%] relative overflow-hidden bg-luxury-charcoal">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] z-0" />

                {/* Carousel */}
                <AnimatePresence mode="crossfade">
                    {SHOWCASE_IMAGES.map((img, idx) => (
                        idx === activeImage && (
                            <motion.div
                                key={idx}
                                className="absolute inset-0 z-0"
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ opacity: 1, scale: 1.1 }}
                                exit={{ opacity: 0 }}
                                transition={{ opacity: { duration: 1 }, scale: { duration: 5, ease: "linear" } }}
                            >
                                <img src={img.url} className="w-full h-full object-cover opacity-70" alt="Luxury Property" />
                                <div className="absolute inset-0 bg-black/30" />
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>

                {/* Ambient Particles */}
                {/* Simplified particle effect for performance */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`p-${i}`}
                        className="absolute w-1 h-1 bg-luxury-gold rounded-full opacity-40 z-10"
                        initial={{
                            x: Math.random() * 1000,
                            y: Math.random() * 1000,
                            opacity: 0.2
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}

                {/* Decorative Floating Shapes */}
                <motion.div
                    animate={{ y: [0, 40, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 right-20 w-64 h-64 border border-luxury-gold/20 rounded-full z-10 pointer-events-none"
                />
                <motion.div
                    animate={{ y: [0, -30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-40 left-20 w-40 h-40 border border-luxury-gold/10 rounded-full z-10 pointer-events-none"
                />

                {/* Property Info Card */}
                <div className="absolute bottom-16 left-16 z-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeImage}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-xl max-w-md"
                        >
                            <div className="flex items-center text-luxury-gold mb-2 space-x-2">
                                <MapPin size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">{SHOWCASE_IMAGES[activeImage].location}</span>
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-2">{SHOWCASE_IMAGES[activeImage].title}</h3>
                            <div className="flex justify-between items-end mt-4 border-t border-white/10 pt-4">
                                <span className="text-white/80 font-sans text-sm">{SHOWCASE_IMAGES[activeImage].specs}</span>
                                <span className="text-2xl font-serif font-bold text-luxury-gold">{SHOWCASE_IMAGES[activeImage].price}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Close Button Desktop */}
                <button
                    onClick={onClose}
                    className="absolute top-12 right-12 z-30 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full backdrop-blur-md"
                >
                    <X size={24} />
                </button>
            </div>
        </motion.div>
    );
}
