import React, { useEffect, useState } from 'react';
import { db, storage } from '../config/firebase_config';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

export default function CRUD() {
    const [datas, setDatas] = useState([]);
    const [movie, setMovie] = useState({
        title: "",
        release: 0
    });
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);

    const movieCollectionRef = collection(db, "movies");

    const addMovieHandler = async () => {
        await addDoc(movieCollectionRef, movie);
    };
    const deleteMovieHandler = async (id) => {
        const movie = doc(db, "movies", id);
        await deleteDoc(movie);
    };

    const updateMoveHandler = async (id) => {
        const movie = doc(db, "movies", id);
        await updateDoc(movie, { title });
    };
    const fileHandler = async () => {
        if (!file) return;
        const fileRef = ref(storage, `images/${file.name}`);
        try {
            await uploadBytes(fileRef, file)
        }catch(err) {
            console.log(err, "error")
        }

    };
    useEffect(() => {
        const getDatas = async () => {
            const data = await getDocs(movieCollectionRef);
            const movies = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setDatas(movies);
        };
        getDatas();
    }, []);
    return (
        <>
            <h1>Crud</h1>
            <div>
                <input type="text" placeholder='movie' value={movie.title} onChange={(e) => setMovie(prev => ({ ...prev, title: e.target.value }))} />
                <input type="text" placeholder='release date' value={movie.release} onChange={(e) => setMovie(prev => ({ ...prev, release: e.target.value }))} />
                <button onClick={addMovieHandler}>Add Movies</button>

            </div>;

            {
                datas.map((movie) => {
                    return (
                        <>
                            <h1>{movie.title}</h1>
                            <p>{movie.release}</p>
                            <button onClick={() => deleteMovieHandler(movie.id)}> Delete Movie</button>
                            <input type="text" placeholder='title' onChange={e => setTitle(e.target.value)} />
                            <button onClick={() => updateMoveHandler(movie.id)}>Udpate movies</button>
                        </>
                    );
                })
            }
            <div>
                <input type="file" onChange={e => setFile(e.target.files[0])} />
                <button onClick={fileHandler}>Upload file</button>
            </div>
        </>
    );
}
