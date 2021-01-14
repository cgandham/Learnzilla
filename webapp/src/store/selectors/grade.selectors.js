import { createSelector } from 'reselect';

const initialAssigns = state => state.CourseAssigns;

export const getAvailableCourseAssigns = createSelector(
    initialAssigns,
    (course) => course.filter(c => c.id != "" )
)

