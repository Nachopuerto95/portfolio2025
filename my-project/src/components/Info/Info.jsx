import React, { useState, useEffect, useRef } from "react";

function Info(props) {
	const { isOpen, setIsOpen, project } = props;

  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageState, setImage] = useState(0);
  const visibleCount = 4;



  const handlePrev = () => {
	if (currentIndex > 0) {
		setCurrentIndex(currentIndex - 1);
	}
	};

	const handleNext = () => {
	if (currentIndex < project.images.length - visibleCount) {
		setCurrentIndex(currentIndex + 1);
	}
	};

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <>
    <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10 flex items-center justify-center">
      <div onClick={e => e.stopPropagation()}
		  className="flex">

            <div className="p-5 flex w-140 flex-col">
				<img
				className=" h-auto rounded-lg"
				src={project.images[imageState]}
				alt=""
				/>
			<div className="flex justify-center items-center">
				<button
					onClick={handlePrev}
					className="z-20 px-3 py-1 t">
					<i className="fa-solid fa-angle-left text-lg mr-4 hover:text-[var(--hover-color)]"></i>
				</button>
				<div>
				</div>
				<div className="w-[80%] overflow-hidden">

					<div  
					style={{
						transform: `translateX(-${currentIndex * (80 + 12)}px)`,
						transition: 'transform 0.5s ease-in-out'
					}}
					ref={carouselRef}
					className="flex gap-3 p-3 scroll-smooth scrollbar-hide">
					{project.images.map((img, idx) => (
							<img onClick={ () => setImage(idx)} className="gallery-item" key={idx} src={img} alt={`Image ${idx}`} />
					))}
					</div>
				</div>
			<button
					onClick={handleNext}
					className="px-3 py-1">
					<i className="fa-solid fa-angle-right text-lg ml-3 hover:text-[var(--hover-color)]"></i>
				</button>
			</div>
				
            </div>
			<div className="flex flex-col w-140 max-h-110 overflow-y-auto justify-between p-5 rounded-lg bg-[var(--bg-color)]/90 shadow-lg border-t-1 border-white/8">
				<div className="pb-5">
					<div className="flex  items-center"> <h2 className="font-bold text-xl mb-2">{project.title}</h2>
					{project.link?.length > 0 ? (
						<a className="ml-5 text-sm mb-1 text-[var(--hover-color)]" href="">ir a la pagina<i className="ml-2 text-[13px] fa-solid fa-arrow-up-right-from-square"></i></a>
					) : ( null )}
					 </div>
					{project.git?.length > 0 ? (
						<a className="text-[12px] mb-1 rounded-2xl border-[var(--hover-color)]  border-1 font-bold  py-1 px-3" href=""><i className=" text-[13px] fa-brands fa-github mr-2"></i>Ver repositorio</a>
					) : (null)}
					<div className="flex flex-col">
						<p className="mt-5 text-[var(--font-color-2)] break-all text-sm">
							{project.description}
						</p>
					</div>
				</div>
				<div className="flex gap-2 px-6 pt-6 pb-2 flex-wrap border-t-1 border-white/10">
					{project.tags.map((tag, idx) => (
            			<div key={idx} className="bg-[var(--hover-color-bg)] text-[var(--hover-color)]/90 text-xs px-5 py-1.5 rounded-full font-semibold">
					{tag}
					</div>
					))}
				</div>

            </div>
          </div>
		  
        </div>
    </>
  );
}

export default Info;
