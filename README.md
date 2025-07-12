# Pomodoro Timer CLI

A simple and customizable Pomodoro timer for your terminal.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/pomodoro-timer-cli.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd pomodoro-timer-cli
    ```
3.  Install the dependencies:
    ```bash
    pnpm install
    ```

## Usage

To start the timer with default settings, run:

```bash
pnpm start
```

To customize the timer, use the following options:

```bash
pnpm start -- --work 45 --break 10 --longBreak 30 --sessions 3
```

## Options

| Option      | Alias | Description                                  | Default |
| ----------- | ----- | -------------------------------------------- | ------- |
| `--work`      | `-w`  | Work duration in minutes                     | 25      |
| `--break`     | `-b`  | Break duration in minutes                    | 5       |
| `--longBreak` | `-l`  | Long break duration in minutes               | 15      |
| `--sessions`  | `-s`  | Number of work sessions before a long break | 4       |

## Features

*   Customizable work, break, and long break durations
*   Configurable number of sessions before a long break
*   Sound notifications for session completion
*   Colorful and easy-to-read terminal output

## Technologies

*   [TypeScript](https://www.typescriptlang.org/)
*   [Node.js](https://nodejs.org/)
*   [yargs](https://yargs.js.org/)
*   [chalk](https://github.com/chalk/chalk)
*   [play-sound](https://github.com/shime/play-sound)

## License

This project is licensed under the ISC License.
