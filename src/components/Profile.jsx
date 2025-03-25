import { useSelector } from "react-redux"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser?.userName)


  return (
    <Stack direction="row" spacing={2}>
      {user ? (
        <Avatar>{user.charAt(0)}</Avatar>
      ) : (
        <p>Anonymous</p>
      )}
    </Stack>
  );
}

export default Profile;