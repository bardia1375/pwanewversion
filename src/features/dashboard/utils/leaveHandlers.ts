import type { Leave } from '../../MyLeaves/types';

/**
 * Utility function to handle leave copy functionality
 */
export const handleCopyLeave = (leave: Leave) => {
  console.log('Leave copied:', leave);
  
  const leaveDetails = `${leave.reason}: ${leave.startDate}${
    leave.endDate !== leave.startDate ? ` تا ${leave.endDate}` : ''
  }`;
  
  // Using navigator clipboard API if available
  if (navigator.clipboard) {
    navigator.clipboard.writeText(leaveDetails)
      .then(() => console.log('Leave details copied to clipboard'))
      .catch(err => console.error('Could not copy text: ', err));
  }
};

/**
 * Utility function to handle leave deletion
 */
export const createLeaveDeleteHandler = (
  leaves: unknown[], 
  setLeaves: (leaves: unknown[]) => void
) => (id: number) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredLeaves = leaves.filter((leave: any) => leave.id !== id);
  setLeaves(filteredLeaves);
};
