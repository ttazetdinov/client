import { motion } from "framer-motion";

export function AuthSidebar() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-80" />
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-8">
              <span className="text-3xl font-bold">L</span>
            </div>
            <h1 className="font-heading text-4xl font-bold mb-4">Lumiere</h1>
            <p className="text-white/80 max-w-sm mx-auto">
              Join our exclusive community and connect with amazing people
            </p>
          </motion.div>
        </div>
      </div>
      <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
    </div>
  );
}
