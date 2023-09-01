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
      <Card className="max-w-[400px] h-[350px]">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {image && (
            <Image
              src={image}
              alt="course image"
              className="w-[100px] h-[100px]"
              width={100}
              height={100}
            />
          )}
        </CardContent>
        <CardFooter>{authorId}</CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
