import React, { useState,useEffect } from 'react';
import { getDatabase, ref, set,push,get } from "firebase/database";

const PostPage = () => {
  const [officials, setOfficials] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [officerConcern, setOfficerConcern] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const db = getDatabase();

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure officer concern, title, and content are provided
    if (!officerConcern || !title || !content) {
      setError("All fields are required.");
      return;
    }

    try {
      await push(ref(db, "UserPosts/"), {
        title: title,
        officialConcern: officerConcern,
        content: content,
        images: images,
        status: status,
      });
      console.log("Post submitted successfully!");
      setTitle('')
      setOfficerConcern('')
      setContent('')
      setImages([])
      setStatus('')
    } catch (error) {
      console.log(error);
      setError("An error occurred while submitting the post.");
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length + images.length > 2) {
      setError("You can only upload up to 2 images.");
      return;
    }

    // Validate file types
    const invalidFiles = selectedImages.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      setError("Please upload only image files.");
      return;
    }

    setError(""); // Clear any previous errors
    setImages(prevImages => [...prevImages, ...selectedImages]);
  };

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  useEffect(() => {
    // Fetch officials' data from Firebase
    const fetchOfficials = async () => {
      try {
        const officialsRef = ref(db, 'officials/'); // Reference to the "officials" node
        const snapshot = await get(officialsRef); // Get the data
        if (snapshot.exists()) {
          // If data exists, map it to an array of official names
          const officialsData = Object.values(snapshot.val()).map((official) => official.Name);
          console.log(officialsData)
          setOfficials(officialsData); // Update state with official names
        } else {
          setError('No officials found.');
        }
      } catch (err) {
        setError('Failed to fetch officials.');
        console.error(err);
      }
    };

    fetchOfficials();
  }, []);
  return (
    <div>
      <div className="post-header">
        <img src = "../img/vector.png" alt = "vector"></img>
        <h2 className = 'text-block username'>GetUserName</h2>
      </div>
      
      {error && <p>{error}</p>}
      <form onSubmit={handlePostSubmit}>
        {/* Dropdown for selecting official */}
        {/* <select
          name="officials"
          value={officerConcern}
          onChange={(e) => setOfficerConcern(e.target.value)}
        >
          <option value="">Select Officer</option>
          {officials.map((official, index) => (
            <option key={index} value={official}>
              {official}
            </option>
          ))}
        </select> */}

        {/* Title input */}
        <input
          type='text'
          value={title}
          placeholder="Enter Post Title"
          onChange={(e) => setTitle(e.target.value)}
          id = "title"
        />

        {/* Content textarea */}
        <textarea
          name="content"
          cols="25"
          rows="5"
          value={content}
          placeholder="Enter Post Content"
          onChange={(e) => setContent(e.target.value)}
          id = "content"
        />

        {/* File input for images */}
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="file-input"
          style={{ display: 'none' }} 
        />
        
        <label htmlFor="images" className="file-upload">
        <img src = "../img/imgicon.png" alt = "vector" className = "img-icon"></img>
          Upload Images
        </label>

        {/* Display selected images */}
        {images.length > 0 && (
          <ul className="space-y-2 image-label">
            {images.map((image, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">{image.name}
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="px-2 py-1 text-sm text-red-600 hover:text-red-800 img-remove"
                >
                  Remove
                </button>
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Radio buttons for status */}
        <div> 
          <label>
            <input
              type="radio"
              value="commend"
              name="status"
              checked={status === "commend"}
              onChange={(e) => setStatus(e.target.value)}
            />
            Commend
          </label>
          <label>
            <input
              type="radio"
              value="report"
              name="status"
              checked={status === "report"}
              onChange={(e) => setStatus(e.target.value)}
            />
            Report
          </label>
        </div>

        {/* Submit Button */}
        <button type='submit' className = "post-btn">Post</button>
      </form>
    </div>
  );
};

export default PostPage;
