// src/components/ProjectCard.jsx
export default function ProjectCard({ title, description,tags, image }) {
  return (
	<div className="proyect-container 
				group
				border-t-[0px]
				border-t-white/0
                hover:bg-[rgba(187,191,247,0.04)] 
                flex p-5 rounded-lg justify-start 
                hover:shadow-lg 
                hover:border-t-[1px] 
                hover:border-t-white/8 
                transition
                duration-400">
	<img className="h-20" src={image} alt={title} />
      <div className="ml-5">
        <h2 className="text-m font-medium tracking-tight text-slate-200 mt-[-5px] mb-2 group-hover:text-[var(--hover-color)]">{title} <i className="ml-5 text-[13px] fa-solid fa-arrow-up-right-from-square"></i> </h2>
        <p className="text-sm text-[var(--font-color-2)]">{description}</p>
		<div className="flex gap-2 mt-2 flex-wrap mt-5">
          {tags && tags.map((tag, idx) => (
            <div key={idx} className=" bg-[var(--hover-color)]/8 text-[var(--hover-color)]/90 text-xs px-5 py-1.5 rounded-full font-semibold">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
