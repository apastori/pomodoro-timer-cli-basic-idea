import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import path from 'path';
import Player from 'play-sound';

const player = Player({});
const soundFilePath = path.join(__dirname, '..', 'assets', 'notification.mp3');

const argv = yargs(hideBin(process.argv)).options({
  work: { type: 'number', default: 25, alias: 'w', describe: 'Work duration in minutes' },
  break: { type: 'number', default: 5, alias: 'b', describe: 'Break duration in minutes' },
  longBreak: { type: 'number', default: 15, alias: 'l', describe: 'Long break duration in minutes' },
  sessions: { type: 'number', default: 4, alias: 's', describe: 'Number of work sessions before a long break' },
}).argv as { work: number; break: number; longBreak: number; sessions: number };

class PomodoroTimer {
  private workMinutes: number;
  private breakMinutes: number;
  private longBreakMinutes: number;
  private sessions: number;
  private sessionCount = 0;
  private isWorkSession = true;

  constructor(work: number, breakTime: number, longBreak: number, sessions: number) {
    this.workMinutes = work;
    this.breakMinutes = breakTime;
    this.longBreakMinutes = longBreak;
    this.sessions = sessions;
    console.log(chalk.green('Pomodoro Timer Started! Press Ctrl+C to exit.'));
  }

  public start() {
    this.runNextSession();
  }

  private runNextSession() {
    if (this.isWorkSession) {
      this.sessionCount++;
      this.runTimer(this.workMinutes, 'Work');
    } else {
      const isLongBreak = this.sessionCount % this.sessions === 0;
      const breakType = isLongBreak ? 'Long Break' : 'Break';
      const breakDuration = isLongBreak ? this.longBreakMinutes : this.breakMinutes;
      this.runTimer(breakDuration, breakType);
    }
    this.isWorkSession = !this.isWorkSession;
  }

  private runTimer(durationMinutes: number, type: string) {
    let totalSeconds = durationMinutes * 60;
    const sessionType = type === 'Work' ? chalk.red(type) : chalk.blue(type);
    console.log(`
${sessionType} session started for ${durationMinutes} minutes.`);

    const interval = setInterval(() => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      process.stdout.write(
        `Time Remaining: ${chalk.yellow(minutes.toString().padStart(2, '0'))}:${chalk.yellow(seconds.toString().padStart(2, '0'))} `
      );
      totalSeconds--;

      if (totalSeconds < 0) {
        clearInterval(interval);
        this.playSound();
        console.log(`
${chalk.cyan(type + ' session finished!')}`);
        this.runNextSession();
      }
    }, 1000);
  }

  private playSound() {
    player.play(soundFilePath, (err: Error | null) => {
      if (err) {
        console.error(chalk.red(`
Error playing sound: Could not find file at ${soundFilePath}`));
        console.error(chalk.red('Please ensure a sound file exists at ./assets/notification.mp3'));
      }
    });
  }
}

const timer = new PomodoroTimer(argv.work, argv.break, argv.longBreak, argv.sessions);
timer.start();