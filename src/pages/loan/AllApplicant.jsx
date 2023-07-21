import React, { useEffect, useState } from 'react';

const AllApplicant = () => {
    const [data, setData] = useState(null);

    const storedData = JSON.parse(localStorage.getItem('itaxData'));
    console.log(storedData.token)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.itaxeasy.com/loan/applications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedData}`,
          },
           
         
        });
        console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

//   if (!data) {
//     return <div>Loading...</div>;
//   }

  return (
    <div>
      <h2>Data:</h2>
      <pre></pre>
    </div>
  );
}

export default AllApplicant