import { useState } from 'react';
import projectsData from "../../config/projects.json";

export const FilterTabs = () => {
  const [filter, setFilter] = useState('lab'); // 'all', 'lab', 'live'

  const filteredProjects = () => {
    if (filter === 'all') return [...projectsData['projects-personal'], ...projectsData['projects-professional']];
    return filter === 'lab'
      ? projectsData['projects-personal']
      : projectsData['projects-professional'];
  };

  const filterLabels = {
    all: 'All',
    lab: 'Lab',
    live: 'Live',
  };

  return (
    <div className="w-full px-4 md:px-8">
      {/* Botones de filtro */}
      <div className="m-8 flex justify-center space-x-4 border-b border-gray-300">
{['lab', 'live', 'all'].map((type) => (
  <button
    key={type}
    onClick={() => setFilter(type)}
    className={`px-4 md:px-6 py-2 text-sm md:text-base font-medium border-b-4 transition-all duration-300
      ${filter === type
        ? 'border-orange-400 text-orange-400'
        : 'border-transparent text-gray-500 hover:text-orange-300'}`}
  >
     {filterLabels[type]}
  </button>
))}
</div>
      {/* Lista de proyectos */}
      {filteredProjects().map((project) => (
        <div
          key={project.id}
          className="h-auto my-12 md:my-24 flex flex-col md:flex-row justify-evenly items-center"
        >
          {/* Texto */}
          <div className="flex mx-6 flex-col justify-center md:w-2/5 w-full">
            <p className="text-2xl md:text-4xl font-bold text-gray-300 mb-6 md:mb-14">/ {project.id}.</p>
            <h2 className="text-3xl md:text-5xl font-light text-orange-300 mb-4">{project.title}</h2>
            <p className="text-xs md:text-base text-gray-300 my-2 md:my-8">{project.description}
            {project.bootcamp ? (<span className="bg-orange-300 text-black text-xs px-2 py-1 mx-2 rounded-full">
  {project.bootcamp}
</span>) : ''
}</p>
            <div className="flex flex-wrap">
              {project.tech.map((tech, index) => (
                <div key={index} className="px-2 m-2 hover:bg-gray-200">
                  <i className={tech.icon} />
                </div>
              ))}
            </div>
          </div>

          {/* Imagen o Video + botón */}
          <div className="flex flex-col items-center md:items-start mx-6 md:w-2/5 w-full">
            {project.img ? (
              <img
                src={`${import.meta.env.BASE_URL}${project.img}`}
                alt={project.alt}
                loading="lazy"
                className="object-center rounded-lg max-w-full md:max-w-[500px]"
              />
            ) : (
              <div className="w-full md:w-[500px]">
                <video controls className="w-full aspect-[5/4] rounded-lg shadow-lg">
                  <source src={`${import.meta.env.BASE_URL}${project.video}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <div className="text-center md:text-left">
              <a href={project.link} target="_blank">
                <button className="bg-orange-300 px-6 py-3 m-6 hover:bg-orange-200 rounded-lg text-gray-700">
                  Click here!
                </button>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};



