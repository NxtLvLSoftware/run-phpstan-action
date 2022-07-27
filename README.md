# Action nxtlvlsoftware/run-phpstan

GitHub action for running [PHPStan](https://github.com/phpstan/phpstan) in actions workflows.

| Action Input  | Required | Default   | Description                                                                                                                                                                                          |
|---------------|----------|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| executable    | false    | phpstan   | Specifies the path to the phpstan executable. Defaults to configured $PATH/current working directory.                                                                                                |
| php           | false    | php       | Specifies the php binary to run phpstan with. Defaults to configured $PATH/current working directory.                                                                                                |
| memory-limit  | false    | 1G        | Specifies the memory limit in the same format php.ini accepts.                                                                                                                                       |
| analyse       | false    | undefined | A space seperated list of paths to analyse.                                                                                                                                                          |
| level         | false    | 9         | Specifies the rule level to run (1-9). https://phpstan.org/user-guide/rule-levels                                                                                                                    |
| config        | false    |           | Path to PHPStan configuration file. Relative paths are resolved based on the current working directory.                                                                                              |
| no-progress   | false    | true      | Turns off the progress bar.                                                                                                                                                                          |
| debug         | false    |           | Instead of the progress bar, it outputs lines with each analysed file before its analysis.                                                                                                           |
| quiet         | false    |           | Silences all the output. Useful if you’re interested only in the exit code.                                                                                                                          |
| autoload-file | false    |           | If your application uses a custom autoloader, you should set it up and register in a PHP file that is passed to this CLI option. Relative paths are resolved based on the current working directory. |
| error-format  | false    | github    | Specifies a custom error formatter. https://phpstan.org/user-guide/output-format                                                                                                                     |
| ansi          | false    |           | Overrides the auto-detection of whether colors should be used in the output and how nice the progress bar should be.                                                                                 |
| xdebug        | false    |           | PHPStan turns off XDebug if it’s enabled to achieve better performance.                                                                                                                              |

## How to use
Simple analysis if php and phpstan are already configured properly in the actions environment (in `$PATH`):

```yml
name: My PHP Test Workflow
on: [push]
jobs:
  test-code:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      - uses: nxtlvlsoftware/run-phpstan@v1
        with:
          analyse: src
          config: tests/phpstan/action.phpstan.neon
          level: 9
```

Or provide the paths to existing PHPStan and/or php executables:
```yml
name: My PHP Test Workflow
on: [push]
jobs:
  test-code:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      - uses: nxtlvlsoftware/run-phpstan@v1
        with:
          analyse: src
          config: tests/phpstan/action.phpstan.neon
          level: 9
          php: '/path/to/php/bin'
          phpstan: '/path/to/phpstan.phar'
```
