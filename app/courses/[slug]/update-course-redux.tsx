'use client';

import { useEffect } from 'react';

import { set, reset, CurrentCourse } from '@/redux/features/currentCourseSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

type Props = { currentCourse: CurrentCourse };

const UpdateCourseRedux = (props: Props) => {
  const currentCourse = useAppSelector((state) => state.currentCourseReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(set(props.currentCourse));
    return () => {
      dispatch(reset());
    };
  }, [props.currentCourse]);
};

export default UpdateCourseRedux;
