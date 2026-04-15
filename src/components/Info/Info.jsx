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
      if (newIndex < currentIndex) setCurrentIndex(newIndex);
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

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, selectedImage, currentIndex, project]);

  if (!isOpen) return null;

  const title = t(project.title, lang);
  const description = t(project.description, lang);
  const caracteristicas = t(project.caracteristicas, lang);
  const linkLabel = lang === 'en' ? 'visit site' : 'ir a la página';
  const repoLabel = lang === 'en' ? 'View repository' : 'Ver repositorio';

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="modal-backdrop fixed inset-0 bg-black/60 backdrop-blur-sm z-20 flex items-center justify-center p-3 sm:p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content flex flex-col lg:flex-row gap-3 lg:gap-4 w-full max-w-[95vw] lg:max-w-6xl 2xl:max-w-[1440px] max-h-[94vh] overflow-hidden"
      >
        {/* Gallery card */}
        <div className="flex flex-col lg:flex-[3] min-h-0 rounded-xl bg-[var(--bg-color)]/95 border border-white/10 shadow-xl overflow-hidden">
          <div className="flex-1 min-h-0 flex items-center justify-center p-4 lg:p-6 bg-[var(--bg-color-2)]/40">
            <img
              className="max-h-full max-w-full object-contain rounded-md"
              src={project.images[selectedImage]}
              alt={`${title} - image ${selectedImage + 1}`}
            />
          </div>

          <div className="flex justify-center items-center p-3 relative border-t border-white/5 bg-[var(--bg-color)]/80">
            <button
              onClick={handlePrevImage}
              className="absolute w-8 h-8 border border-white/15 left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full hover:text-[var(--hover-color)] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed z-10"
              disabled={selectedImage === 0}
              aria-label="Previous image"
            >
              <i className="fa-solid fa-angle-left mt-1 text-lg"></i>
            </button>

            <div className="w-[80%] overflow-hidden">
              <div
                style={{
                  transform: `translateX(-${currentIndex * (88 + 12)}px)`,
                  transition: "transform 0.5s ease-in-out",
                }}
                ref={carouselRef}
                className="flex gap-3 p-2 scroll-smooth scrollbar-hide"
              >
                {project.images.map((img, idx) => (
                  <img
                    onClick={() => handleImageClick(idx)}
                    className={`gallery-thumb cursor-pointer transition-all duration-300 rounded-md flex-shrink-0 ${
                      idx === selectedImage
                        ? "border-2 border-[var(--hover-color)] opacity-100"
                        : "opacity-60 hover:opacity-90 border border-white/10"
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
              className="border border-white/15 w-8 h-8 absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full hover:text-[var(--hover-color)] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed z-10"
              disabled={selectedImage === project.images.length - 1}
              aria-label="Next image"
            >
              <i className="fa-solid fa-angle-right mt-1 text-lg"></i>
            </button>
          </div>
        </div>

        {/* Info card */}
        <div className="flex flex-col lg:flex-[2] lg:max-w-md min-h-0 rounded-xl bg-[var(--bg-color)]/95 border border-white/10 shadow-xl overflow-hidden">
          <div className="flex flex-col h-full p-5 overflow-hidden">
            <div className="relative flex items-start justify-between gap-3 pb-4 border-b border-white/5">
              <div className="flex items-center flex-wrap gap-2">
                <h2 className="font-bold text-xl">{title}</h2>
                {project.link && project.link.length > 0 && (
                  <a
                    className="text-sm text-[var(--hover-color)] hover:underline"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkLabel}
                    <i className="ml-2 text-[13px] fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="text-[var(--font-color-2)] hover:text-[var(--hover-color)] text-lg"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {project.git && project.git.length > 0 && (
              <a
                className="text-[12px] mt-3 rounded-2xl border border-[var(--hover-color)] font-bold py-1 px-3 inline-block w-fit hover:bg-[var(--hover-color-bg)]"
                href={project.git}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="text-[13px] fa-brands fa-github mr-2"></i>
                {repoLabel}
              </a>
            )}

            <div className="flex-1 min-h-0 overflow-y-auto mt-4 pr-2 text-[var(--font-color-2)] text-sm">
              <p>{description}</p>
              {Array.isArray(caracteristicas) &&
                caracteristicas.map((car, idx) => (
                  <div key={idx} className="text-[12px]">
                    <h3 className="font-bold text-[var(--font-color)] mt-4">
                      {t(car.name, lang)}
                    </h3>
                    <ul>
                      {(t(car.lines, lang) || []).map((line, lineIdx) => (
                        <li className="my-2 ml-5 flex" key={lineIdx}>
                          <i className="text-[var(--hover-color)] fa-solid fa-angle-right mt-1.5 text-[8px] mr-2"></i>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>

            {project.tags && project.tags.length > 0 && (
              <div className="flex gap-2 pt-4 mt-3 flex-wrap border-t border-white/10">
                {project.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="bg-[var(--hover-color-bg)] text-[var(--hover-color)] text-xs px-4 py-1 rounded-full font-semibold"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
