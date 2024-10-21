# Alias

Single-team Alias game for web. Developed using copilot workspace without writing a single line of code myself. Only this README file has been edited by hand.

## Application architecture

A single page app built using TypeScript and ReactJS. Has a backend with a simple in-memory database (a typescript object, no libraries).

## Application logic

Starting a new game:
- Player starts a new team and gets a numeric code
- Another player uses that code to join the team

Game logic:
- Repeats for ten words
  - The game randomly selects a word from it's wordlist (a json file)
  - Player 1 is shown a word and is instructed to explain that word in person to Player 2
  - Player 2 is shown a text input with ok button, and instructions to enter the word once guessed
  - Once Player 2 submits the guess, it's checked. If it's correct, the team gets a point.
- Displays score & game ends
