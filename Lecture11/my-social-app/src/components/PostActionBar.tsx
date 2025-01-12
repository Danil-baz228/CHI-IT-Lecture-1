import React, { useState } from 'react';
import { CardActions, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axiosInstance from '../api/axiosInstance';
import { useRouter } from 'next/router';

interface PostActionBarProps {
  userId: number;
  commentCount: number;
  postId: number;
}

const PostActionBar: React.FC<PostActionBarProps> = ({ userId, commentCount, postId }) => {
  const currentUserId = useSelector((state: RootState) => state.user.userId);
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  console.log('Current User ID:', currentUserId);
  console.log('Post User ID:', userId);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/exhibits/${postId}`);
      router.reload(); 
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <CardActions disableSpacing>
      {currentUserId === userId && (
        <IconButton onClick={handleDelete} aria-label="delete post">
          <DeleteIcon />
        </IconButton>
      )}
      <Typography variant="h6" sx={{ pl: 2 }}>
        Комментарии: {commentCount}
      </Typography>
    </CardActions>
  );
};

export default PostActionBar;
