import schedule, { Job, JobCallback } from 'node-schedule';

class TimeScheduler {
    private static jobs: Array<Job> = [];

    private static _instance: TimeScheduler = new TimeScheduler();

    private constructor() {
    }

    public static getInstance(): TimeScheduler {
        return TimeScheduler._instance;
    }

    addJob(jobName: string, scheduleMask: string, callback: JobCallback) {
        const job = schedule.scheduleJob(jobName, scheduleMask, callback);
        TimeScheduler.jobs.push(job);
    }

    removeJob(name: string) {
        const index = TimeScheduler.jobs.findIndex(it => it.name === name);

        if (index < 0) {
            return;
        }

        schedule.cancelJob(name);
        TimeScheduler.jobs.splice(index, 1);
    }

    getJobs(): Array<Job> {
        return TimeScheduler.jobs;
    }
}

export default TimeScheduler;