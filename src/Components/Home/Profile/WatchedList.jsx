import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import ScrollHorizontal from 'react-scroll-horizontal';
import {MoviePoster, MovieTitle, ChildDiv, Placeholder} from '../../../Components/StyledComponents';

export const WatchedList = (props) => {

    const firestore = firebase.firestore();

    const [userdata, loading, error] = useDocumentData(
        firestore.doc('users/' + props.user)
    );

    return (
        <>
            <h1 className="mb-4 bold">Watched List</h1>
            <div style={{ height: `22.7em` }}>
            {userdata && userdata.watched.length > 3  ?

            <ScrollHorizontal>
            {userdata && userdata.watched.map(movie =>
            <ChildDiv>
                <MoviePoster variant="top" src={movie.poster} />
                <MovieTitle key={movie.id}>{movie.title}</MovieTitle>
            </ChildDiv>
            )}
            </ScrollHorizontal> 

            : userdata && userdata.watched.length > 0 ?
            <ScrollHorizontal config= {{ stiffness: 0, damping: 0 }}>
            {userdata.watched.map(movie =>
            <Placeholder>
                <MoviePoster variant="top" src={movie.poster} />
                <MovieTitle key={movie.id}>{movie.title}</MovieTitle>
            </Placeholder>
            )}
            </ScrollHorizontal>
            :
            'Loading...'
            }
            </div>
        </>
    );
};