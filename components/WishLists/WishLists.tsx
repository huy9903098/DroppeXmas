import React from 'react';
import { WishListItem } from './WishListItem';
import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '@store/actions/userAction';

interface WishListsProps {}

export const WishLists: React.FC<WishListsProps> = ({}) => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state: RootStateOrAny) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      {users && !loading ? (
        users.map(function (data) {
          return <WishListItem user={data} key={data.id} />;
        })
      ) : (
        <div>Loading ....</div>
      )}
    </>
  );
};
