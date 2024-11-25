import React,{useState,useEffect} from 'react';
import axios from 'axios';
import useUser from '../context/useUser';
import FavoriteMovies from '../components/FavoriteMovies'
import ShareButton from '../components/ShareButton'
import ToggleSwitch from '../components/ToggleSwitch'

const url = process.env.REACT_APP_API_URL

export default function Profile() {
  const { user } = useUser();
  const [isPublic, setIsPublic] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const fetchShareInfo = async () => {
      try {
        const response = await axios.get(`${url}/user/share/${user.id}`);
        setIsPublic(response.data.is_public);
        setShareUrl(response.data.share_url);
      } catch (error) {
        console.error('Error fetching share info:', error);
      }
    };
    fetchShareInfo();
  }, [user.id]);

  const handleToggle = async (newState) => {
    setIsPublic(newState);

    try {
      await axios.put(`${url}/user/share/${user.id}/visibility`, { isPublic: newState });
      console.log('Visibility updated successfully');
    } catch (error) {
      console.error('Error updating visibility:', error);
    }
  };

   // Generate share URL handler
   const handleGenerateShareUrl = async () => {
    try {
      const response = await axios.get(`${url}/user/share/${user.id}`);
      setShareUrl(response.data.share_url);
    } catch (error) {
      console.error('Error generating share URL:', error);
    }
  };
  
  return (
    <div>
      <h2>My Favorite Movies</h2>
      <div style={{ padding: '20px' }}>
        
        <p>{isPublic ? "Share Favorite List" : "Do not share"}</p>
        <ToggleSwitch initialState={isPublic} onToggle={handleToggle} />
      </div>
      <ShareButton
        isPublic={isPublic}
        shareUrl={shareUrl}
        onGenerateUrl={handleGenerateShareUrl}
      />
      <FavoriteMovies />

      <h2>My Comment</h2>

      <h3>My Group</h3>
      
    </div>
  )
}
