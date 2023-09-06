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

type Props = {
  name: string;
  description: string;
  image: string | null;
  authorId: string;
  slug: string;
};

const CourseCard = (props: Props) => {
  const { name, description, image, authorId, slug } = props;
  return (
    <Link href={`/courses/${slug}`}>
      <Card className="max-w-[360px] h-[330px] flex flex-col justify-between">
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
        <CardContent className={'mt-2 flex flex-col justify-start h-full'}>
          <CardTitle className="mb-3 max-h-[2em] overflow-hidden line-clamp-2 capitalize">
            {name}
          </CardTitle>
          <CardDescription className="overflow-hidden line-clamp-3 max-w-[320px]">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="justify-self-end px-6 pb-4 ">
          <span className="">{authorId}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
