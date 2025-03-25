import * as React from 'react'; import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
export default function CustomizedBadges() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartArr);
  const totalItems = cartItems.reduce((total, item) => total + item.qty, 0);
  return (
    <IconButton aria-label="Cart" onClick={() => navigate('/cart')}>
      <StyledBadge badgeContent={totalItems} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
