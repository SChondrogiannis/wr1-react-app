import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { GlobalState } from '../App';
import { GlobalState } from '../services/GlobalState';
import axios from 'axios'; 
// import { useNavigate } from 'react-router-dom';

const SinglePost = () => {
  const { id } = useParams();
  // const { posts, photos, mapPostImages, getData } = useContext(GlobalState) || {}; 
  const { posts } = useContext(GlobalState) || {};
  const [post, setPost] = useState(null);
  const [randomImage, setRandomImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  // const navigate = useNavigate();

  const getRandomImage = (images) => {
    // return images[Math.floor(Math.random() * images.length)];
    const image = images[Math.floor(Math.random() * images.length)];
    console.log('New Image: ',image);
    return image;
  };

  const getPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
      console.log( 'getPost: ',response );
      const postData = response.data; 
      if (!postData || !postData.id) {
        setPost(null);
        setRandomImage(null);
      } else {
        setPost(postData);
        if (postData.images && postData.images.length > 0) {
          setRandomImage(getRandomImage(postData.images)); 
        } else {
          setRandomImage(null);
        }
      }
    } catch (error) {
      console.log('Error getPost:', error);
      // navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  // In case the globalState has not init yet, we retrieve data to display from the getPost method. Else we use the globalScope
  useEffect(() => {
    if (posts && posts.length > 0) {
      const foundPost = posts.find((post) => post.id === parseInt(id));
      if (foundPost) {
        setPost(foundPost);
        setRandomImage(getRandomImage(foundPost.images));
        setIsLoading(false);
      } else {
        // navigate('/');
      }
    } else {
      getPost(); 
    }
  }, [id, posts]);

  if (isLoading) {
    return <div className="text-center text-2xl mt-20">Loading...</div>; 
  }

  console.log('SinglePost Image:', randomImage?.url);

  const firstLetterCap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1); 
  };

  return (

    <div className="max-w-5xl mx-auto my-16 p-8">
      {post ? (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900">{firstLetterCap(post.title)}</h1>
            <p className="text-lg text-gray-600 mb-8">{post.body}</p>
          </div>
          {randomImage && (
            <img src={randomImage.url} alt={post.title} className="w-full h-auto object-cover rounded-md" />
          )}
        </div>
      ) : (
        <div className="text-center text-xl">Post not exist.</div>
      )}
    </div>
  );
};

export default SinglePost; 
