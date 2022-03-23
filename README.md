# Action nxtlvlsoftware/run-phpstan

GitHub action for running PHPStan in actions workflows.

| Action Input  | Required | Default   | Description                                                                            |
| ------------  | -------- | --------  | ------------------------------------------------------------------------------------- |
| executable    | true     | phpstan   | Specifies the path to the phpstan executable. Defaults to configured $PATH/current working directory. |
| php           | true     | php       | Specifies the php binary to run phpstan with. Defaults to configured $PATH/current working directory. |
| memory-limit  | true     | 1G        | Specifies the memory limit in the same format php.ini accepts. |
| analyse       | false    | undefined | A space seperated list of paths to analyse. |
| level         | false    | 9         | Specifies the rule level to run (1-9). https://phpstan.org/user-guide/rule-levels |
| config        | false    |           | Path to PHPStan configuration file. Relative paths are resolved based on the current working directory. |
| debug         | false    | false     | Instead of the progress bar, it outputs lines with each analysed file before its analysis. |
| quiet         | false    | false     | Silences all the output. Useful if you’re interested only in the exit code. |
| autoload-file | false    |           | If your application uses a custom autoloader, you should set it up and register in a PHP file that is passed to this CLI option. Relative paths are resolved based on the current working directory. |
| error-format  | false    | github    | Specifies a custom error formatter. https://phpstan.org/user-guide/output-format |
| ansi          | false    | true      | Overrides the autodetection of whether colors should be used in the output and how nice the progress bar should be. |
| xdebug        | false    | false     | PHPStan turns off XDebug if it’s enabled to achieve better performance. |

## How to use
Simple analysis if php and phpstan are already configured properly in the actions environment:

```yml
name: My PHP Workflow
on: [push]
jobs:
  setup-php:
    name: Run PHPStan
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]
        php: [8.0.11]
    steps:
      - uses: nxtlvlsoftware/run-phpstan@v1
        with:
          analyse: src
          config: tests/phpstan/action.phpstan.neon
          level: 9
      - run: |
        echo "phpstan exited with code ${{ steps.run-phpstan.outputs.exit-code }}"
```

Or provide the path to an existing PHPStan installation/binary:
```yml
name: My Complex PHP Workflow
on: [push]
jobs:
  setup-php:
    name: Run PHPStan
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]
        php: [8.0.11]
    steps:
      - uses: nxtlvlsoftware/run-phpstan@v1
        with:
          analyse: src
          config: tests/phpstan/action.phpstan.neon
          level: 9
          php: /path/to/php/bin
          phpstan: /path/to/phpstan.phar
          quiet: true
          debug: true
      - run: |
        echo "phpstan exited with code ${{ steps.run-phpstan.outputs.exit-code }}"
```
