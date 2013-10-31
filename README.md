# gitcanvas

![gitcanvas.png][1]

Waste your time like you never did before!

![web.png][2]

# Using the CLI

Sit in the repository you want to generate the commits on, and then use `gitcanvas` CLI.

```shell
gitcanvas --help
gitcanvas --dry-run some.json
gitcanvas some.json
```

![commits.png][3]

This is mostly harmless, as commits will be empty. No changes are part of the commit. You could always use the `--dry-run` flag to see what the commands would look like.

# Hosting the web application

No special treatment, just `node app`, done.

  [1]: https://github.com/bevacqua/gitcanvas/blob/master/dat/gitcanvas.png?raw=true
  [2]: https://github.com/bevacqua/gitcanvas/blob/master/dat/web.png?raw=true
  [3]: https://github.com/bevacqua/gitcanvas/blob/master/dat/commits.png?raw=true
