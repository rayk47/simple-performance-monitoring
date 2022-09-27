export type mapOfTrackers = {
  [property: string]: {
    startTime: number;
    endTime: number;
    totalTime: number;
    startCount: number;
    endCount: number;
  };
};

/**
 * A Singleton for the Simple Performance Monitoring class
 * This singleton allows you to track performance between two points in time.
 * The singleton also allows for the use of a tracker for functions that are repeatedly called so as to allow for gathering average values
 */
export class SimplePerformanceMonitor {
  public static _instance: SimplePerformanceMonitor;
  private mapOfTrackers: mapOfTrackers = {};

  constructor() {
    if (SimplePerformanceMonitor._instance) {
      throw new Error('Use SimplePerformanceMonitor.instance instead of new()');
    }
    SimplePerformanceMonitor._instance = this;
  }

  static get instance() {
    return (
      SimplePerformanceMonitor._instance ??
      SimplePerformanceMonitor._instance === new SimplePerformanceMonitor()
    );
  }

  /**
   * Create a new tracker
   * @param key the key that should be used to find and start/update the tracker
   */
  static startTracker(key: string) {
    if (SimplePerformanceMonitor.instance.mapOfTrackers[key] === undefined) {
      SimplePerformanceMonitor.instance.mapOfTrackers[key] = {
        startTime: 0,
        endTime: 0,
        totalTime: 0,
        startCount: 0,
        endCount: 0,
      };
    }
    SimplePerformanceMonitor.instance.mapOfTrackers[key].startTime = Date.now();
    SimplePerformanceMonitor.instance.mapOfTrackers[key].startCount =
      SimplePerformanceMonitor.instance.mapOfTrackers[key].startCount + 1;
  }

  /**
   * Stop a tracker
   * @param key the key that should be used to find and stop the tracker
   */
  static stopTracker(key: string) {
    if (SimplePerformanceMonitor.instance.mapOfTrackers[key] === undefined) {
      console.log(
        `SimplePerformanceMonitor - Tracker does not exist for ${key} so the operation of stopping the tracker could not be completed`
      );
    }
    if (
      SimplePerformanceMonitor.instance.mapOfTrackers[key].startTime ===
      undefined
    ) {
      console.log(
        `SimplePerformanceMonitor - Attempted to stop the tracker for ${key} but the tracker has not yet been started`
      );
    } else {
      SimplePerformanceMonitor.instance.mapOfTrackers[key].endCount =
        SimplePerformanceMonitor.instance.mapOfTrackers[key].endCount + 1;
      SimplePerformanceMonitor.instance.mapOfTrackers[key].totalTime =
        SimplePerformanceMonitor.instance.mapOfTrackers[key].totalTime +
        (SimplePerformanceMonitor.instance.mapOfTrackers[key].endTime -
          SimplePerformanceMonitor.instance.mapOfTrackers[key].startTime);
    }
  }

  /**
   * Print all tracker details for a particular key
   * @param key the key used to find the tracker to print
   */
  static printTrackerForKey(key: string) {
    const indexedItem = SimplePerformanceMonitor.instance.mapOfTrackers[key];
    if (indexedItem.totalTime) {
      if (indexedItem.startCount !== indexedItem.endCount) {
        console.log(
          `SimplePerformanceMonitor - Timer ${key} has open timers that have not been closed`
        );
      }
      const totalTime = new Date(indexedItem.totalTime);
      const averageTime = new Date(
        indexedItem.totalTime / indexedItem.endCount
      );
      const validMessage = `SimplePerformanceMonitor -  ${key} Total[ ${totalTime.getMinutes()}:${totalTime.getSeconds()}:${totalTime.getMilliseconds()} ] Average[ ${averageTime.getMinutes()}:${averageTime.getSeconds()}:${averageTime.getMilliseconds()}] Called[${
        indexedItem.endCount
      }]`;
      console.log(validMessage);
    }
  }

  /**
   * Print all tracker details currently live
   */
  static printAllTrackers() {
    for (const key in SimplePerformanceMonitor.instance.mapOfTrackers) {
      SimplePerformanceMonitor.printTrackerForKey(key);
    }
  }
}
