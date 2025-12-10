import { useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Lock, User, MapPin, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useAuth } from "@/shared/hooks/useAuth";
import { AuthSidebar } from "./components";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
    city: "",
    country: "",
  });
  
  const { login, register, loginError, registerError, isLoginPending, isRegisterPending } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === "login") {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register(formData);
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const error = mode === "login" ? loginError : registerError;
  const isPending = mode === "login" ? isLoginPending : isRegisterPending;

  return (
    <div className="min-h-screen flex">
      <AuthSidebar />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/">
            <button className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </button>
          </Link>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="font-heading text-3xl font-bold mb-2">
                  {mode === "login" ? "Welcome back" : "Create account"}
                </h2>
                <p className="text-white/50">
                  {mode === "login"
                    ? "Sign in to access your account"
                    : "Join our exclusive community today"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "register" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <Input
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="pl-11"
                          required
                          data-testid="input-name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Username</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">@</span>
                        <Input
                          type="text"
                          placeholder="username"
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          className="pl-11"
                          required
                          data-testid="input-username"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label className="text-sm text-white/70">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-11"
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/70">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-11"
                      required
                      minLength={6}
                      data-testid="input-password"
                    />
                  </div>
                </div>

                {mode === "register" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">City</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <Input
                          type="text"
                          placeholder="Brussels"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="pl-11"
                          data-testid="input-city"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Country</label>
                      <Input
                        type="text"
                        placeholder="Belgium"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        data-testid="input-country"
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error.message}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isPending}
                  data-testid="button-submit"
                >
                  {isPending ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {mode === "login" ? "Sign In" : "Create Account"}
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/50">
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                    className="ml-2 text-purple-400 hover:text-purple-300 font-medium"
                    data-testid="button-switch-mode"
                  >
                    {mode === "login" ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
