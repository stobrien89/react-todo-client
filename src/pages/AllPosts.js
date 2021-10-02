import React from "react";
import Post from '../components/Post';

const AllPosts = (props) => {
    const posts = props.posts.map(post => {
        return (
            <Post post={post} key={post.id}/>
        )
    })

    return <>{posts}</>
};

export default AllPosts;