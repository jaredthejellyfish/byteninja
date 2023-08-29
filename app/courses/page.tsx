import { redirect } from 'next/navigation';
import React from 'react';

import { getServerUser } from '@/lib/utils/getServerUser';
import PageContainer from '@/components/page-container';
import CourseCard from '@/components/course-card';

const Profile = async () => {
  const { user, isError, error } = await getServerUser('courses');

  if (isError && error === 'Session not found') {
    redirect('/api/auth/signin');
  }

  return (
    <PageContainer>
      <div className="flex flex-row">
        {user?.courses?.map((course) => (
          <CourseCard
            slug={course.slug}
            name={course.name}
            description={course.description}
            image={course.image}
            authorId={course.authorId}
            key={course.id}
          />
        ))}
      </div>
    </PageContainer>
  );
};

export default Profile;
