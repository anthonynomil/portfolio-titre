import { useModal } from '@ebay/nice-modal-react';
import { faker } from '@faker-js/faker';
import {
  Chip, IconButton, Tooltip, Typography,
} from '@mui/material';
import { ReactNode } from 'react';

import GithubIcon from '@/assets/icons/github-icon.svg?react';
import WebIcon from '@/assets/icons/web-icon.svg?react';
import ImageModal from '@/components/modals/Image.modal.tsx';
import Carousel from '@/components/ui/carousel/Carousel.tsx';
import { ChildrenProp } from '@/types/prop.types.ts';

export interface ProjectImageProps {
  alt: string;
  src: string;
}

export interface ProjectSkillProps {
  description: string;
  label: string;
}

export interface ProjectTitleProps extends ChildrenProp {
  githubUrl?: string;
  websiteUrl?: string;
}

export function ProjectTitle({ children, githubUrl, websiteUrl }: ProjectTitleProps) {
  return (
    <Typography className="flex gap-3" color="primary" fontWeight="bold" variant="h4">
      <span>{children}</span>
      {githubUrl && (
        <Tooltip title="Github url">
          <IconButton href={githubUrl} target="_blank">
            <GithubIcon />
          </IconButton>
        </Tooltip>
      )}
      {websiteUrl && (
        <Tooltip title="Website url">
          <IconButton href={websiteUrl} target="_blank">
            <WebIcon />
          </IconButton>
        </Tooltip>
      )}
    </Typography>
  );
}

export function ProjectDescription({ children }: ChildrenProp) {
  return (
    <div className="min-h-0 overflow-y-scroll">
      <Typography variant="body1">{children}</Typography>
    </div>
  );
}

export function ProjectImage({ alt, src }: ProjectImageProps) {
  const modal = useModal(ImageModal);

  return (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <img
      alt={alt}
      className="m-auto size-96 cursor-pointer object-contain"
      onClick={() => modal.show({ alt, src })}
      src={src}
    />
  );
}

export function ProjectImages({ images }: { images: ProjectImageProps[] }) {
  return (
    <Carousel elements={images.map(({ alt, src }) => (
      <ProjectImage alt={alt} key={faker.string.uuid()} src={src} />
    ))}
    />
  );
}

export function ProjectSkill({ description, label }: ProjectSkillProps) {
  return (
    <Tooltip title={description}>
      <Chip className="select-none" color="default" label={label} />
    </Tooltip>
  );
}

export function ProjectSkills({ skills }: { skills: ProjectSkillProps[] }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <Typography color="primary" variant="h6">
        Compétences
      </Typography>
      <div className="flex flex-wrap gap-4">
        {skills.map(({ description, label }) => (
          <ProjectSkill description={description} key={faker.string.uuid()} label={label} />
        ))}
      </div>
    </div>
  );
}

export function ProjectDescriptionTitle({ children }: ChildrenProp) {
  return <Typography variant="h6">{children}</Typography>;
}

export function ProjectDescriptionText({ children }: ChildrenProp) {
  return <Typography variant="body1">{children}</Typography>;
}

export interface ProjectComponentProps {
  description: ReactNode;
  githubUrl?: string;
  images: ProjectImageProps[];
  skills: ProjectSkillProps[];
  title: string;
  websiteUrl?: string;
}

export default function ProjectComponent(props: ProjectComponentProps) {
  const {
    description, githubUrl, images, skills, title, websiteUrl,
  } = props;
  return (
    <div className="flex flex-1 flex-col gap-4 px-16 md:h-[60vh] md:flex-row">
      <div className="flex flex-1 flex-col justify-between gap-4">
        <ProjectTitle githubUrl={githubUrl} websiteUrl={websiteUrl}>
          {title}
        </ProjectTitle>
        <ProjectDescription>{description}</ProjectDescription>
        <ProjectSkills skills={skills} />
      </div>
      <div className="flex flex-1 items-center">
        <ProjectImages images={images} />
      </div>
    </div>
  );
}
