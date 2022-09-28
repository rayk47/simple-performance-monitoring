import {SimplePerformanceMonitor} from '../src/SimplePerformanceMonitor';

export async function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export async function test() {
  SimplePerformanceMonitor.startTracker('Test a delay function');
  await delay(5000);
  SimplePerformanceMonitor.stopTracker('Test a delay function');
  SimplePerformanceMonitor.printAllTrackers();
}

test();
