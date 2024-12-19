export const calculateStatistics = (slots, logs) => {
  const occupiedSlots = slots.filter(slot => slot.occupied).length;
  const occupancyRate = Math.round((occupiedSlots / slots.length) * 100);

  const exitLogs = logs.filter(log => log.action === 'EXIT');
  let totalDuration = 0;

  exitLogs.forEach(exitLog => {
    const entryLog = logs.find(
      log =>
        log.action === 'ENTRY' &&
        log.carDetails.licensePlate === exitLog.carDetails.licensePlate &&
        new Date(log.timestamp) < new Date(exitLog.timestamp)
    );

    if (entryLog) {
      const duration = new Date(exitLog.timestamp) - new Date(entryLog.timestamp);
      totalDuration += duration;
    }
  });

  const averageDuration = exitLogs.length
    ? Math.round(totalDuration / exitLogs.length / 1000 / 60)
    : 0;

  return {
    occupancyRate,
    averageDuration,
    totalCars: logs.filter(log => log.action === 'ENTRY').length,
  };
};