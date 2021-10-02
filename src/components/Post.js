import react from 'react';
import { Link } from 'react-router-dom';

const Post = ({post}) => {
    //create style object
    const div = {
        textAlign: "center", 
        border: "3px solid",
        margin: "10px auto",
        width: "80%"
    }

    return (
        <div style={div}>
            <Link to={`post/${post.id}`}>
                <h1>{post.subject}</h1>
            </Link>
            <h2>{post.details}</h2>
        </div>
    )
};

export default Post;