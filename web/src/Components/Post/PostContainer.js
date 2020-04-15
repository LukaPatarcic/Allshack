import React from "react";
import PostList from "./PostList";
import debounce from "lodash.debounce";
import {getPosts, postComment, postLike} from "../../Api/post";
import toastr from 'toastr/build/toastr.min'
import {commentLike, commentReply, getComments, getSubComments} from "../../Api/comment";
import PropTypes from 'prop-types';

export default class PostContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: false,
            loadingComments: false,
            loadingMoreComments: false,
            loadingMoreSubComments: false,
            loadingMoreSubCommentsId: 0,
            sendingComment: false,
            sendingCommentId: 0,
            sendingCommentReply: false,
            sendingCommentReplyId: 0,
            hasMore: true,
            hasMoreComments: true,
            offset: 0,
            commentOffset: 0,
            subCommentOffset: 0
        };

        this.handlePostLike = this.handlePostLike.bind(this);
        this.handlePostComment = this.handlePostComment.bind(this);
        this.handleCommentLike = this.handleCommentLike.bind(this);
        this.handleCommentReply = this.handleCommentReply.bind(this);
        this.commentModalCloseHandler = this.commentModalCloseHandler.bind(this);
        this.handleScroll = this.handleScroll.bind(this)
        this.getSubComments = this.getSubComments.bind(this);
        this.getComments = this.getComments.bind(this);
    }

    componentDidMount() {
        this.getPosts();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        if(window.scrollY+window.innerHeight > document.body.offsetHeight - 600) {
            this.getPosts();
        }
    }

    commentModalCloseHandler() {
        this.setState({hasMoreComments: true, commentOffset: 0})
    }

    getPosts() {
        const {offset,loading,hasMore} = this.state;
        this.setState({loading: true});
        if(loading || !hasMore) {
            return;
        }
        getPosts(offset,this.props.onlyMe)
            .then(data => {
                this.setState((prevState) => ({
                    loading: false,
                    posts: prevState.posts.concat(data),
                    offset: prevState.offset + 10,
                    hasMore: data.length >= 10
                }))
            })
            .catch(err => err.response.json().then(err => {
                this.setState({error: err.error, loading: false});
            }))
    }

    getComments(id,loadingMore = false) {
        const loading = loadingMore ? {loadingMoreComments: true} : {loadingComments: true}
        this.setState(loading);

        getComments(id,this.state.commentOffset)
            .then(response => {
                this.setState((prevSate) => {
                    prevSate.posts.filter(post => {
                        if(post.id === id) {
                            post.comments = [...post.comments,...response]
                        }
                        return post;
                    });

                    return {
                        posts: prevSate.posts,
                        commentOffset: prevSate.commentOffset + 10,
                        loadingComments: false,
                        hasMoreComments: response.length >= 10,
                        loadingMoreComments: false,
                    }
                });
            })
            .catch(err => err.response.json().then(err => {
                toastr.error(err.error);
                this.setState({
                    loadingComments: false,
                    loadingMoreComments: false,
                });
            }))
    }

    getSubComments(id,offset) {
        this.setState({loadingMoreSubComments: true,loadingMoreSubCommentsId: id});
        getSubComments(id,offset)
            .then(response => {
                this.setState((prevState) => {
                    prevState.posts.filter(post => {
                        post.comments.filter(comment => {
                            if(comment !== null) {
                                if (comment.id === id) {
                                    comment.subComments = [...comment.subComments,...response];
                                    comment.subCommentCount = comment.subCommentCount - response.length;
                                }
                            }
                        })

                        return post;
                    });

                    return {
                        comments: prevState.comments,
                        posts: prevState.posts,
                        hasMoreSubComments: response.length >= 10,
                        loadingMoreSubComments: false
                    }
                })
            })
            .catch(err => err.response.json().then(err => {
                toastr.error(err.error);
                this.setState({loadingMoreSubComments: false})
            }))
    }

    handlePostComment(comment,id) {
        this.setState({sendingComment: true,sendingCommentId: id});
        postComment(comment,id)
            .then(response => {
                this.setState((prevState) => {
                    prevState.posts.filter(post => {
                        if(post.id === id) {
                            post.comments = [response.comment,...post.comments];
                            post.commentsCount = post.commentsCount + 1;
                            return post;
                        }
                        return post;
                    });

                    return {
                        posts: prevState.posts,
                        sendingComment: false,
                    }
                })
            })
            .catch(err => err.response.json().then(err => {
                this.setState({sendingComment: false})
                toastr.error(err.error);
            }))

    }

    handleCommentReply(id,reply) {
        commentReply(id,reply)
            .then(response => {
                this.setState((prevState => {
                    prevState.posts.filter(post => {
                        if(post.comments !== null) {
                            post.comments.filter(comment => {
                                if (comment.id === id) {
                                    comment.subComments = [response.comment, ...comment.subComments];
                                }
                                return comment;
                            })
                            return post;
                        }
                        return post;
                    });
                    return {posts: prevState.posts,comments: prevState.comments};
                }))
            })
            .catch(err => err.response.json().then(err => {
                toastr.error(err.error);
            }))
    }

    handleCommentLike(id,liked) {

        this.setState((prevState) => {

            prevState.posts.filter(post => {
                post.comments.filter(comment => {
                    if(comment !== null) {
                        if (comment.id === id) {
                            console.log('before',comment,comment.liked,!comment.liked);
                            comment.liked = !liked;
                            comment.likes = comment.liked ? comment.likes+1 : comment.likes -1;
                            return post;
                        }
                    }
                })
                return post;
            });

            return {posts: prevState.posts};
        });

        const method = liked ? 'DELETE' : 'POST';
        commentLike(id,method)
            .then(response => {})
            .catch(err => err.response.json().then(err => {
                toastr.error(err.error);
            }))
    }

    handlePostLike(id,liked) {
        this.setState((prevState) => {
            prevState.posts.filter(post => {
                if (post.id === id) {
                    post.liked = !post.liked;
                    post.likes = post.liked ? post.likes+1 : post.likes -1;
                    return post;
                }
                return post;
            });
            return {posts: prevState.posts};
        });

        const method = liked ? 'DELETE' : 'POST';
        postLike(id,method)
            .then(response => {
            })
            .catch(err => err.response.json().then(err => {
                toastr.error(err.error);
            }))
    }

    render() {
        return (
            <PostList
                {...this.state}
                onHandlePostLike={this.handlePostLike}
                onHandleCommentReply={this.handleCommentReply}
                onHandleCommentLike={this.handleCommentLike}
                onHandlePostComment={this.handlePostComment}
                onCommentModalCloseHandler={this.commentModalCloseHandler}
                getComments={this.getComments}
                getSubComments={this.getSubComments}
            />
        );
    }


    static defaultProps = {
        onlyMe: false
    }
}

PostContainer.propTypes = {
    onlyMe: PropTypes.bool
};