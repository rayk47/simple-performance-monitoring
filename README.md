# simple-performance-monitoring

This simple performance monitoring library was inspired by [console.time()](https://developer.mozilla.org/en-US/docs/Web/API/console/time) and adds some additional functionality that I found console.time lacked while trying to debug and monitor performance issues in my application.

This library adds the additional functionality of allowing for the same timer to be run multiple times on a function and to provide a summary such as the total time and average time in MM:SS:MS. Below is a simple example of how you can start and stop a tracker as well as print out the details of the timers.

```
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
```

This will result in an output as follows

```
SimplePerformanceMonitor -  Test a delay function Total[ 0:5:3 ] Average[ 0:5:3] Called[1]
```

The Performance monitor is a singleton and will allow you to use trackers across multiple files by using a tracking key. 