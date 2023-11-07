import { useContext, useRef, useState } from "react"
import { ThemeContext } from "../utils/themeContext"
import { motion } from "framer-motion"
import { portfolioProjectImages, projects } from "../utils/info"
import { useMousePosition } from "../utils/useMousePosition"
import { LinkAnimation } from "../components/LinkAnimation"
import { BsArrowUpRightCircle } from "react-icons/bs"
import { Link } from "react-router-dom"
import { FaGithubSquare } from "react-icons/fa"
import { ImageCarousel } from "../components/ImageCarousel"

export const Projects = () => {
  const { theme } = useContext(ThemeContext)

  const ref = useRef(null)
  const mousePosition = useMousePosition(ref)
  const [cursorVariant, setCursorVariant] = useState("hidden")
  const textEnter = () => {
    setCursorVariant("visible")
  }
  const textLeave = () => {
    setCursorVariant("hidden")
  }

  return (
    <motion.div
      className={`flex flex-col border-solid border-4 rounded-lg ${
        theme === "dark" ? "border-dustyPink" : "border-black"
      } m-3 sm:m-7 font-header h-3/4`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          ease: "linear",
          duration: 2,
          x: { duration: 1 },
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          ease: "linear",
          duration: 2,
          x: { duration: 1 },
        },
      }}
    >
      <div
        ref={ref}
        className="grid justify-items-center font-mono overflow-x-auto text-xs lg:text-lg h-full justify-center items-center"
      >
        {projects.map((project, index) => (
          <>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 w-full p-2 sm:w-4/6 sm:p-0 gap-3"
              key={project.id}
            >
              <div className="flex items-center">
                <ImageCarousel images={portfolioProjectImages} />
              </div>
              <div className="pl-1">
                <div className="flex gap-2 items-center">
                  {project.title} - {project.time}
                  <Link to={{ pathname: `${project.link}` }} target="_blank">
                    <FaGithubSquare
                      size={30}
                      className="cursor-pointer"
                      onMouseEnter={textEnter}
                      onMouseLeave={textLeave}
                    />
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-1">
                  {project.techList.map((tech, index) => (
                    <p key={index}>- {tech}</p>
                  ))}
                </div>
              </div>
            </div>
            {index == projects.length - 1 ? (
              <div>More projects coming soon...</div>
            ) : null}
          </>
        ))}
      </div>
      <LinkAnimation
        mousePosition={mousePosition}
        cursorVariant={cursorVariant}
      >
        <BsArrowUpRightCircle
          size={30}
          className=" bg-olive rounded-full p-1"
        />
      </LinkAnimation>
    </motion.div>
  )
}
