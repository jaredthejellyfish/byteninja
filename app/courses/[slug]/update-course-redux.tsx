'use client';

import { useEffect } from 'react';
import React from 'react';

import { set, reset, CurrentCourse } from '@/redux/features/currentCourseSlice';
import { useAppDispatch } from '@/redux/hooks';

type Props = { currentCourse: CurrentCourse };

const UpdateCourseRedux = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(set(props.currentCourse));
    return () => {
      dispatch(reset());
    };
  }, [props.currentCourse, dispatch]);

  return <></>;
};

export default UpdateCourseRedux;
