import {SimplePerformanceMonitor} from '../src/SimplePerformanceMonitor';

export async function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export async function test() {
  SimplePerformanceMonitor.startTracker('Test');
  await delay(5000);
  console.log('Test');
  SimplePerformanceMonitor.stopTracker('Test');
  SimplePerformanceMonitor.printAllTrackers();
}

test();
