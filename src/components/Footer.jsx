import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
// import { GlobalState } from '../services/GlobalState'; 
import siteConfig from '../assets/siteConfig.json';

const Footer = ({ posts }) => {

  const { siteName } = siteConfig;

  // We don't want to run the GlobalState if the user goes to a specific post, so either we had to make a call to the backend to retrieve the last posts if the posts variable is empty, or no data message.
  // const { posts } = useContext(GlobalState); 
  const last3Posts = posts.slice(-3);

  const returnLastPosts = () => {
    if (last3Posts && last3Posts.length > 0) {
      return last3Posts.map((post) => (
        <li key={post.id}>
          <Link to={`/post/${post.id}`} className="hover:text-gray-400 transition-colors">
            {post.title.length > 20 ? `${post.title.substring(0, 20)}...` : post.title}
          </Link>
        </li>
      ));
    } else {
      return <li>No latest posts for you.</li>;
    }
  };

  return (

    <footer className="py-8">
      <div className="w-10/12 mx-auto border-t border-gray-300"></div>
      <div className="container mx-auto px-4 mt-8 md:px-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <p className="mb-4">{siteName}</p>
          </div>
          <ul className="flex space-x-4 mt-4 justify-start">
            <li><a href="#" className="transition-colors"><FaFacebook /></a></li>
            <li><a href="#" className="transition-colors"><FaTwitter /></a></li>
            <li><a href="#" className="transition-colors"><FaLinkedin /></a></li>
            <li><a href="#" className="transition-colors"><FaInstagram /></a></li>
            <li><a href="#" className="transition-colors"><FaYoutube /></a></li>
          </ul>
        </div>

        <div className="md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
          <ul className="space-y-2">
            {returnLastPosts()}
          </ul>
        </div>

        <div className="md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Pages</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-gray-400 transition-colors">Home</Link></li>
            <li><Link to="/contact" className="hover:text-gray-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Topic</h2>
          <p className="text-gray-400">Comming Soon... :(</p>
        </div>

      </div>

      <div className="text-center text-sm mt-8">
        &copy; {new Date().getFullYear()} {siteName}
      </div>

    </footer>

  );
};

export default Footer;