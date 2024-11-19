import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchExhibits, deletePost } from '../store/slices/exhibitActions';
import Post from '../components/Post';
import { RootState, AppDispatch } from '../store/store';

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { exhibits, error, currentPage, lastPage } = useSelector((state: RootState) => state.exhibits);
    const router = useRouter();
    const { page = 1 } = router.query; 

    useEffect(() => {
        dispatch(fetchExhibits(Number(page))); 
    }, [page, dispatch]);

    const handleDelete = async (postId: number) => {
        console.log("Attempting to delete post with ID:", postId);
        try {
            await dispatch(deletePost(postId));
            console.log("Delete action dispatched");
        } catch (error) {
            console.error("Error in delete action:", error);
        }
    };

    const handlePageChange = (pageNumber: number) => {
        router.push(`/?page=${pageNumber}`);
    };

    console.log("Rendering exhibits:", exhibits);

    return (
        <div>

          
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '5px' }}>
                {lastPage &&
                    Array.from({ length: lastPage }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            disabled={Number(page) === index + 1}
                            style={{
                                padding: '10px 15px',
                                cursor: Number(page) === index + 1 ? 'default' : 'pointer',
                                backgroundColor: Number(page) === index + 1 ? '#ccc' : '#0070f3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
            </div>



            {Array.isArray(exhibits) && exhibits.length > 0 ? (
                exhibits.map((post: any) => (
                    <Post
                        key={post.id}
                        image={post.imageUrl}
                        description={post.description}
                        username={post.user?.username || "Unknown User"}
                        date={post.createdAt || "Unknown Date"}
                        commentCount={post.commentCount || 0}
                        onDelete={() => handleDelete(post.id)}
                        postId={post.id}
                    />
                ))
            ) : (
                <p>No posts available</p>
            )}

            

        </div>
    );
};

export default HomePage;
