import React, { useState, useEffect, useRef } from "react";
import { useLang, t } from "../../i18n";

function Info(props) {
  const { isOpen, setIsOpen, project } = props;
  const { lang } = useLang();

  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const visibleCount = 4;

  const handleImageClick = (idx) => {
    setSelectedImage(idx);
    if (idx < currentIndex) {
      setCurrentIndex(idx);
    } else if (idx >= currentIndex + visibleCount) {
      setCurrentIndex(idx - visibleCount + 1);
    }
  };

  const handlePrevImage = () => {
    if (selectedImage > 0) {
      const newIndex = selectedImage - 1;
      setSelectedImage(newIndex);
      if (newIndex < currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  const handleNextImage = () => {
    if (selectedImage < project.images.length - 1) {
      const newIndex = selectedImage + 1;
      setSelectedImage(newIndex);
      if (newIndex >= currentIndex + visibleCount) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    if (isOpen) {
      setSelectedImage(0);
      setCurrentIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const title = t(project.title, lang);
  const description = t(project.description, lang);
  const caracteristicas = t(project.caracteristicas, lang);
  const linkLabel = lang === 'en' ? 'visit site' : 'ir a la página';
  const repoLabel = lang === 'en' ? 'View repository' : 'Ver repositorio';

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="modal-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center p-4"
    >
      <div className="modal-content flex flex-col lg:flex-row max-h-[92vh] w-full max-w-5xl justify-center overflow-hidden">
        <div
          onClick={(e) => e.stopPropagation()}
          className="p-5 flex w-full lg:w-[40%] flex-col"
        >
          <div className="relative flex justify-center">
            <img
              className="w-full rounded-lg max-h-[40vh] object-contain"
              src={project.images[selectedImage]}
              alt={`${title} - image ${selectedImage + 1}`}
            />
          </div>

          <div className="flex justify-center items-center mt-4 relative">
            <button
              onClick={handlePrevImage}
              className="absolute w-8 h-8 border left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full hover:text-[var(--hover-color)] cursor-pointer disabled:opacity-30"
              disabled={selectedImage === 0}
              aria-label="Previous image"
            >
              <i className="fa-solid fa-angle-left mt-1 text-lg"></i>
            </button>

            <div className="w-[80%] overflow-hidden">
              <div
                style={{
                  transform: `translateX(-${currentIndex * (120 + 12)}px)`,
                  transition: "transform 0.5s ease-in-out",
                }}
                ref={carouselRef}
                className="flex gap-3 p-3 scroll-smooth scrollbar-hide"
              >
                {project.images.map((img, idx) => (
                  <img
                    onClick={() => handleImageClick(idx)}
                    className={`gallery-item cursor-pointer transition-all duration-300 ${
                      idx === selectedImage
                        ? "border-2 border-[var(--hover-color)] scale-110 opacity-100"
                        : "opacity-70"
                    }`}
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleNextImage}
              className="border w-8 h-8 absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full hover:text-[var(--hover-color)] cursor-pointer disabled:opacity-30"
              disabled={selectedImage === project.images.length - 1}
              aria-label="Next image"
            >
              <i className="fa-solid fa-angle-right mt-1 text-lg"></i>
            </button>
          </div>
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col w-full lg:w-140 max-h-[75vh] lg:max-h-[85vh] justify-between p-5 my-5 rounded-lg bg-[var(--bg-color)]/95 shadow-lg border-t border-white/8"
        >
          <div className="pb-5 relative">
            <div onClick={() => setIsOpen(false)} className="absolute right-5">
              <i className="cursor-pointer fa-solid fa-xmark hover:text-[var(--hover-color)]"></i>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <h2 className="font-bold text-xl mb-2">{title}</h2>
              {project.link && project.link.length > 0 && (
                <a
                  className="ml-3 text-sm mb-1 text-[var(--hover-color)] hover:underline"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkLabel}
                  <i className="ml-2 text-[13px] fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              )}
            </div>

            {project.git && project.git.length > 0 && (
              <a
                className="text-[12px] mb-1 rounded-2xl border border-[var(--hover-color)] font-bold py-1 px-3 inline-block hover:bg-[var(--hover-color-bg)]"
                href={project.git}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="text-[13px] fa-brands fa-github mr-2"></i>
                {repoLabel}
              </a>
            )}

            <div className="flex flex-col">
              <div className="mt-5 text-[var(--font-color-2)] max-h-[45vh] lg:h-50 overflow-y-auto break-normal text-sm pr-5">
                <p>{description}</p>
                {Array.isArray(caracteristicas) &&
                  caracteristicas.map((car, idx) => (
                    <div key={idx} className="text-[12px]">
                      <h3 className="text-bold text-[var(--font-color)] mt-3">
                        {t(car.name, lang)}
                      </h3>
                      <ul className="text-[12px]">
                        {(t(car.lines, lang) || []).map((line, lineIdx) => (
                          <li className="my-3 ml-5" key={lineIdx}>
                            <i className="text-[var(--hover-color)] fa-solid fa-angle-right mt-1 text-[8px] mr-1"></i>
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 px-2 lg:px-6 pt-6 pb-2 flex-wrap border-t border-white/10">
            {project.tags &&
              project.tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--hover-color-bg)] text-[var(--hover-color)] text-xs px-5 py-1.5 rounded-full font-semibold"
                >
                  {tag}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
