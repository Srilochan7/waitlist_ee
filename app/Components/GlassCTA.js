/* check check check */


"use client";
import { useRef, useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { FiArrowRight, FiTag, FiFacebook, FiTwitter, FiInstagram, FiLink } from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";
import FAQPageCarousel from "./faqs";
import Footer from "./Footer";

const GlassContainer = () => {
  return (
    <div className="absolute -top-12 inset-0 flex flex-col justify-center z-30 mt-10">
      <div className="flex flex-col items-center">
        <AnimatedRoundedTag />
        <AnimatedHeader />
        <AnimatedCard />
        <div className="flex gap-4">
          <SocialMediaIcon icon={<FiLink />} delay={0.2} />
          {/* <SocialMediaIcon icon={<FiTwitter />} delay={0.4} />
          <SocialMediaIcon icon={<FiInstagram />} delay={0.6} /> */}
        </div>
      </div>
      <FAQPageCarousel/>
      <Footer/>
    </div>
  );
};

const AnimatedRoundedTag = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.2, duration: 0.5, type: "spring", stiffness: 100 },
    });
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
      className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-md border border-gray-500 rounded-full px-4 py-2 flex items-center gap-2 shadow-md mb-6"
    >
      <span className="text-white text-sm font-medium">Be the first to know</span>
    </motion.div>
  );
};


const AnimatedHeader = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.4, duration: 0.5, type: "spring", stiffness: 100 },
    });
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
      className="relative flex items-center justify-center w-full mb-8"
    >
      <span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-gray-300 via-gray-200 to-gray-100 bg-clip-text text-7xl box-content font-extrabold text-transparent text-center select-none tracking-tight">
        ExpertEase !
      </span>
      <h1 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-gray-300 via-gray-200 to-gray-100 bg-clip-text text-7xl font-extrabold text-transparent text-center select-auto tracking-tight">
        ExpertEase !
      </h1>
    </motion.div>
  );
};

const AnimatedCard = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.6,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    });
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-gray-500 rounded-3xl p-8 py-12 shadow-lg max-w-2xl w-full mb-6"
    >
      <h2 className="text-white text-4xl font-semibold text-center">
        Join Our Waitlist
      </h2>
      <p className="text-white mt-4 text-center sm:px-16">
        Sign up to be the first to know when we launch. We’ll notify you as soon
        as we’re ready to go live.
      </p>
      <div className="max-w-sm mx-auto">
        <WaitlistForm />
      </div>
    </motion.div>
  );
};
const WaitlistForm = () => {
  const inputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = inputRef.current?.value;
    
    if (!email) return;

    try {
      console.log('Submitting email:', email);
      const response = await fetch('https://wl-backend.vercel.app/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) throw new Error(data.error || 'Server error');
      
      inputRef.current.value = "";
      setStatus("Thanks for joining!");
      setTimeout(() => setStatus(""), 3000);
      
    } catch (error) {
      console.error('Detailed error:', error);
      setStatus(error.message || "Error submitting. Please try again.");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onClick={() => inputRef.current?.focus()}
        className="relative flex w-full max-w-md items-center gap-2 rounded-full border border-white/20 bg-black py-1.5 pl-6 pr-1.5 mt-6 shadow-2xl shadow-white"
      >
        <input
          ref={inputRef}
          type="email"
          placeholder="Enter your email"
          className="w-full bg-transparent text-sm text-white placeholder-white/80 focus:outline-0"
          required
        />
        <button
          onClick={(e) => e.stopPropagation()}
          type="submit"
          className="group flex shrink-0 items-center gap-1.5 rounded-full bg-gray-200 px-4 py-3 text-sm font-medium text-black transition-transform active:scale-[0.985]"
        >
          <span>Join Waitlist</span>
          <FiArrowRight className="-mr-4 opacity-0 transition-all group-hover:-mr-0 group-hover:opacity-100 group-active:-rotate-45" />
        </button>
      </form>
      {status && (
        <div className="mt-2 text-center text-sm text-white">
          {status}
        </div>
      )}
    </>
  );
};
const SocialMediaIcon = ({ icon, delay }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { delay, duration: 0.5, type: "spring", stiffness: 100 },
    });
  }, [controls, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -45, scale: 1 }}
      animate={controls}
      whileHover={{ scale: 1.1,  boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }}
      className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-md border border-gray-500 rounded-lg p-3 shadow-md flex items-center justify-center text-white text-xl"
    >
      {icon}
    </motion.div>
  );
};

export default GlassContainer;




/*
"use client";
import { useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { createClient } from '@supabase/supabase-js';

const WaitlistForm = () => {
  const inputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus({ type: "error", message: "Please enter your email" });
      return;
    }

    try {
      // Insert email into Supabase table
      const { data, error } = await supabase
        .from('waitlist') // Replace 'waitlist' with your actual table name
        .insert([
          { email: email }
        ]);

      if (error) throw error;

      // Success
      setStatus({ type: "success", message: "Thanks for joining our waitlist!" });
      setEmail("");
      
    } catch (error) {
      // Check if error is due to duplicate email
      if (error.code === '23505') {
        setStatus({ type: "error", message: "This email is already on our waitlist" });
      } else {
        setStatus({ type: "error", message: "Something went wrong. Please try again." });
      }
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        onClick={() => inputRef.current.focus()}
        className="relative flex w-full items-center gap-2 rounded-full border border-white/20 bg-black py-1.5 pl-6 pr-1.5 mt-6 shadow-2xl shadow-white"
      >
        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full bg-transparent text-sm text-white placeholder-white/80 focus:outline-0"
        />
        <button
          onClick={(e) => e.stopPropagation()}
          type="submit"
          className="group flex shrink-0 items-center gap-1.5 rounded-full bg-gray-200 px-4 py-3 text-sm font-medium text-black transition-transform active:scale-[0.985]"
        >
          <span>Join Waitlist</span>
          <FiArrowRight className="-mr-4 opacity-0 transition-all group-hover:-mr-0 group-hover:opacity-100 group-active:-rotate-45" />
        </button>
      </form>
      
      {status.message && (
        <div className={`mt-2 text-center text-sm ${
          status.type === "error" ? "text-red-400" : "text-green-400"
        }`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default WaitlistForm;
*/