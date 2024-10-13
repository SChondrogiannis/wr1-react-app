import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../services/GlobalState';
import { shuffleArray } from '../utils/shuffle';
import HomePagePosts from '../components/HomePagePosts';
import PostGallery from '../components/PostGallery';

const HomePage = () => {
  // const { mapPostImages } = useContext(GlobalState);
  const { posts } = useContext(GlobalState);
  const [homePagePosts, setHomePagePosts] = useState([]);
  const [postGallery, setPostGallery] = useState([]);

  useEffect(() => {
    const shuffledData = shuffleArray(posts);
    let firstPost = null; 
    let secondPost = null; 
    const galleryPosts = [];
  
    for (let i = 0; i < shuffledData.length; i++) {
      const post = shuffledData[i];
      if (!firstPost && post.images.length >= 1) {
        firstPost = post; 
      } else if (!secondPost && post.images.length >= 2) {
        secondPost = post; 
      } else if (post.images.length > 0) {
        galleryPosts.push(post); 
      }
      // Check that we selected the 2 posts for the HomePagePosts and the 9 posts for the PostGallery.
      if (firstPost && secondPost && galleryPosts.length >= 9) {
        break;
      }
    }
    console.log('Items for HomePage:',firstPost,secondPost,galleryPosts);
    setHomePagePosts([firstPost, secondPost]);
    setPostGallery(galleryPosts);
  }, [posts]);

  return (
    <div>
      { homePagePosts[0] && <HomePagePosts post={homePagePosts[0]} imageCount={1} /> }
      { homePagePosts[1] && <HomePagePosts post={homePagePosts[1]} imageCount={2} /> }
      <h2 className="text-3xl font-bold mb-8">Random Articles</h2>
      <PostGallery posts={postGallery} />
    </div>
  );
};

export default HomePage;