import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUser from '../context/useUser';
import dayjs from 'dayjs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./ShowTimesFinnkino.css"

const url = process.env.REACT_APP_API_URL

const ShowTimesFinnkino = () => {
  const { user } = useUser();
  const [schedule, setSchedule] = useState([]);
  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [nrOfDays, setNrOfDays] = useState(1);
  const [area, setArea] = useState('1029');
  const [selectedShowtimes, setSelectedShowtimes] = useState([]);
  const [searchParams] = useSearchParams(); 

  const groupId = searchParams.get('addToGroup'); 

  const navigate = useNavigate();

  const theatreAreas = [
    { id: '1029', name: 'Choose Location' },
    { id: '1014', name: 'Capital Area' },
    { id: '1012', name: 'Espoo' },
    { id: '1039', name: 'Espoo: OMENA' },
    { id: '1038', name: 'Espoo: SELLO' },
    { id: '1002', name: 'Helsinki' },
    { id: '1045', name: 'Helsinki: ITIS' },
    { id: '1031', name: 'Helsinki: KINOPALATSI' },
    { id: '1032', name: 'Helsinki: MAXIM' },
    { id: '1033', name: 'Helsinki: TENNISPALATSI' },
    { id: '1013', name: 'Vantaa: FLAMINGO' },
    { id: '1015', name: 'Jyväskylä: FANTASIA' },
    { id: '1016', name: 'Kuopio: SCALA' },
    { id: '1017', name: 'Lahti: KUVAPALATSI' },
    { id: '1041', name: 'Lappeenranta: STRAND' },
    { id: '1018', name: 'Oulu: PLAZA' },
    { id: '1019', name: 'Pori: PROMENADI' },
    { id: '1021', name: 'Tampere' },
    { id: '1034', name: 'Tampere: CINE ATLAS' },
    { id: '1035', name: 'Tampere: PLEVNA' },
    { id: '1047', name: 'Turku and Raisio' },
    { id: '1022', name: 'Turku: KINOPALATSI' },
    { id: '1046', name: 'Raisio: LUXE MYLLY' }
  ];

  useEffect(() => {
    const fetchSchedule = () => {
      const apiUrl = `https://www.finnkino.fi/xml/Schedule?area=${area}&dt=${date}&nrOfDays=${nrOfDays}`; // || 'today'

      fetch(apiUrl)
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(data, "application/xml");

          if (xml.querySelector("parsererror")) {
            console.error("Error parsing XML");
            return;
          }

          const shows = xml.getElementsByTagName("Show");
          const scheduleData = [];

          for (const show of shows) {
            const title = show.querySelector("Title")?.textContent;
            const showTime = show.querySelector("dttmShowStart")?.textContent;
            const theatre = show.querySelector("Theatre")?.textContent;

            if (title && showTime && theatre) {
              scheduleData.push({ title, showTime, theatre });
            }
          }

          setSchedule(scheduleData);
          setFilteredSchedule(scheduleData); //  Init list
        })
        .catch((error) => console.error("Error fetching Finnkino schedule:", error));
    };

    fetchSchedule();
  }, [area, date, nrOfDays]); // Re-fetch schedule

  // Filter the schedule
  useEffect(() => {
    let filtered = schedule;

    if (movieName) {
      filtered = filtered.filter(show => 
        show.title.toLowerCase().includes(movieName.toLowerCase())
      );
    }

   if (location) {
      filtered = filtered.filter(show => 
        show.theatre.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (date) {
      const selectedDate = new Date(date).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      filtered = filtered.filter(show => {
        const showDate = show.showTime.split('T')[0]; // Get date part from showTime
        return showDate === selectedDate;
      });
    }

    setFilteredSchedule(filtered);
  }, [movieName, location, date, schedule]);

  // Handle showtime selection
  const handleSelectShowtime = (showtime) => {
    setSelectedShowtimes((prevSelected) => {
      if (prevSelected.includes(showtime)) {
        return prevSelected.filter(item => item !== showtime);
      } else {
        return [...prevSelected, showtime];
      }
    });
  };

  const handleAddShowtimesToGroup = async () => {
    if (!groupId || selectedShowtimes.length === 0) {
      alert('Please select at least one showtime and a valid group.');
      return;
    }

    try {
      const addPromises = selectedShowtimes.map((showtime) =>
        axios.post(`${url}/group/${groupId}/addshowtime`, {
          userId: user.id,
          movieTitle: showtime.title,
          showTime: showtime.showTime,
          theatre: showtime.theatre,
          description: `${showtime.title} will be shown on ${dayjs(showtime.showTime).format('YYYY-MM-DD HH:mm:ss')} at ${showtime.theatre} `
        })
      );

      await Promise.all(addPromises);
      alert('Showtimes added to group successfully!');
      navigate(`/groups/${groupId}`);
    } catch (error) {
      console.error('Error adding showtimes to group:', error);
      alert('Failed to add showtimes to group, please try again.');
    }
  };

  return (
    <div className='Background'>
      <h1 className='Maintext'>Finnkino Schedule</h1>
      {/* Search Form */}
      <div className='Filters'>
        <input
          type="text"
          placeholder="Search by Movie Name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          className='Filter'
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className='Filter'
        />
        <select className='Filter-select' value={area} onChange={(e) => setArea(e.target.value)}>
          {theatreAreas.map(area => (
            <option key={area.id} value={area.id}>{area.name}</option>
          ))}
        </select>
        <select className="Filter-select" value={nrOfDays} onChange={(e) => setNrOfDays(e.target.value)}>
          <option value="1">1 day</option>
          <option value="2">2 days</option>
          <option value="3">3 days</option>
          <option value="7">1 week</option>
          <option value="31">1 month</option>
          </select>
      </div>

      {/* Schedule List */}
      <ul className='Schedule'>
        <div className='Table' >
          <p className='Table-content'>Movie</p>
          <p className='Table-content'>Date/Time</p>
          <p className='Table-content'>Theatre</p>
        </div>
        {filteredSchedule.length === 0 ? (
          <p className='Movie'>No results found</p>
        ) : (
          filteredSchedule.map((movie, index) => (
            <div
              key={index}
              className={`MovieTable ${selectedShowtimes.includes(movie) ? 'selected' : ''}`}
              onClick={() => handleSelectShowtime(movie)}
            >
              <li className='Movie' key={index}>
                {movie.title}
              </li>
              <li className='Movie' key={index}>
              {dayjs(movie.showTime).format('YYYY-MM-DD /HH:mm:ss')}
              </li>
              <li className='Movie' key={index}>
                {movie.theatre}
                
              </li>
            </div>
          ))
        )}
      </ul>
       {/* Add to Group Button */}
       {groupId && (
        <button
          className="add-to-group-button"
          onClick={handleAddShowtimesToGroup}
          disabled={selectedShowtimes.length === 0}
        >
          Add Selected Showtimes to Group
        </button>
      )}
    </div>
    )
  };
  

export default ShowTimesFinnkino;