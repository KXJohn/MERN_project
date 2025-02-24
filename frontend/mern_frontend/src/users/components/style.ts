import styled from "styled-components";

export const UserListContainer = styled.div`
  .users-list {
    list-style: none;
    margin: 0 auto;
    padding: 0;
    width: 90%;
    max-width: 50rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const UserItemContainer = styled.li`
  width: calc(45% - 2rem);
  min-width: 17.5rem;
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    height: 100%;
    text-decoration: none;
    padding: 10px;
    color: white;
    background: #292929;
    justify-content: space-around;
  }

  a:hover,
  a:active {
    background: #ffd900;
  }

  .user-item-content {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .user-image {
    width: 4rem;
    height: 4rem;
  }

  .user-info {
    text-align: left;
    padding-left: 10px;

    h2 {
      font-size: 1.5rem;
      margin: 0 0 0.5rem 0;
      font-weight: normal;
      color: #ffd900;
    }

    h2:hover,
    h2:active {
      color: #292929;
    }

    h3 {
      margin: 0;
    }

    h3:hover,
    h3:active {
      color: #292929;
    }
  }
`;
