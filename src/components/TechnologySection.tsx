import { motion } from "framer-motion";
import { DevicePhoneMobileIcon, GlobeAltIcon, TvIcon } from "@heroicons/react/24/solid";

export default function TechnologySection() {
  const platforms = [
    { name: "Mobile", icon: DevicePhoneMobileIcon },
    { name: "Web", icon: GlobeAltIcon },
    { name: "TV", icon: TvIcon },
  ];
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      id="technology"
      className="py-8 sm:py-12 lg:py-16 text-center mt-16 sm:mt-20 scroll-mt-[80px]"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12">We Deliver Top-Notch Solutions Built on Trust</h2>
      <p className="mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">We are committed to delivering the best solutions with a foundation of trust and reliability. Our team utilizes the latest technologies to ensure top performance across platforms.</p>
      <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-8 lg:space-x-12">
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center group"
          >
            <platform.icon className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-[var(--button-bg)] mb-2 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-base sm:text-lg lg:text-xl font-semibold">{platform.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}