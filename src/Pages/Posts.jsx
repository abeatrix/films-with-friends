//NOT USED

import {firestore} from '../firebase.js'
import { useState, useEffect } from 'react';
import Post from '../Components/Home/Post/Post'

const Posts = () => {

    const [posts, getPost] = useState(null);

    useEffect( () => {
        async function fetchData() {
            const snapshot = await firestore.collection('post').get()
            const post = snapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id }))
            getPost(post)
            // console.log(post, 'posts')
        }
        fetchData();
    }, [])

    return (
        <>
        <h1>Hello</h1>
        {posts && posts.map(post => <Post key={post.id} id={post.id} text={post.text} image={post.poster} title={post.title} synopsis={post.synopsis} release={post.release}
        uid={post.uid} />)}
        </>
    );
}

export default Posts;
