import { useState } from "react";
import Header from "./header";
import SearchBar from "./search-bar";
import PostGrid from "./post-grid";
import Pagination from "./pagination";
import LoadingSpinner from "./loading-spinner";
import ErrorMessage from "./error-message";
import ethiopiaData from "../data/ethiopia-posts.json";

export default function EthiopiaExplorer() {
  const [posts] = useState(ethiopiaData.posts);
  const [filteredPosts, setFilteredPosts] = useState(ethiopiaData.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const postsPerPage = 6;

  const handleSearch = (searchTerm) => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <SearchBar onSearch={handleSearch} />

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      <PostGrid posts={currentPosts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
