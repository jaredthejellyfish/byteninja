import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from './ui/auto-badge';

type Props = {
  name: string;
  description: string;
  image: string | null;
  authorId: string;
  slug: string;
  skills: string[];
};

const CourseCard = (props: Props) => {
  const { name, description, image, slug, skills } = props;
  return (
    <Link href={`/courses/${slug}`}>
      <Card className="max-w-[360px] h-[290px] flex flex-col justify-between">
        <CardHeader className="p-0">
          {image && (
            <Image
              src={image}
              alt="course image"
              className="w-full object-cover h-[130px] mb-2 rounded-t-lg"
              width={300}
              height={300}
            />
          )}
        </CardHeader>
        <CardContent
          className={'mt-2 flex flex-col justify-start h-full px-6 py-0'}
        >
          <CardTitle className="mb-3 max-h-[1em] overflow-hidden line-clamp-1 capitalize">
            {name}
          </CardTitle>
          <CardDescription className="overflow-hidden line-clamp-3 max-w-[320px]">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="justify-self-end px-6 pb-3 flex flex-row gap-2 ">
          {skills?.map((skill) => (
            <Badge key={skill} content={skill} />
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
