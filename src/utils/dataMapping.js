// Match the photos with the related Posts creating a map object and than put the related images to each post. 
export const mapPhotosAndPosts = (posts, photos) => {
    const photoMap = {};
    photos.forEach((photo) => {
        const postId = photo.albumId;
        if (!photoMap[postId]) {
            photoMap[postId] = [];
        }
        photoMap[postId].push(photo);
    });
    return posts.map((post) => ({
        ...post,
        images: photoMap[post.id] ? photoMap[post.id] : []
    }));
};