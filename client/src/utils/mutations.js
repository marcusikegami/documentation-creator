import { gql } from "@apollo/client";

export const LOGIN_ADMIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
        token
        }
    }
`;

export const ADD_POST = gql`
    mutation AddPost($header: String!, $body: String!, $category: String!, $video: String) {
        addPost(header: $header, body: $body, category: $category, video: $video) {
          _id
          header
          body
          video
          category
        }
    }
`;

export const EDIT_POST = gql`
    mutation EditPost($id: ID!, $header: String!, $body: String!, $category: String!, $video: String) {
        editPost(_id: $id, header: $header, body: $body, category: $category, video: $video) {
          _id
          header
          body
          video
          category
        }
    }
`;

export const REMOVE_POST = gql`
    mutation RemovePost($id: ID) {
        removePost(_id: $id) {
          _id
          header
          body
          video
          category
        }
    }
`;

export const POST_TESTIMONIAL = gql`
    mutation postTestimonial($body: String!, $name: String!) {
        postTestimonial(body: $body, name: $name) {
          _id
          body
          name
        }
    }
`;

export const EDIT_TESTIMONIAL = gql `
    mutation EditTestimonial($id: ID!, $approval: Boolean!) {
        editTestimonial(_id: $id, approval: $approval) {
          _id
          body
          name
          approval
        }
    }
`;