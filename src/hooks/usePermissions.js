import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch and manage user permissions
 * @returns {Object} An object containing permissions data, loading state, and error state
 */
const usePermissions = () => {
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/permissions');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch permissions: ${response.status}`);
        }
        
        const data = await response.json();
        setPermissions(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching permissions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  return { permissions, loading, error };
};

export default usePermissions;
