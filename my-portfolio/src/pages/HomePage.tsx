import { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, Variants } from "framer-motion"

import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { ThemeContext } from "../utils/theme-context"
import { PageTransition } from "../utils/PageTransition"
import { useMousePosition } from "../utils/useMousePosition"

export const HomePage = () => {
  const { theme } = useContext(ThemeContext)
  const [cursorVariant, setCursorVariant] = useState("default")
  const ref = useRef(null)
  const mousePosition = useMousePosition(ref)

  const variants: Variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "#a3b899",
      mixBlendMode: "difference",
    },
  }

  const textEnter = () => setCursorVariant("text")
  const textLeave = () => setCursorVariant("default")

  return (
    <main role="main" className="w-full flex flex-col h-screen">
      <div
        className={`${
          theme === "dark" ? "bg-black" : "bg-dustyPink"
        } p-5 h-full`}
      >
        <Header />
        <div
          className={`static ${
            theme === "dark" ? "text-dustyPink" : "text-black"
          }`}
        >
          <div className="absolute inline-block top-24 left-4">
            <div className="flex flex-col font-check text-6xl sm:text-8xl align-start">
              <p
                className="font-check"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                Sana Barilade
              </p>
            </div>
          </div>
          <div className="absolute inline-block bottom-32 right-4">
            <div className="flex flex-col font-check text-4xl sm:text-6xl align-end">
              <button onMouseEnter={textEnter} onMouseLeave={textLeave}>
                <Link to="/About">
                  About
                  <motion.div />
                </Link>
              </button>
              <button onMouseEnter={textEnter} onMouseLeave={textLeave}>
                Projects
              </button>
              <button onMouseEnter={textEnter} onMouseLeave={textLeave}>
                Contact
              </button>
            </div>
          </div>
          <motion.div
            ref={ref}
            className="bg-olive h-12px w-12px rounded-full fixed top-0 left-0 pointer-events-none"
            variants={variants}
            animate={cursorVariant}
          />
        </div>
        <Footer />
      </div>
      <PageTransition />
    </main>
  )
}
