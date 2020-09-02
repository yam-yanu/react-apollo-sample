import React from "react";
import {useQuery} from '@apollo/client'
import {Header} from "../organisms";
import {gql} from "@apollo/client";
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const GET_USER = gql`
    query Users($page: Int!) {
        users(
            first: 5
            page: $page
        ) {
            paginatorInfo {
                hasMorePages
                currentPage
                lastPage
            }
            data {
                id
                user_name
            }
        }
    }
`;

type UsersPaginator = {
  users: {
    paginatorInfo: {
      hasMorePages: boolean
      currentPage: number
      lastPage: number
    }
    data: User[]
  }
}

type User = {
  id: string
  user_name: string
}

export const UsersPage: React.FC = () => {
  const {error, loading, data, fetchMore} = useQuery<UsersPaginator>(GET_USER, {variables: {page: 1}});

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error(error);
  }

  return (
    <div>
      <Header/>
      <Box textAlign="center" m={3}>
        <Box width="60%" bgcolor="#eee" textAlign="left" display="inline-block">
          <pre>{JSON.stringify(data?.users, null, 2)}</pre>
        </Box>
        {data?.users.paginatorInfo.hasMorePages && (
          <Box width="60%" textAlign="center" display="inline-block">
            <Button
              onClick={() =>
                fetchMore({
                  variables: {
                    page: data.users.paginatorInfo.currentPage + 1,
                  },
                  updateQuery: (prev, {fetchMoreResult, ...rest}) => {
                    if (!fetchMoreResult) return prev;
                    fetchMoreResult.users.data = prev.users.data.concat(fetchMoreResult.users.data);
                    return fetchMoreResult;
                  },
                })
              }
            >
              Load More
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default UsersPage;
