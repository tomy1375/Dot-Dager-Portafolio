'use client'
import { ICONS } from './data/IconsTecnologies';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react'

interface ProjectCardProps {
  imageSrc: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
  liveLinkText?: string;
  liveLinkColor?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  imageSrc, 
  title, 
  description, 
  technologies = [], 
  githubLink, 
  liveLink,
  liveLinkText = 'Ver proyecto',
  liveLinkColor = 'bg-violet-800 hover:bg-violet-900'
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [showGithub, setShowGithub] = useState(true);
  const [buttonText, setButtonText] = useState('No');

  const handleGithubClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setClickCount((prevCount) => (prevCount + 1) % 5);
    setShowGithub(false);
    setTimeout(() => {
      setShowGithub(true);
      setButtonText('No');
    }, 2000);
  };

  useEffect(() => {
    const texts = ["Bueno",'Bueno', 'dije bueno', 'huu loco', 'Malote'];
    if (!showGithub) {
      setButtonText(texts[clickCount]);
    }
  }, [clickCount, showGithub]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:border-violet-800 dark:hover:border-violet-800 transition-colors duration-300 max-w-sm mx-auto w-full"
    >
      <div className="p-0">
        <div className="relative overflow-hidden h-48">
          <img 
            src={imageSrc} 
            alt={title} 
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-8 mb-4">
          {technologies.map((tech, index) => {
            const icon = ICONS.find(icon => icon.name.toLowerCase() === tech.toLowerCase());
            return (
              <span key={index} className="">
                {icon && (
                  <span className="w-6 h-6" dangerouslySetInnerHTML={{ __html: icon.svgPath }} />
                )}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between p-6 pt-0">
        {githubLink && (
          <AnimatePresence mode="wait">
            {showGithub ? (
              <motion.a
                key={buttonText}
                href={githubLink}
                onClick={handleGithubClick}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Github className="w-4 h-4 mr-2" />
                {buttonText}
              </motion.a>
            ) : (
              <motion.span
                key={buttonText}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Github className="w-4 h-4 mr-2" />
                {buttonText}
              </motion.span>
            )}
          </AnimatePresence>
        )}
        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${liveLinkColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-400`}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            {liveLinkText}
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const projects = [
    {
      imageSrc: "/antro.webp",
      title: "El antro de Dager",
      description: "Aquí te encontrarás con almas perdidas, genios incomprendidos y, probablemente, algún bot que cree saber más que vos.",
      technologies: ["JavaScript", "React", "Socket.io","PostreSQL"],
      githubLink: "esta 23",
      liveLink: "https://discord.com/invite/4NFk6TamAB",
      liveLinkText: "Unirte al Discord",
      liveLinkColor: "bg-indigo-600 hover:bg-indigo-700 transition" // Color personalizado para Discord
    },
    {
      imageSrc: "/dagert.webp",
      title: "Caos, risas y mala vida",
      description: "Acá no vas a encontrar perfección, pero sí risas, fails épicos, charlas profundas (o no tanto).",
      technologies: ["React", "CSS", "TypeScript", "Astro"],
      githubLink: "est2",
      liveLink: "https://www.twitch.tv/dagerxiv",
      liveLinkText: "Vamos a Twitch",
      liveLinkColor: "bg-purple-600 hover:bg-purple-700 transition" // Color personalizado para Twitch
    },
    {
      imageSrc: "/dagery.webp",
      title: "Código, Gatos y Filosofía",
      description: "Porque nadie dijo que mezclar código con gatos y existencialismo fuera mala idea (aunque claramente nadie lo intentó).",
      technologies: ["HTML", "CSS", "JavaScript","React"],
      githubLink: "esta",
      liveLink: "https://www.youtube.com/@DotDager",
      liveLinkText: "Vamos a Youtube",
      liveLinkColor: "bg-red-600 hover:bg-red-700 transition" // Color personalizado para YouTube
    }
  ];

  return (
    <section id="" className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-bold mb-2 text-gray-800 dark:text-white">Comunidad</h2>
        <div className="w-24 h-2 bg-green-800 mx-auto mb-6"></div>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          <span>Todo lo que puedas </span>
          <span className="text-green-700 font-semibold">imaginar</span>
          <span>, lo podrás </span>
          <span
            className="text-green-700 font-semibold relative"
            style={{
              textDecoration: "line-through",
              textDecorationThickness: "3px",
              textDecorationColor: "currentColor",
            }}
          >
            desear
          </span>
          <span className="text-green-700 font-semibold"> programar</span>
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

