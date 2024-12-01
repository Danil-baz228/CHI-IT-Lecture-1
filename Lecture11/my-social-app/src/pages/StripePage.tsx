import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExhibits, deletePost } from '../store/slices/exhibitActions';
import Post from '../components/Post';
import { RootState, AppDispatch } from '../store/store';
import { GetServerSideProps } from 'next';

interface StripePageProps {
    exhibits: any[];
    currentPage: number;
    error: string | null;
}

const StripePage: React.FC<StripePageProps> = ({ exhibits, currentPage, error }) => {
    const dispatch = useDispatch<AppDispatch>();
    const currentUserId = useSelector((state: RootState) => state.user.userId);

    const handleDelete = (postId: number) => {
        console.log("Attempting to delete post with ID:", postId);
        dispatch(deletePost(postId))
            .unwrap()
            .then(() => {
                console.log(`Post with ID ${postId} successfully deleted`);
            })
            .catch((error) => {
                console.error(`Failed to delete post with ID ${postId}:`, error);
            });
    };

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {exhibits.length > 0 ? (
                exhibits.map((exhibit: any) => (
                    <Post
                        key={exhibit.id}
                        image={exhibit.imageUrl}
                        description={exhibit.description}
                        username={exhibit.user?.username || 'Unknown User'}
                        date={exhibit.createdAt || 'Unknown Date'}
                        commentCount={exhibit.commentCount || 0}
                        onDelete={() => handleDelete(exhibit.id)}
                        postId={exhibit.id}
                    />
                ))
            ) : (
                <p>No posts available</p>
            )}
            {/* Пагінація */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '5px' }}>
                {Array.from({ length: 5 }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => window.location.href = `/?page=${index + 1}`}
                        style={{
                            padding: '10px',
                            backgroundColor: currentPage === index + 1 ? '#0070f3' : '#ccc',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = parseInt(context.query.page as string) || 1;

    try {
        
        const response = await fetch(`http://localhost:5000/api/exhibits?page=${page}`);
        const data = await response.json();

        return {
            props: {
                exhibits: data.data || [],
                currentPage: page,
                error: null,
            },
        };
    } catch (error: any) {
        console.error('Error fetching exhibits:', error.message);
        return {
            props: {
                exhibits: [],
                currentPage: page,
                error: 'Failed to load exhibits',
            },
        };
    }
};

export default StripePage;
