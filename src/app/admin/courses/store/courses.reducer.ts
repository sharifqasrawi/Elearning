import { Course } from './../../../models/course.model';
import { Comment } from './../../../models/comment.model';

import * as CoursesActions from './courses.actions';

export interface State {
    courses: Course[],
    trashedCourses: Course[],
    nonClassMembers: { id: string, fullName: string }[],
    loading: boolean,
    loaded: boolean,
    loadingMembers: boolean,
    creating: boolean,
    created: boolean,
    updating: boolean,
    updated: boolean,
    deleting: boolean,
    deleted: boolean,
    publishing: boolean,
    published: boolean,
    errors: string[],
};

const initialState: State = {
    courses: [],
    trashedCourses: [],
    nonClassMembers: [],
    loading: false,
    loaded: false,
    loadingMembers: false,
    creating: false,
    created: false,
    updating: false,
    updated: false,
    deleting: false,
    deleted: false,
    publishing: false,
    published: false,
    errors: null,
};

export function coursesReducer(state: State = initialState, action: CoursesActions.CoursesActions) {

    switch (action.type) {
        case CoursesActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case CoursesActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                courses: [...action.payload]
            };
        case CoursesActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        /////////////

        case CoursesActions.FETCH_DELETED_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case CoursesActions.FETCH_DELETED_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                trashedCourses: [...action.payload]
            };
        case CoursesActions.FETCH_DELETED_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        /////////////

        case CoursesActions.CREATE_START:
            return {
                ...state,
                creating: true,
                created: false,
                errors: null
            };
        case CoursesActions.CREATE_SUCCESS:
            return {
                ...state,
                creating: false,
                created: true,
                courses: [...state.courses, action.payload]
            };
        case CoursesActions.CREATE_FAIL:
            return {
                ...state,
                creating: false,
                errors: [...action.payload]
            };

        /////////////

        case CoursesActions.CREATE_CLASS_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null
            };
        case CoursesActions.CREATE_CLASS_SUCCESS:
            const courseToCreateClassIndex = state.courses.findIndex(c => c.id === action.payload.id);
            const courseToCreateClass = state.courses.find(c => c.id === action.payload.id);
            const coursesAfterCreateClass = [...state.courses];

            const courseAfterCreateClass = {
                ...courseToCreateClass,
                cls: {
                    ...action.payload.cls,
                    members: [...action.payload.cls.members]
                }
            };

            coursesAfterCreateClass[courseToCreateClassIndex] = courseAfterCreateClass;

            return {
                ...state,
                updating: false,
                updated: true,
                courses: coursesAfterCreateClass
            };
        case CoursesActions.CREATE_CLASS_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };

        /////////////

        case CoursesActions.FETCH_NON_CLASS_MEMBERS_START:
            return {
                ...state,
                loadingMembers: true,
                errors: null
            };
        case CoursesActions.FETCH_NON_CLASS_MEMBERS_SUCCESS:
            return {
                ...state,
                loadingMembers: false,
                nonClassMembers: [...action.payload]
            };
        case CoursesActions.FETCH_NON_CLASS_MEMBERS_FAIL:
            return {
                ...state,
                loadingMembers: false,
                errors: [...action.payload]
            };

        /////////////

        case CoursesActions.DELETE_COMMENT_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null
            };
        case CoursesActions.DELETE_COMMENT_SUCCESS:
            const courseToDeleteCommentIndex = state.courses.findIndex(c => c.id === action.payload.courseId);
            const courseToDeleteComment = state.courses.find(c => c.id === action.payload.courseId);
            const coursesAfterDeleteComment = [...state.courses];

            const commentsAfterDelete = [...courseToDeleteComment.comments];

            if (action.payload.commentId) {
                const originalCommentIndex = courseToDeleteComment.comments.findIndex(c => c.id === action.payload.commentId);
                const originalComment = courseToDeleteComment.comments.find(c => c.id === action.payload.commentId);

                const originalCommentReplies = [...originalComment.replies];
                const commentToDeleteIndex = originalComment.replies.findIndex(c => c.id === action.payload.id);

                originalCommentReplies.splice(commentToDeleteIndex, 1);

                const updatedComment: Comment = {
                    ...originalComment,
                    replies: originalCommentReplies
                };


                commentsAfterDelete[originalCommentIndex] = updatedComment;

            } else {
                const originalCommentIndex = courseToDeleteComment.comments.findIndex(c => c.id === action.payload.id);
                commentsAfterDelete.splice(originalCommentIndex, 1);
            }


            const courseAfterDeleteComment = {
                ...courseToDeleteComment,
                comments: [
                    ...commentsAfterDelete
                ]
            };

            coursesAfterDeleteComment[courseToDeleteCommentIndex] = courseAfterDeleteComment;

            return {
                ...state,
                updating: false,
                updated: true,
                courses: coursesAfterDeleteComment
            };
        case CoursesActions.DELETE_COMMENT_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };

        /////////////

        case CoursesActions.UPDATE_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null
            };
        case CoursesActions.UPDATE_SUCCESS:
            const courseToUpdateIndex = state.courses.findIndex(c => c.id === action.payload.id);
            const courseToUpdate = state.courses.find(c => c.id === action.payload.id);
            const coursesAfterUpdate = [...state.courses];

            const courseAfterUpdate = {
                ...courseToUpdate,
                title_EN: action.payload.title_EN,
                description_EN: action.payload.description_EN,
                prerequisites_EN: action.payload.prerequisites_EN,
                duration: action.payload.duration,
                imagePath: action.payload.imagePath,
                isFree: action.payload.isFree,
                isPublished: action.payload.isPublished,
                languages: action.payload.languages,
                level: action.payload.level,
                price: action.payload.price,
                publishedAt: action.payload.publishedAt,
                updatedAt: action.payload.updatedAt,
                updatedBy: action.payload.updatedBy,
                category: {
                    ...action.payload.category
                }
            };

            coursesAfterUpdate[courseToUpdateIndex] = courseAfterUpdate;

            return {
                ...state,
                updating: false,
                updated: true,
                courses: coursesAfterUpdate
            };
        case CoursesActions.UPDATE_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };

        /////////////

        case CoursesActions.TRASH_RESTORE_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case CoursesActions.TRASH_SUCCESS:
            const courseToTrashIndex = state.courses.findIndex(c => c.id === action.payload.id);
            const coursesAfterTrash = [...state.courses];
            coursesAfterTrash.splice(courseToTrashIndex, 1);

            return {
                ...state,
                loading: false,
                loaded: true,
                courses: coursesAfterTrash,
            };
        case CoursesActions.RESTORE_SUCCESS:
            const courseToRestoreIndex = state.courses.findIndex(c => c.id === action.payload.id);
            const coursesAfterRestore = [...state.trashedCourses];
            coursesAfterRestore.splice(courseToRestoreIndex, 1);

            return {
                ...state,
                loading: false,
                loaded: true,
                trashedCourses: coursesAfterRestore,
            };
        case CoursesActions.TRASH_RESTORE_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        /////////////

        case CoursesActions.PUBLISH_UNPUBLISH_START:
            return {
                ...state,
                publishing: true,
                published: false,
                errors: null
            };
        case CoursesActions.PUBLISH_UNPUBLISH_SUCCESS:
            const courseToPublishIndex = state.courses.findIndex(c => c.id === action.payload.id);
            const courseToPublish = state.courses.find(c => c.id === action.payload.id);
            const coursesAfterPublish = [...state.courses];

            const courseAfterPublish = {
                ...courseToPublish,
                isPublished: action.payload.isPublished,
                publishedAt: action.payload.publishedAt,
            };

            coursesAfterPublish[courseToPublishIndex] = courseAfterPublish;

            return {
                ...state,
                publishing: false,
                published: true,
                courses: coursesAfterPublish
            };
        case CoursesActions.PUBLISH_UNPUBLISH_FAIL:
            return {
                ...state,
                publishing: false,
                errors: [...action.payload]
            };

        /////////////

        case CoursesActions.ADD_REMOVE_TAG_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null
            };
        case CoursesActions.ADD_REMOVE_TAG_SUCCESS:
            const courseToChangeIndex = state.courses.findIndex(c => c.id === action.payload.id);
            const courseToChange = state.courses.find(c => c.id === action.payload.id);
            const coursesAfterChange = [...state.courses];

            const courseAfterChange = {
                ...courseToChange,
                tags: [
                    ...action.payload.tags
                ]
            };

            coursesAfterChange[courseToChangeIndex] = courseAfterChange;

            return {
                ...state,
                updating: false,
                updated: true,
                courses: coursesAfterChange
            };
        case CoursesActions.ADD_REMOVE_TAG_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };

        /////////////////////

        case CoursesActions.ENROLL_USER_START:
            return {
                ...state,
                updating: true,
                errors: null
            };
        case CoursesActions.ENROLL_USER_SUCCESS:
            const courseToEnrollIndex = state.courses.findIndex(c => c.id === action.payload.courseId);
            const courseToEnroll = state.courses.find(c => c.id === action.payload.courseId);
            const coursesAfterEnroll = [...state.courses];

            const courseAfterEnroll = {
                ...courseToEnroll,
                cls: {
                    ...action.payload,
                    members: [
                        ...action.payload.members
                    ]
                }
            };

            coursesAfterEnroll[courseToEnrollIndex] = courseAfterEnroll;

            return {
                ...state,
                updating: false,
                courses: coursesAfterEnroll
            };
        case CoursesActions.ENROLL_USER_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };

        /////////////////////


        case CoursesActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };
        case CoursesActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                loaded: false,
                creating: false,
                created: false,
                updating: false,
                updated: false,
                deleting: false,
                deleted: false,
                publishing: false,
                published: false,
            };
        default:
            return state;
    }
}