import React, { useEffect, useState } from 'react'
import ActivityService from '../services/activity.service';
import ActivityCard from '../components/ActivityCard';

const Home = () => {
  const [activites, setActivities] = useState([]);
  console.log(activites);

  const fetchData = async () => {
    try {
      const response = await ActivityService.getAllActivities();
      if (response.status === 200) {
        setActivities(response.data);
      }
    } catch (error) {
      console.log("fetching data error", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className='flex flex-col gap-5'>
        {activites.length === 0 && <p>ยังไม่มีกิจกรรม</p>}
        {activites.length > 0 &&
          activites.map((activity) => {
            return <ActivityCard key={activity.id} activity={activity} fetchData={fetchData} />;
          })}
      </div>
    </>
  );
};

export default Home