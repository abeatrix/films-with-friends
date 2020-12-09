import { useState, useEffect } from 'react';
import { firestore } from '../../../firebase';
import Comment from './Comment';
import AddComment from './AddComment';
import Follow from '../../Follow/Follow';
import {ActivityCardWrapper, ActivityMovieCardWrapper, ActivityCardUserWrapper, MovieCardWrapper} from '../../StyledComponents'
import {Card} from 'react-bootstrap'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import '../../../../src/custom.scss';
import Avatar from "react-avatar";

const auth = firebase.auth();

const Post = (props) => {

    const[comments, getComments] = useState(null);

    useEffect( () => {
        async function fetchData() {
            await firestore.collection('comments').where('post', '==', props.id).orderBy('timestamp')
            .onSnapshot(snapshot => {
                const posts = snapshot.docs
                .map(doc => {
                  return { id: doc.id, ...doc.data() }
                })
                getComments(posts)
                // console.log(posts)
            })
            // .get();
            // const comments = snapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id }))
            // getComments(comments)
        }
        fetchData();
    }, [])

    // console.log(props)

    return (
        <>
            {/* <Follow style={{marginRight: "5%", padding: "5%"}} owner={props.uid}/> */}
            <div className="post__owner">
                <Avatar className="post__owner-img" name="Demo" round={true} size="45"/>
                <div className="post__owner-text">
                    <div className="post__owner-text__name">{props.uid}</div>
                    <div className="post__owner-text__label">recommended</div>
                </div>
            </div>
            <p className="post__caption mt-3">{props.text}</p>
            <MovieCardWrapper>
                <div className="mr-4">
                    <img className="round-border" src={`https://image.tmdb.org/t/p/w500/${props.image}`} style={{width: '150px', objectFit: 'cover'}}/>
                </div>
                <div className="post__movie">
                    <h4 className="post__movie-title">
                        {props.title} 
                        <span className="post__movie-title-date">
                             ({props.release})</span></h4>
                    <div className="post__movie-text">{props.synopsis}</div>
                </div>
            </MovieCardWrapper>
            <div style={{padding: '2%', width: '100%', marginLeft: '2%'}}>
                {comments && comments.map(comment =>
                <Comment key={comment.id} id={comment.id} content={comment.content} />
                )}
                <AddComment id={props.id} />
            </div>
        </>
    );
}

export default Post;