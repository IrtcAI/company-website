"use client";

import Image from "next/image";
import { useState } from "react";
import { CircleCheck, ExternalLink, Plus } from "lucide-react";
import type { content, ProjectBrand } from "@/lib/content";

type Copy = (typeof content)["pt-BR"]["projects"];

export function ProjectShowcase({
  copy: projects,
  brands,
}: {
  copy: Copy;
  brands: ProjectBrand[];
}) {
  const [project, setProject] = useState(0);

  if (brands.length === 0 || projects.cases.length === 0) return null;

  const currentProject = {
    ...brands[project],
    ...projects.cases[project],
  };

  return (
    <section className="projects section-pad" id="projetos" tabIndex={-1}>
      <div className="section-label">
        <span>{projects.label}</span>
        <span>{projects.aside}</span>
      </div>
      <div className="section-title-row" data-reveal>
        <h2>
          {projects.title}
          <br />
          <span>{projects.accent}</span>
        </h2>
        <p>{projects.intro}</p>
      </div>
      <div
        className="project-selector"
        role="group"
        aria-label={projects.choose}
      >
        {brands.map((item, index) => (
          <button
            key={item.name}
            aria-pressed={project === index}
            onClick={() => setProject(index)}
          >
            <span>0{index + 1}</span>
            {item.name}
            <span className="selected-indicator">
              {project === index ? (
                <CircleCheck aria-hidden="true" />
              ) : (
                <Plus aria-hidden="true" />
              )}
            </span>
          </button>
        ))}
      </div>
      <article className="project-feature" key={currentProject.name}>
        <div className={`project-visual ${currentProject.theme}`}>
          <div className="project-orb" aria-hidden="true" />
          <a
            className="product-window real-product"
            href={currentProject.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${projects.visit}: ${currentProject.name} (${new URL(currentProject.url).hostname})`}
          >
            <div className="window-bar" aria-hidden="true">
              <span className="window-dots">● ● ●</span>
              <span>{new URL(currentProject.url).hostname}</span>
              <ExternalLink />
            </div>
            <div className="real-product-content">
              <Image
                src={currentProject.image}
                alt={`${currentProject.name} — ${currentProject.category}`}
                width={900}
                height={620}
                sizes="(max-width: 760px) 90vw, 48vw"
              />
            </div>
          </a>
        </div>
        <div className="project-info">
          <p className="overline">{currentProject.category}</p>
          <h3>{currentProject.title}</h3>
          <p>{currentProject.description}</p>
          <div className="project-result">
            <strong>{currentProject.metric}</strong>
            <span>{currentProject.result}</span>
          </div>
          <p className="project-stack">{currentProject.stack}</p>
          <details className="project-details">
            <summary>
              {projects.details}
              <Plus aria-hidden="true" />
            </summary>
            <p>{currentProject.detail}</p>
            <a href={currentProject.url} target="_blank" rel="noreferrer">
              {projects.visit}
              <ExternalLink aria-hidden="true" />
            </a>
          </details>
        </div>
      </article>
      <p className="project-source">{projects.source}</p>
    </section>
  );
}
