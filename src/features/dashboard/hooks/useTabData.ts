import { useState, useEffect } from 'react';
import { getMissions } from '../../MyMissions/services/missionService';
import { getLeaves } from '../../MyLeaves/services/leaveService';
import { getPerformance } from '../../MyClocking/services/clockingService';
import type { TabContent } from '../types';

/**
 * Custom hook to fetch data for all tabs
 */
export const useTabData = (isOpen: boolean) => {
  const [data, setData] = useState<TabContent>({
    missions: [],
    leaves: [],
    performance: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [missionsData, leavesData, performanceData] = await Promise.all([
          getMissions(),
          getLeaves(),
          getPerformance(),
        ]);
        
        setData({
          missions: missionsData,
          leaves: leavesData,
          performance: performanceData,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  return { data, loading, setData };
};
