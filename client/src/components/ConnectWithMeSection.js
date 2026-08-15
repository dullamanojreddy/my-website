import { User, Code, Mail } from "lucide-react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.12,
      duration: 0.55,
      ease: "easeOut"
    }
  })
};

function ConnectWithMeSection() {
  return (
    <section className="connect-section card-surface" aria-labelledby="connect-heading">
      <div className="connect-header">
        <motion.h2
          id="connect-heading"
          className="connect-title"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Let&apos;s Connect
        </motion.h2>
        <motion.p
          className="connect-description"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
        >
          Interested in collaborating, discussing opportunities, hackathons, AI projects,
          or software engineering roles? Feel free to reach out.
        </motion.p>
      </div>

      <div className="connect-grid">
        <motion.a
          href="https://www.linkedin.com/in/manojreddy-dulla"
          target="_blank"
          rel="noreferrer"
          className="connect-card"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          whileHover={{ y: -10, scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="connect-card-glow" aria-hidden="true" />
          <span className="connect-card-border" aria-hidden="true" />

          <span className="connect-icon-wrap">
            <User className="connect-icon" size={30} strokeWidth={1.8} />
          </span>

          <span className="connect-label">LinkedIn</span>
          <span className="connect-subtitle">Professional Network</span>
        </motion.a>

        <motion.a
          href="https://github.com/dullamanojreddy"
          target="_blank"
          rel="noreferrer"
          className="connect-card"
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          whileHover={{ y: -10, scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="connect-card-glow" aria-hidden="true" />
          <span className="connect-card-border" aria-hidden="true" />

          <span className="connect-icon-wrap">
            <Code className="connect-icon" size={30} strokeWidth={1.8} />
          </span>

          <span className="connect-label">GitHub</span>
          <span className="connect-subtitle">View My Projects & Contributions</span>
        </motion.a>

        <motion.a
          href="mailto:dullamanojreddy@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="connect-card"
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          whileHover={{ y: -10, scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="connect-card-glow" aria-hidden="true" />
          <span className="connect-card-border" aria-hidden="true" />

          <span className="connect-icon-wrap">
            <Mail className="connect-icon" size={30} strokeWidth={1.8} />
          </span>

          <span className="connect-label">Email Me</span>
          <span className="connect-subtitle">Let&apos;s Connect</span>
        </motion.a>
      </div>
    </section>
  );
}

export default ConnectWithMeSection;
