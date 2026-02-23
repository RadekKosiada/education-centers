import type { NextApiResponse } from "next";

export async function loadCourses(
    res: NextApiResponse 
) {
    const URL = "https://www.vhsit.berlin.de/VHSKURSE/OpenData/Kurse.json";
    try {
        const response = await fetch(URL);
       
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
          }

          const data = await response.json();
          return res.status(200).json(data);

    } catch(error: any) {
        res.status(500).json({error: error.message})
    }
   
  }