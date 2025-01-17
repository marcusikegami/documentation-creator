import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import News from "./pages/News";
import PatientInfo from "./pages/PatientInfo";
import PtInfo from "./pages/PtInfo";
import SinglePost from "./pages/SinglePost";
import Testimonials from "./pages/Testimonials";
import Upload from "./pages/Upload";
import Approval from "./pages/pendingTestimonials";

const isLocalhost = window.location.hostname === "localhost";

const uri = isLocalhost ? "http://localhost:3001/graphql" : "/graphql";

const httpLink = createUploadLink({
  uri: uri,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pencilquarterapple" element={<Login />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/pending-testimonials" element={<Approval />} />
          <Route path="/news-and-updates" element={<News />} />
          <Route path="/info-for-physical-therapists" element={<PtInfo />} />
          <Route path="/patient-education" element={<PatientInfo />} />
          <Route path="/edit-post/:_id" element={<EditPost />} />
          <Route path="/post/:_id" element={<SinglePost />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
