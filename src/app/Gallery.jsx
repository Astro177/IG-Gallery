/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const Gallery = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get(
        `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,thumbnail_url,permalink&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_KEY}`
      );
      setPosts(res.data);
    };
    getPosts();
  }, []);

  const totalPosts = posts.length;
  const itemsPerPage = 9;

  const totalPages = Math.ceil(totalPosts / itemsPerPage);

  const PageNumbers = [...Array(totalPages).keys()];

  const startIndex = currentPage * itemsPerPage;
  const visiblePosts = posts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <h1 className="text-center text-5xl font-bold mt-12">
        Instagram Gallery
      </h1>
      <div className="grid grid-cols-3 gap-4 px-12 mt-12 justify-center">
        {visiblePosts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.media_type === "VIDEO" ? (
              <video
                controls
                className="object-cover aspect-square rounded-sm hover:scale-110 transition-all duration-300"
              >
                <source src={post.media_url} type="video/mp4" />
              </video>
            ) : (
              <img
                className="object-cover aspect-square rounded-sm hover:scale-110 transition-all duration-300"
                src={post.media_url}
                alt={post.caption}
              />
            )}
          </a>
        ))}
      </div>
      <div className="flex justify-center mb-12 gap-6 ">
        {PageNumbers.map((number) => (
          <button
            key={number}
            className={
              currentPage === number
                ? "btn btn-accent font-bold text-xl hover:btn-info mt-6 mb-48"
                : "btn btn-neutral mt-6"
            }
            onClick={() => setCurrentPage(number)}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Gallery;
