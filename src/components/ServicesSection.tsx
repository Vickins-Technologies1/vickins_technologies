import { motion } from "framer-motion";
import {
  CloudIcon,
  ComputerDesktopIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";

export default function ServicesSection() {
  const services = [
    { title: "IT Consulting", description: "Our IT consulting services guide you through complex IT decisions, offering customized solutions to improve your business operations and technology infrastructure.", icon: ComputerDesktopIcon },
    { title: "Cloud Computing", description: "We provide scalable cloud computing solutions that enhance your business's flexibility and efficiency, allowing you to store and manage data seamlessly across multiple platforms.", icon: CloudIcon },
    { title: "Web Development", description: "Our expert web development team builds user-friendly, responsive, and feature-rich websites tailored to your business needs, ensuring optimal user experiences.", icon: CodeBracketIcon },
    { title: "Applications Development", description: "Our expert Apps development team builds user-friendly, responsive, and feature-rich Applications tailored to your business needs, ensuring optimal user experiences.", icon: DevicePhoneMobileIcon },
    { title: "Business Reform", description: "We assist in transforming your business strategies, optimizing workflows, and adopting best practices to enhance performance and drive long-term success.", icon: ArrowPathIcon },
    { title: "Graphic Design", description: "Our creative team delivers professional graphic design services, creating visually striking logos, branding, marketing materials, and digital assets that captivate your audience.", icon: PencilSquareIcon },
    { title: "Digital Marketing", description: "We offer comprehensive digital marketing services, including SEO, social media management, and online advertising, to boost your online presence and drive targeted traffic to your business.", icon: RocketLaunchIcon },
    { title: "IT Support", description: "Our reliable IT support services ensure your technology systems run smoothly, providing timely assistance and solutions to minimize downtime and enhance productivity.", icon: ComputerDesktopIcon },
    { title: "Cybersecurity", description: "We provide robust cybersecurity solutions to protect your business from digital threats, ensuring the safety of your data and maintaining the integrity of your IT infrastructure.", icon: CloudIcon },
  ];
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      id="services"
      className="py-8 sm:py-12 lg:py-16 mt-16 sm:mt-20 scroll-mt-[80px]"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-12">Looking for the Perfect IT Solution?</h2>
      <p className="text-center mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">We Provide Tailored IT Solutions to Keep Your Business Ahead</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[var(--card-bg)] p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:transform hover:-translate-y-2"
          >
            <service.icon className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--button-bg)] mb-3 sm:mb-4 mx-auto" />
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 text-center">{service.title}</h3>
            <p className="text-xs sm:text-sm lg:text-base text-center mb-2 sm:mb-3">{service.description}</p>
            <a href="#contact" className="text-[var(--button-bg)] hover:underline block text-center font-semibold text-xs sm:text-sm lg:text-base">Learn More</a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}