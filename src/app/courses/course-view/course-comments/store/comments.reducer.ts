import { Comment } from './../../../../models/comment.model';

import * as HomeCommentsActions from './comments.actions';

export interface State {
    comments: Comment[],
    loading: boolean,
    loadingLike: boolean,
    creating: boolean,
    created: boolean,
    updating: boolean,
    updated: boolean,
    deleting: boolean,
    errors: string[],
}

const initialState: State = {
    comments: [],
    loading: false,
    loadingLike: false,
    creating: false,
    created: false,
    updating: false,
    updated: false,
    deleting: false,
    errors: null
};

export function commentsReducer(state: State = initialState, action: HomeCommentsActions.HomeCommentsActions) {
    switch (action.type) {
        case HomeCommentsActions.FETCH_START:
            return {
                ...state,
                loading: true,
                errors: null,
            };

        case HomeCommentsActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: [...action.payload],
            };

        case HomeCommentsActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload],
            };

        ////////////////////

        case HomeCommentsActions.CREATE_START:
            return {
                ...state,
                creating: true,
                created: false,
                errors: null,
            };

        case HomeCommentsActions.CREATE_SUCCESS:

            let commentsAfterAdd = [...state.comments];

            if (action.payload.commentId) {
                const commentToAdd: Comment = {
                    ...action.payload
                };

                const originalComment = state.comments.find(c => c.id === commentToAdd.commentId);
                const originalCommentIndex = state.comments.findIndex(c => c.id === commentToAdd.commentId);

                const updatedComment: Comment = {
                    ...originalComment,
                    replies: [...originalComment.replies, action.payload]
                };

                commentsAfterAdd[originalCommentIndex] = updatedComment;

            } else {
                commentsAfterAdd = [action.payload, ...state.comments];
            }

            return {
                ...state,
                creating: false,
                created: true,
                comments: commentsAfterAdd,
            };

        case HomeCommentsActions.CREATE_FAIL:
            return {
                ...state,
                creating: false,
                errors: [...action.payload],
            };

        ////////////////////

        case HomeCommentsActions.DELETE_START:
            return {
                ...state,
                deleting: true,
                errors: null,
            };

        case HomeCommentsActions.DELETE_SUCCESS:

            const commentsAfterDelete = [...state.comments];

            if (action.payload.commentId) {
                const originalCommentIndex = state.comments.findIndex(c => c.id === action.payload.commentId);
                const originalComment = state.comments.find(c => c.id === action.payload.commentId);

                const originalCommentReplies = [...originalComment.replies];
                const commentToDeleteIndex = originalComment.replies.findIndex(c => c.id === action.payload.id);

                originalCommentReplies.splice(commentToDeleteIndex, 1);

                const updatedComment: Comment = {
                    ...originalComment,
                    replies: originalCommentReplies
                };


                commentsAfterDelete[originalCommentIndex] = updatedComment;

            } else {
                const commentToDeleteIndex = state.comments.findIndex(c => c.id === action.payload.id);
                commentsAfterDelete.splice(commentToDeleteIndex, 1);
            }
            return {
                ...state,
                deleting: false,
                comments: commentsAfterDelete,
            };


        case HomeCommentsActions.DELETE_FAIL:
            return {
                ...state,
                deleting: false,
                errors: [...action.payload],
            };


        /////////////////////

        case HomeCommentsActions.UPDATE_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null,
            };

        case HomeCommentsActions.UPDATE_SUCCESS:

            const commentsAfterUpdate = [...state.comments];

            if (action.payload.commentId) {
                const originalCommentIndex = state.comments.findIndex(c => c.id === action.payload.commentId);
                const originalComment = state.comments.find(c => c.id === action.payload.commentId);
                const originalCommentReplies = [...originalComment.replies];

                const replyToUpdateIndex = originalComment.replies.findIndex(c => c.id === action.payload.id);
                const replyToUpdate = originalComment.replies.find(c => c.id === action.payload.id);

                const updatedReply: Comment = {
                    ...replyToUpdate,
                    text: action.payload.text
                };

                originalCommentReplies[replyToUpdateIndex] = updatedReply;

                const updatedComment: Comment = {
                    ...originalComment,
                    replies: originalCommentReplies
                };


                commentsAfterUpdate[originalCommentIndex] = updatedComment;

                return {
                    ...state,
                    updating: false,
                    updated: true,
                    comments: commentsAfterUpdate,
                };

            } else {

                const CommentToUpdateIndex = state.comments.findIndex(c => c.id === action.payload.id);
                const CommentToUpdate = state.comments.find(c => c.id === action.payload.id);
                const commentsAfterUpdate = [...state.comments];

                const commentAfterUpdate = {
                    ...CommentToUpdate,
                    text: action.payload.text
                };

                commentsAfterUpdate[CommentToUpdateIndex] = commentAfterUpdate;
                return {
                    ...state,
                    updating: false,
                    updated: true,
                    comments: commentsAfterUpdate,
                };
            }


        case HomeCommentsActions.UPDATE_FAIL:
            return {
                ...state,
                deleting: false,
                errors: [...action.payload],
            };

        /////////////////////

        case HomeCommentsActions.LIKE_START:
            return {
                ...state,
                loadingLike: true,
                errors: null
            };
        case HomeCommentsActions.LIKE_SUCCESS:
            const commentToLikeIndex = state.comments.findIndex(c => c.id === action.payload.id);
            const commentToLike = state.comments.find(c => c.id === action.payload.id);
            const commentsAfterLike = [...state.comments];

            const commentAfterLike = {
                ...commentToLike,
                likes: [...action.payload.likes]
            };

            commentsAfterLike[commentToLikeIndex] = commentAfterLike;

            return {
                ...state,
                loadingLike: false,
                comments: commentsAfterLike
            };
        case HomeCommentsActions.LIKE_FAIL:
            return {
                ...state,
                loadingLike: false,
                errors: [...action.payload]
            };

        /////////////////////

        case HomeCommentsActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };


        case HomeCommentsActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                creating: false,
                created: false,
                deleting: false,
            };

        default:
            return state;
    }
}